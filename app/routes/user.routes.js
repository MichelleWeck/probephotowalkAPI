module.exports = app => {
    const user =require('../controllers/user.controller.js');

    var router = require("express").Router();

    //login
router.get('/login', user.Login);

//registration page
router.get('/register', (req,res) => res.render('register'));

//Register handle
router.post('/register', user.register);

}