const LocalStrategy = require("passport-local");
const postgres = require("pg");
const bcrypt = require("bcrypt.js");

const User = require("../models/user.model");

module.exports = function(passport){
    passport.use(
        // auch username?
        new LocalStrategy({userNameField: 'email'}, (email,password,done) =>
        {
            //Match User
             User.findOne({ email: email})
            .then(user => {
                if(!user){
                    return done(null,false, { message: 'This email is not registered'});
                }

                // Match Password
                bcrypt.compare(password, user.password, (err,isMatch) =>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null,user);
                    }
                    else{
                        return done(null, false, {message: 'password is incorrect'});
                    }
                });
            })
            .catch(err => console.log(err));
         })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}