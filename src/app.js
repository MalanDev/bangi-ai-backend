const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
var cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use('/auth', authRoutes);
app.use('/api', imageRoutes);

module.exports = app;
