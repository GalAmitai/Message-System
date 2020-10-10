const Sequelize = require('sequelize');
const config = require('../configuration/config');
const { UserModel } = require('./models/user');
const { MessageModel } = require('./models/message');
const { response } = require('express');
const message = require('./models/message');

const getConnection = () => {
    return new Sequelize(
        config.mySqlConfiguration.database,
        config.mySqlConfiguration.user,
        config.mySqlConfiguration.password, {
        host: config.mySqlConfiguration.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false
    });
}

const verifyAuthentication = async (username,password) => {
    try {
        const sequilize = getConnection();
        const user = await UserModel(sequilize).findOne({
            where: { username,  password }
        });
        await sequilize.close();
        return user;
    } catch (err) {
        console.error(`Error in verifyAuthentication - ${err}`);
        throw err;
    }
}

const getAllMessages = async (user_id) => {
    try {
        const sequilize = getConnection();
        const sent = await MessageModel(sequilize).findAll({
            where: { sender: user_id },
            order: [
                ['created_at', 'DESC']
            ]
        });
        const received = await MessageModel(sequilize).findAll({
            where: { receiver: user_id },
            order: [
                ['created_at', 'DESC']
            ]
        });
        await sequilize.close();
        return {
            sent: sent,
            received: received
        };
    } catch (err) {
        console.error(`Error in createMessage - ${err}`);
        throw err;
    }
}

const createMessage = async (data, sender) => {
    try {
        const sequilize = getConnection();
        
        // Here need to validate if receiver exists ~ NEED TO IMPLEMENT
        const receiver = await UserModel(sequilize).findOne({
            where: {
                username: data.receiver
            }
        });

        if(!receiver) {
            return {
                status: 400,
                message: 'User: ' + data.receiver + ' does not exists.'
            };
        }

        await MessageModel(sequilize).create({
            sender: sender,
            receiver: receiver.id,
            subject: data.subject,
            message: data.message
        });
        await sequilize.close();
        return {
            status: 200,
            message: 'Message sent successfully.'
        };
    } catch (err) {
        console.error(`Error in createMessage - ${err}`);
        throw err;
    }
}

const deleteMessage = async (message_id) => {
    try {
        const sequilize = getConnection();
        const message = await MessageModel(sequilize).findOne({
            where: { id: message_id}
        });
        if(message) {
            await message.destroy();
            await sequilize.close();
            return `Message id: ${message_id} deleted.`;
        } else {
            await sequilize.close();
            return `Message id: ${message_id} is missing.`;
        }
    } catch (err) {
        console.error(`Error in deleteMessage - ${err}`);
        throw err;
    }
}

module.exports = {
    verifyAuthentication,
    getAllMessages,
    createMessage,
    deleteMessage
};