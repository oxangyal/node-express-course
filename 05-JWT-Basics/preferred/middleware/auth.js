const jwt = require("jsonwebtoken");
const StatusError = require("../errors/error");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new StatusError("unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    const secretKey = process.env.SECRET_KEY;

    // Verify the token
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);
        // Save the user's name in req.user
        req.user = { name: decoded.name };

        next();
    } catch (error) {
        throw new StatusError("unauthorized", 401);
    }
};

module.exports = auth;
