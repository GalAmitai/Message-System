const db = require('./../database/db');

const getAllMessages = async (user_id) => {
    try {
        if(!user_id) return "Missing Information..";
        const response = await db.getAllMessages(user_id);
        return response;
    } catch (err) {
        throw err;
    }
}

const createMessage = async (req, sender) => {
    try {
        if(!sender || !req.body.receiver || !req.body.message || !req.body.subject) {
            return "Missing Information..";
        }

        // Create Message on DB
        const response = await db.createMessage(req.body, sender);
        if(response.status == 400) {
            return {
                status: response.status,
                message: response.message
            };
        }
        return {
            status: 200,
            message: response.message
        };
    } catch (err) {
        throw err;
    }
}

const deleteMessage = async (message_id) => {
    try {
        if(!message_id) return "Missing Information..";

        const response = await db.deleteMessage(message_id);
        return response;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllMessages,
    createMessage,
    deleteMessage
};