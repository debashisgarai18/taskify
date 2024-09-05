const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userValdationMW = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(404).json({
      message: "No token Provided!!",
    });
    return; 
  } else {
    const decode = jwt.verify(token, JWT_SECRET);

    if (decode) {
      // passing the value to the next
      req.userId = decode.userId;
      next();
    } else {
      res.status(404).json({
        message: "Authentication failed!!",
      });
    }
  }
};

module.exports = userValdationMW;
