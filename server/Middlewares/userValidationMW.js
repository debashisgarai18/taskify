const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const userValdationMW = (req, res, next) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, JWT_SECRET);
    if(decode) next();
    else{
        res.status(404).json({
            message : "Authentication failed!!"
        })
    }
}

module.exports = userValdationMW;