const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const ErrorHandle = require('./../services/ErrorHandle');

router.post('/login', async (req, res, next) => {
    try {
        const response = await authController.verifyAuthentication(req);
        if (!response) {
            res.status(401).json({
                status: 401,
                message : 'Unauthorized'
            });
            return;
        }
        res.status(200).json(response);
    } catch (err) {
        ErrorHandle.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;