const auth = (req, res, next) => {
    if (!req.cookies.name) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
    req.user = req.cookies.name;
    return next();
};

module.exports = auth;
