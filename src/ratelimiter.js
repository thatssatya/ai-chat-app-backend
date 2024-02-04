const { ipBlocker } = require('./ipblocker');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: process.env.limitWindowInMins * 60 * 1000,
    max: process.env.maxRequests,
    handler: (req, res, options) => {
        console.log('Rate limit reached!')
        ipBlocker(req.ip);
        res.status(403).send({ message : 'You seriously need to chill!' });
    }
});

module.exports = limiter;