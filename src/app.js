const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const requestSanitizer = require('./requestSanitizer')
const rateLimiter = require('./ratelimiter');
const { ipBlockChecker } = require('./ipblocker');
const requestLogger = require('./requestLogger');

const app = express();
app.set('trust proxy', Boolean(process.env.trustProxy));

app.use(bodyParser.json());
app.use(cors())
app.use(requestLogger);
app.use(ipBlockChecker);
app.use(rateLimiter);
app.use(requestSanitizer);
app.use('/', routes);

module.exports = app;
