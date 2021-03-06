const db = require("../models");
const Photo = db.photos;
const OP = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.photo_link) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const photo = {
        photo_link: req.body.photo_link,
        challengeId: req.body.challengeId
    };

    Photo.create(photo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while creating the Photo"
            });
        });
};

exports.findAll = (req,res) => {
    Photo.findAll({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving photos."
        });
    });
};

exports.findOne = (req,res) => {
    const id = req.params.id;

    Photo.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Photo with id=" + id
        });
    });
};

exports.delete = (req,res) => {
    const id = req.params.id;

    Photo.destroy({
        where: {id:id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Photo was deleted sucessfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Photo with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Photo with id=" + id
            });
        });
};