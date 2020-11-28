module.exports = (sequelize, Sequelize) => {
    const Challenge = sequelize.define("challenge", {
        description: {
            type: Sequelize.STRING(4000)
        },
    }, {
        timestamps: false
    });

    return Challenge;
}