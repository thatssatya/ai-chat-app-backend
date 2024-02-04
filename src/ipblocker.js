const blockedIPs = new Map();

const ipBlocker = (ip) => {
    console.log(`Blocking: ${ip}`);
    blockedIPs.set(ip, Date.now());
}

const ipBlockChecker = (req, res, next) => {
    if (blockedIPs.has(req.ip)) {
        console.log(`${req.ip} is blocked right now`);
        return res.status(403).send({ message : 'You are blocked for some time now.' });
    }
    next();
};

const clearExpiredBlockedIPs = () => {
    const currentTime = Date.now();
    for (const [ip, blockTime] of blockedIPs.entries()) {
        if (currentTime - blockTime > process.env.blockWindowInMins * 60 * 1000) {
            blockedIPs.delete(ip);
            console.log(`Unblocked ${ip}`);
        }
    }
};

setInterval(clearExpiredBlockedIPs, process.env.blockedIPClearFrequencyInMins * 60 * 1000);

module.exports = { ipBlockChecker, ipBlocker };
