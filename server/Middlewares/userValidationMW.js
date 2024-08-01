const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const userValdationMW = (req, res, next) => {
    // const token = req.cookies.token;
    const token = req.headers.authorization;
    const decode = jwt.verify(token, JWT_SECRET);

    if(decode){
        // passing the value to the next
        req.uname = decode.username;
        next();
    }
    else{
        res.status(404).json({
            message : "Authentication failed!!"
        })
    }
}

module.exports = userValdationMW;