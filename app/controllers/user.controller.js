const db = require("../models");
const { deserializeUser } = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require("../config/passport");

// Login Prozess
exports.Login = (req,res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect:'/login',
        failureFlash: false
    })(req,res,next);
} 

exports.register = (req,res, next) => {
    const {name,email, password, password2} = req.body;
    let errors =[];

    //check required fields
    if(!name || !email || !password || !passwort2){
        errors.push({msg:'Please fill out all fields'});
    }

    //check passwords match
    if( password !== password2) {
        errors.push({msg: 'passwords do not match'});
    }

    //check password lengths
    if(password.length <8) {
        errors.push({msg: 'password length has to be at least 8 characters'});
    }

    if(errors.length >0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
        // validation passed
        User.findOne({email: email ,name:name})
        .then( user =>{
            if(user.email){
                // user exists
                errors.push({msg: 'email is already used'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                 
                });
            }  
                if(user.name){
                    // username exists
                    errors.push({msg: 'username is already used'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
            
            }
        

            else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash password
                bcrypt.genSalt(10, (err,salt) =>{ 
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        // Set password to hash
                        newUser.password(hash);
                        // Save User
                        newUser.save()
                        .then(user => {
                            //redirect anpassen
                            res.redirect('.');
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    }
    
};