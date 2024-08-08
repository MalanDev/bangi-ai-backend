const express = require('express');
const {createCheckoutSessionUrl ,checkoutSessionUrl, checkSubscriptionStatus} = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-checkout-session', createCheckoutSessionUrl);
router.post('/checkout-session', checkoutSessionUrl);
router.post('/check-subscription-status', checkSubscriptionStatus);


module.exports = router;

