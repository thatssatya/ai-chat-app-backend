const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    const origin = req.headers.origin || req.headers.referer;
    if (origin && origin.startsWith(process.env.allowedOrigin)) {
        console.log(`Accessing from: ${origin}`)
        next();
    } else {
        console.log(`Request forbidden from ${origin} origin`);
        res.status(403).send();
    }
});

app.use('/', routes);

module.exports = app;
