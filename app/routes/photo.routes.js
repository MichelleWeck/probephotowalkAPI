module.exports = app => {
    const photo = require("../controllers/photo.controller.js");

    var router = require("express").Router();

    router.get("/", photo.findAll);

    router.get("/:id", photo.findOne);

    app.use('/api/photos', router);
}