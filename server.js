const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const app = express();

// passport config
require("./app/config/passport")(passport);

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

const db = require("./app/models");
db.sequelize.sync(/*{force:true}*/).then(() => {
    console.log("Drop and re-sync db.");
});

// Session use 
app.use(session({
    secret: 'secret'  ,
    resave: true,
    saveUninitialized : true

}));

//initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req,res) => {
    res.json({message:"Welcome to my application."});
});

require("./app/routes/photowalk.routes")(app);
require("./app/routes/challenge.routes")(app);
require("./app/routes/photo.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});