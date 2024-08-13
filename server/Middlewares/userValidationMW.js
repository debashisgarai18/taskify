const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userValdationMW = (req, res, next) => {
  // const token = req.cookies.token;
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    res.status(404).json({
      message: "No token Provided!!",
    });
    return; 
  } else {
    const decode = jwt.verify(token, JWT_SECRET);

    if (decode) {
      // passing the value to the next
      req.headers.uname = decode.username;
      next();
    } else {
      res.status(404).json({
        message: "Authentication failed!!",
      });
    }
  }
};

module.exports = userValdationMW;
