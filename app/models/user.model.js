module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
    
        userName: {
            type: Sequelize.STRING(35)
        },
        email: {
            type: Sequelize.email
        },
        password: {
            type: Sequelize.STRING(28)
        },

    }, {
        timestamps: false
    });

    return User;
}