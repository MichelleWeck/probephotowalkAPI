const db = require("../models");
const Challenge = db.challenges;
const OP = db.Sequelize.Op;

exports.findAll = (req,res) => {
    Challenge.findAll({ include: ["photos"] })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving challenges."
        });
    });
};

exports.findOne = (req,res) => {
    const id = req.params.id;

    Challenge.findByPk(id, {include: ["photos"] })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Challenge with id=" + id
        });
    });
};