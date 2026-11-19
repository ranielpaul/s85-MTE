const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is required. Set it in your .env file.');
}

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(data, JWT_SECRET_KEY, {});
};

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({
            auth: 'Failed',
            message: 'No token provided'
        });
    }

    token = token.slice(7);

    jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({
                auth: 'Failed',
                message: err.message
            });
        }

        req.user = decodedToken;
        next();
    });
};

module.exports.errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'SERVER_ERROR',
            details: err.details || null
        }
    });
};