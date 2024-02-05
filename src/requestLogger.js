const requestLogger = (req, res, next) => {
    if (Boolean(process.env.logRequest)) {
        console.log(`Origin: ${req.headers.origin}`);
        console.log(`X-Forwarded-For: ${req.headers['x-forwarded-for']}`);
        console.log(`Remote address: ${req.connection.remoteAddress}`);
        console.log(`Remote IP address: ${req.ip}`);
    }
    next();
};

module.exports = requestLogger;