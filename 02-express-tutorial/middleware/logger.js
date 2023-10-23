const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    console.log(Date.now())
    console.log(method, url);
    next();
};

module.exports = logger;