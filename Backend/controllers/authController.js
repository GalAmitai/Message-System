const db = require('./../database/db');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const verifyAuthentication = async (req) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password) {
            return {
                code: 400,
                message: "Missing information"
            }
        }
        const isAuth = await db.verifyAuthentication(username, md5(password));

        if (!isAuth) {
            return false;
        }
        
        const token = jwt.sign({ isAuth }, 'herolo');

        return {
            isAuth: true,
            token: token,
            user: isAuth
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    verifyAuthentication
};