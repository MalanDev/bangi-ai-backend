const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const paymentRotes = require('./routes/paymentRoutes');
var cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use('/auth', authRoutes);
app.use('/api', imageRoutes);
app.use('/payment', paymentRotes);

module.exports = app;
