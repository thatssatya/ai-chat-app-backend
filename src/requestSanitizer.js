const { ipBlocker } = require('./ipblocker');

const requestSanitizer = (req, res, next) => {
    const origin = req.headers.origin || req.headers.referer;
    if (isOriginValid(origin) && isSecretValid(req)) {
        console.log(`Accessing from: ${origin}`)
        next();
    } else {
        console.log(`Request forbidden from ${origin} origin`);
        ipBlocker(req.ip)
        res.status(403).send();
    }
}

const isOriginValid = (origin) => {
    const allowedOrigin = process.env.allowedOrigin;
    return (allowedOrigin === '*') || (origin && origin.startsWith(allowedOrigin));
}

const isSecretValid = (req) => {
    return process.env.secret === req.headers[process.env.key];
}

module.exports = requestSanitizer;