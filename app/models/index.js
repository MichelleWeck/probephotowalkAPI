const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.photowalks = require("./photowalk.model.js")(sequelize, Sequelize);
db.challenges = require("./challenge.model.js")(sequelize, Sequelize);
db.photos = require("./photo.model.js")(sequelize, Sequelize);

db.photowalks.hasMany(db.challenges, {as: "challenges"});
db.challenges.belongsTo(db.photowalks, {
    foreignKey: "photowalkId",
    as: "photowalk"
});

db.challenges.hasMany(db.photos, {as: "photos"});
db.photos.belongsTo(db.challenges, {
    foreignKey: "challengeId",
    as: "challenge"
});

//db.photos.belongTo(db.users)

module.exports = db;