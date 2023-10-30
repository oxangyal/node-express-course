let { people } = require("../data");

const getPeople = (req, res) => {
    console.log(req);
    res.status(200).json({ success: true, data: people });
};

const getPerson = (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find((person) => person.id === id);
    if (!person) {
        return res.status(404).json({ message: "There is no this person" });
    }
    return res.status(200).json(person);
};

const getMaxId = () => {
    return people.reduce((ret, cur) => (ret < cur.id ? cur.id : ret), 0);
};

const addPerson = (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide a name" });
    }

    newId = getMaxId() + 1;
    people.push({ id: newId, name: req.body.name });
    res.status(201).json({ success: true, name: name, id: newId });
};

updatePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));
    if (!person) {
        return res.status(404).json({
            success: false,
            message: `no person with id ${req.params.id}`,
        });
    }
    const newPerson = people.map((person) => {
        if (person.id === Number(req.params.id)) {
            person.name = req.body.name;
        }
        return person;
    });
    res.status(200).json({ success: true, data: newPerson });
};

deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));
    if (!person) {
        return res.status(404).json({
            success: false,
            message: `no person with id ${req.params.id}`,
        });
    }
    const newPerson = people.filter(
        (person) => person.id !== Number(req.params.id)
    );
    return res.status(200).json({ success: true, data: newPerson });
};

module.exports = {
    getPeople,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson,
};
