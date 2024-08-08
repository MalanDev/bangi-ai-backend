const db = require('../config/db');
// const firebase  = require('../config/firebaseConfig');

const signup = async (req, res) => {
  const { uid, email,userName } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE uid = ? AND email = ?', [uid, email]);
    
    if (user.length === 0) {
      const customer = await stripe.customers.create({
        email,
        userName,
      });
      await db.query('INSERT INTO users (uid, email,userName,stripeCustomerId) VALUES (?, ?, ?,?)', [uid, email,userName,customer.id]);
      res.status(200).send({ message: 'User created successfully',stripeCustomerId: customer.id});
    }else{
      res.status(401).send({ message: 'User already signup!' });
    }
  } catch (error) {
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
  
        res.status(200).send({ message: 'Login successful', uid, email: user[0].email,userName:user[0].userName });
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
        
        res.status(200).send({ message: 'Login successful', uid, email: user[0].email,userName:user[0].userName });
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

      res.status(200).send({ message: 'Login successful', uid, email: user[0].email,userName:user[0].userName });
    }

   
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized', error: error.message });
  }
};

reduceTokenByUser= async (req, res) => {
  const { uid, token } = req.body;
  try {
    

    const [user] = await db.query('SELECT * FROM users WHERE uid = ?', [uid,email]);
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


module.exports = { signup, login, updateUser,getUserById };
