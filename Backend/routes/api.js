const express = require('express');
const router = express.Router();
const { verifyJWTToken } = require('./jwt/jwt');
const messageController = require('./../controllers/messageController');
const ErrorHandle = require('./../services/ErrorHandle');

// Main Route
router.post('/', verifyJWTToken, (req, res, next) => {
    res.json({
        message: "JWT Token Works!"
    });
});

router.get('/getAllMessages', verifyJWTToken, async (req, res, next) => {
    try {
        const response = await messageController.getAllMessages(req.headers['user_id']);
        res.json({
            status: 200,
            data: response
        });
    } catch(err) {
        ErrorHandle.error(err);
    }
});

router.post('/createMessage', verifyJWTToken, async (req, res, next) => {
    try {
        const response = await messageController.createMessage(req, req.headers['user_id']);
        res.json({
            status: response.status,
            data: response.message
        });
    } catch(err) {
        ErrorHandle.error(err);
    }
});

router.post('/deleteMessage', verifyJWTToken, async (req, res, next) => {
    try {
        const response = await messageController.deleteMessage(req.body.message_id);
        res.json({
            status: 200,
            data: response
        });
    } catch(err) {
        ErrorHandle.error(err);
    }
});

module.exports = router;