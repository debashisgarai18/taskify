const { Router } = require("express");
const userRouter = Router();
const z = require("zod");
const { users } = require("../Database");
const bcrypt = require("bcrypt");
const userInputMiddleware = require("../Middlewares/userInputMiddleware");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

// this is to implement signup endpoint
userRouter.post("/signup", userInputMiddleware, async (req, res) => {
  const { uname, pwd } = req.body;
  const hashedPwd = await bcrypt.hash(pwd, 10);

  // checking if the user exists in the DB or not
  const checkEntry = await users.findOne({
    username: uname,
  });

  if (!checkEntry) {
    // pushing the data into the DB
    const response = await users.create({
      username: uname,
      password: hashedPwd,
    });
    if (response) {
      res.status(200).json({
        message: "The data is pushed successfully!!",
      });
    } else {
      res.status(200).json({
        message: "The is some issue in pushing the data!!",
      });
    }
  } else {
    res.status(404).json({
      message: "This user already present!!",
    });
  }
});

// this is to implement the signin endpoint
userRouter.post("/signin", userInputMiddleware, async (req, res) => {
    const {uname, pwd} = req.body;

    // check whether the user exists in the DB or not
    const check = await users.findOne({
        username : uname
    })
    if(check){
        // decrypt the password
        const decodePwd = await bcrypt.compare(pwd, check.password);

        if(!decodePwd){
            res.status(404).json("The password enterred is incorrect! Kindly check and re-enter!!");
        }
        // if the password is correct we'll proceed to the generation of the jwt token
        else{
            const token = jwt.sign({username : check.username}, JWT_SECRET, {expiresIn : "1d"});
            // TODO:  token to be stored in the cookie using the cookie-parser
            res.status(200).json({
                token : token
            })
        }
    }
    else{
        res.status(404).json({
            message : "the user doenot exist || check the username and re-enter!!"
        })
    }
});

module.exports = userRouter;
