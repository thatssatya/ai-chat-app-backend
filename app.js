const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: process.env.allowedOrigin }));

app.use('/', routes);

module.exports = app;
