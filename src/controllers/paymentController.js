const skkey = require('../config/stripe')
const express = require('express');
const stripe = require('stripe')(skkey.SECRET_KEY);

const createCheckoutSessionUrl = async (req, res) => {
    const { stripeCustomerId,priceId } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price: priceId,
            quantity: 1,
          }],
          customer: stripeCustomerId,
          mode: 'subscription',
          success_url: 'https://bangi-ai-frontend.vercel.app/success{CHECKOUT_SESSION_ID}',
          cancel_url: 'https://bangi-ai-frontend.vercel.app/cancel',
        });
    
        res.send({
          id: session.id,
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
  };

  const checkoutSessionUrl = async (req, res) => {
    const { sessionId } = req.query;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.send(session);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  checkSubscriptionStatus = async (req, res) => {
    const { customerId } = req.body;
  
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        limit: 1,
      });
  
      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        const isExpired = subscription.status !== 'active';
  
        res.send({
          isExpired,
          subscription,
        });
      } else {
        res.send({
          isExpired: true,
          subscription: null,
        });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };


  module.exports = { createCheckoutSessionUrl, checkoutSessionUrl,checkSubscriptionStatus};