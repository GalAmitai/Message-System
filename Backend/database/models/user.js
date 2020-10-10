const Sequelize = require('sequelize');

const UserModel = (sequelize) => { 
    return sequelize.define('users', {
        // attributes
        id: { type: Sequelize.STRING, allowNull: false,primaryKey: true },
        username: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        created_at: { type: Sequelize.STRING },
    },{
        timestamps: false,
    });
}

module.exports = {
    UserModel
}