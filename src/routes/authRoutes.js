const express = require('express');
const { signup, login, getUserById,updateUser,reduceTokenByUser, createStripeId, getAvailableTokenByUser } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/update-user', updateUser);
router.get('/get-user', getUserById);
router.get('/get-availble-token-by-user', getAvailableTokenByUser);
router.post('/reduce-token-user', reduceTokenByUser);
router.post('/create-stripe-id', createStripeId);

module.exports = router;
