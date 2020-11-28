module.exports = (sequelize, Sequelize) => {
    const Photowalk = sequelize.define("photowalk", {
        name: {
            type: Sequelize.STRING
        },
        length: {
            type: Sequelize.FLOAT
        },
        region: {
            type: Sequelize.STRING
        },
        route: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING(4000)
        },
    }, {
        timestamps: false
    });

    return Photowalk;
}