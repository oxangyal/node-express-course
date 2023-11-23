const jwt = require("jsonwebtoken");
const StatusError = require("../errors/error");

const logon = async (req, res) => {
    const { name, password } = req.body;
    console.log(req, name, password);

    if (!name || !password) {
        throw new StatusError("You need to provide name and password", 400);
    }
    // {
    //     return res
    //         .status(400)
    //         .json({ error: "Name and password are required" });
    // }

    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.status(200).json({ msg: "user created", token });
};

const hello = async (req, res) => {
    // const { name } = req.user;
    console.log(req.body);
    res.status(200).json({ message: `Hello, ${req.body.name}` });
};

module.exports = { logon, hello };
