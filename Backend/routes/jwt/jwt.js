const jwt = require('jsonwebtoken');

const verifyJWTToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        let bearer = bearerHeader.split(' ')[1];
        try {
            const decode = jwt.verify(bearer, 'herolo');
            if (!decode.isAuth) {
                res.sendStatus(403);
                return;
            }
            req.headers['user_id'] = decode.isAuth.id;
            return next();
        } catch (err) {
            res.status(401).json({
                status: 401,
                message : 'Unauthorized'
            });
            return;
        }
    } else {
        res.status(401).json({
            status: 401,
            message : 'Unauthorized'
        });
    }
}

module.exports = {
    verifyJWTToken
}