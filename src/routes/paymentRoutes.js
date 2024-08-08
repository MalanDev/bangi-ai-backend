const express = require('express');
const {createCheckoutSessionUrl ,checkoutSessionUrl, checkSubscriptionStatus} = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-checkout-session', createCheckoutSessionUrl);
router.get('/checkout-session', checkoutSessionUrl);
router.get('/check-subscription-status', checkSubscriptionStatus);


module.exports = router;

