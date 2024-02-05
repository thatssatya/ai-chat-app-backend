const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const requestSanitizer = require('./requestSanitizer')
const rateLimiter = require('./ratelimiter');
const { ipBlockChecker } = require('./ipblocker');

const app = express();


app.use(bodyParser.json());
app.use(cors())
app.use(ipBlockChecker);
app.use(rateLimiter);
app.use(requestSanitizer);
app.use('/', routes);

module.exports = app;
