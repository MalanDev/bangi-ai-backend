const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', imageRoutes);

module.exports = app;
