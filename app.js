const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    const origin = req.headers.origin || req.headers.referer;
    const allowedOrigin = process.env.allowedOrigin;
    if (allowedOrigin === '*' || (origin && origin.startsWith(process.env.allowedOrigin))) {
        console.log(`Accessing from: ${origin}`)
        next();
    } else {
        console.log(`Request forbidden from ${origin} origin`);
        res.status(403).send();
    }
});

app.use('/', routes);

module.exports = app;
