const db = require('../config/db');
// const firebase  = require('../config/firebaseConfig');

const signup = async (req, res) => {
  const { uid, email,userName } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE uid = ? AND email = ?', [uid, email]);
    if (user.length === 0) {
      await db.query('INSERT INTO users (uid, email,userName) VALUES (?, ?, ?)', [uid, email,userName]);
      res.status(200).send({ message: 'User created successfully' });
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
      // const decodedToken = await firebase.auth().verifyIdToken(idToken);
      // const uid = decodedToken.uid;
  
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



module.exports = { signup, login };
