module.exports = {
    ensureAuthentication: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Please log in for this site');
        res.redirect('/login');
    }
}