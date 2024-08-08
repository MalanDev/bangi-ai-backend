const express = require('express');
const { signup, login, getUserById,updateUser,reduceTokenByUser } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/update-user', updateUser);
router.get('/get-user', getUserById);
router.post('/reduce-token-user', reduceTokenByUser);

module.exports = router;
