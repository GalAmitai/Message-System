const Sequelize = require('sequelize');

const MessageModel = (sequelize) => { 
    return sequelize.define('messages', {
        // attributes
        id: { type: Sequelize.STRING, allowNull: true,primaryKey: true },
        sender: { type: Sequelize.STRING },
        receiver: { type: Sequelize.STRING },
        subject: { type: Sequelize.STRING },
        message: { type: Sequelize.STRING },
        created_at: { type: Sequelize.STRING },
    },{
        timestamps: false,
    });
}

module.exports = {
    MessageModel
}