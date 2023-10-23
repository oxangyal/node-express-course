const { people } = require("../data");

const logon = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(401).json({
            success: false,
            message: "Please provide a name",
        });
    }

    const person = people.find((person) => person.name === name);
    if (!person) {
        return res.status(404).json({
            success: false,
            message: "No person with that name",
        });
    }

    res.cookie("name", req.body.name);
    return res.status(200).json({
        success: true,
        message: `Hello, ${name}!`,
    });
};

const logoff = (req, res) => {
    res.clearCookie("name");
    return res.status(200).json({
        success: true,
        message: "Successfully logged off",
    });
};

module.exports = {
    logon,
    logoff,
};
