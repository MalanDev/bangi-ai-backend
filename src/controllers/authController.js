const db = require('../config/db');
const skkey = require('../config/stripe')
const stripe = require('stripe')(skkey.SECRET_KEY);

const signup = async (req, res) => {
  const { uid, email,userName } = req.body;

  try {
    
    const [user] = await db.query('SELECT * FROM users WHERE uid = ?', [uid]);

    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;
    if (customers.data.length > 0) {
      // Customer exists
      customer = customers.data[0];
    } else {
      // Customer does not exist, create a new one
      customer = await stripe.customers.create({
        email: email,
        name: userName,
      });
    }
    
    const customerId = customer.id;
    if (user.length === 0) {
     
      await db.query('INSERT INTO users (uid, email,userName,stripeCustomerId) VALUES (?, ?, ?,?)', [uid, email,userName,customerId]);
      res.status(200).send({ message: 'User created successfully',stripeCustomerId: customer.id});
    }else{
      await db.query('UPDATE users SET email=?,userName=?,stripeCustomerId=? WHERE uid = ?', [email,userName,customerId,uid]);
      res.status(200).send({ message: 'User created successfully',stripeCustomerId: customer.id});
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error.message });
  }
};


const login = async (req, res) => {
    const { uid, email, userName } = req.body;
    try {
     
      const [user] = await db.query('SELECT * FROM users WHERE uid = ? AND email = ?', [uid,email]);
      if (user.length === 0) {
       
        res.status(401).send({ message: "User not found!" });
       
      }else{
        await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE uid = ?', [uid]);
  
        res.status(200).send({ message: 'Login successful', user:{uid, email: user[0].email,userName:user[0].userName,stripeCustomerId: user[0].stripeCustomerId,subscription_date:user[0].subscription_date,package_name:user[0].package_name,available_token:user[0].userName,package_total:user[0].userName,payment_status:user[0].payment_status,client_reference_id:user[0].client_reference_id} });
      }

     
    } catch (error) {
      res.status(401).send({ message: 'Unauthorized', error: error.message });
    }
  };


  const getUserById = async (req, res) =>{
    const { uid } = req.query;
    try {
     
      const [user] = await db.query('SELECT * FROM users WHERE uid = ?', [uid]);
      if (user.length === 0) {
       
        res.status(401).send({ message: "User not found!" });
       
      }else{
        let isExpired = false;
        let subscription = null;

        if(user[0].stripeCustomerId != null && user[0].stripeCustomerId != ""){
          const subscriptions = await stripe.subscriptions.list({
              customer: 'cus_QcdJdjVmAWqR8p',
              status: 'all',
              limit: 1,
          });
    
          if (subscriptions.data.length > 0) {
             subscription = subscriptions.data[0];
             isExpired = subscription.status !== 'active';
          } else {
             isExpired= true;
             subscription= null;
         }
      }
        res.status(200).send({user:{uid, email: user[0].email,userName:user[0].userName,stripeCustomerId: user[0].stripeCustomerId,subscription_date:user[0].subscription_date,package_name:user[0].package_name,available_token:user[0].userName,package_total:user[0].userName,payment_status:user[0].payment_status,client_reference_id:user[0].client_reference_id,isExpired:isExpired,subscription:subscription} });
      }

     
    } catch (error) {
      res.status(401).send({ message: 'Unauthorized', error: error.message });
    }
  }

const updateUser = async (req, res) => {
  const { uid, email,client_reference_id,payment_status,package_total,available_token,package_name,subscription_date,stripeCustomerId } = req.body;
  try {
    

    const [user] = await db.query('SELECT * FROM users WHERE uid = ? AND email = ?', [uid,email]);
    if (user.length === 0) {
     
      res.status(401).send({ message: "User not found!" });
     
    }else{
      await db.query('UPDATE users SET stripeCustomerId= ?,subscription_date=?,package_name=?,available_token=?,package_total=?,payment_status=?,client_reference_id=?,updated_at=CURRENT_TIMESTAMP WHERE uid = ?', [stripeCustomerId,subscription_date,package_name,available_token,package_total,payment_status,client_reference_id,uid]);

      res.status(200).send({ message: 'Update successful'});
    }

   
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized', error: error.message });
  }
};

reduceTokenByUser= async (req, res) => {
  const { uid, token } = req.body;
  try {
    

    const [user] = await db.query('SELECT * FROM users WHERE uid = ?', [uid]);
    if (user.length === 0) {
     
      res.status(401).send({ message: "User not found!" });
     
    }else{
      var tokenValue = user[0].available_token - token
      if(tokenValue>=0){
      await db.query('UPDATE users SET available_token = ? WHERE uid = ?', [tokenValue,uid]);
      }

      res.status(200).send({ message: 'Update successful', uid, email: user[0].email,userName:user[0].userName,available_token:tokenValue });
    }

   
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized', error: error.message });
  }
};

const createStripeId = async (req, res) => {
  const { uid} = req.query;

  try {
    
    const [user] = await db.query('SELECT * FROM users WHERE uid = ? AND email = ?', [uid, email]);
    
    if (user.length === 0) {
     
      const customer = await stripe.customers.create({
        email:user[0].email,
        name: user[0].userName,
      });
      console.log(customer);
      const customerId = customer.id;
     
      await db.query('UPDATE users SET stripeCustomerId = ? WHERE uid = ?', [uid,customerId]);
      res.status(200).send({ message: 'stripeCustomerId created successfully',stripeCustomerId: customer.id});
    }else{
      res.status(401).send({ message: 'User already signup!' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error.message });
  }
};


module.exports = { signup, login, updateUser,getUserById,reduceTokenByUser,createStripeId };
