const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.use(performRequestSanity);

function performRequestSanity(req, res, next) {
    const origin = req.headers.origin || req.headers.referer;
    if (isOriginValid(origin) && isSecretValid(req)) {
        console.log(`Accessing from: ${origin}`)
        next();
    } else {
        console.log(`Request forbidden from ${origin} origin`);
        res.status(403).send();
    }
}

function isOriginValid(origin) {
    const allowedOrigin = process.env.allowedOrigin;
    return (allowedOrigin === '*') || (origin && origin.startsWith(allowedOrigin));
}

function isSecretValid(req) {
    return process.env.secret === req.headers[process.env.key];
}

app.use('/', routes);

module.exports = app;
