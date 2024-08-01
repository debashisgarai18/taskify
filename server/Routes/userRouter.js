const { Router } = require("express");
const userRouter = Router();
const z = require("zod");
const { users, tasks } = require("../Database");
const bcrypt = require("bcrypt");
const userInputMiddleware = require("../Middlewares/userInputMiddleware");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const userValdationMW = require("../Middlewares/userValidationMW");

// this is to implement signup endpoint
userRouter.post("/signup", userInputMiddleware, async (req, res) => {
  const { name, uname, pwd } = req.body;
  const hashedPwd = await bcrypt.hash(pwd, 10);

  // checking if the user exists in the DB or not
  const checkEntry = await users.findOne({
    username: uname,
  });

  if (!checkEntry) {
    // pushing the data into the DB
    const response = await users.create({
      name: name,
      username: uname,
      password: hashedPwd,
    });
    if (response) {
      res.status(200).json({
        message: "User is created successfully!!",
      });
    } else {
      res.status(404).json({
        message: "Issue in creating the user!!",
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
  const { uname, pwd } = req.body;

  // check whether the user exists in the DB or not
  const check = await users.findOne({
    username: uname,
  });
  if (check) {
    // decrypt the password
    const decodePwd = await bcrypt.compare(pwd, check.password);

    if (!decodePwd) {
      res
        .status(404)
        .json(
          "The password enterred is incorrect! Kindly check and re-enter!!"
        );
    }
    // if the password is correct we'll proceed to the generation of the jwt token
    else {
      const token = jwt.sign({ username: check.username }, JWT_SECRET, {
        expiresIn: "1d",
      });
      // TODO:  token to be stored in the cookie using the cookie-parser -> after doing signup signin in frontend
      res.cookie("token", token);
      res.status(200).json(check.name);
    }
  } else {
    res.status(404).json({
      message: "the user doenot exist || check the username and re-enter!!",
    });
  }
});

// the endpoint to add the tasks
userRouter.post("/addtasks", userValdationMW, async (req, res) => {
    const {tname, desc} = req.body;

    // push the data in the DB
    const response = await tasks.create({
        taskName : tname,
        description : desc
    })
    if(response){
        res.status(200).json({
          task_id : response._id
        })
    }
    else{
        res.status(404).json({
            message : "There is some issue in pushing the tasks in the DB"
        })
    }
})

// the endpoint to actually add the tasks to the sepcific userarray
userRouter.post("/addtasks/:taskId", userValdationMW, async (req, res) => {
    const taskId = req.params.taskId;
    const username = req.headers.username;

    const update = await users.findOneAndUpdate({
      username : username  
    },{
      "$push" : {
        assignedTasks : taskId
      }
    })

    if(update) {
      res.status(200).json({
        message : "The user is updated with the task!!"
      })
    }
    else{
      res.status(404).json({
        message : "There is some issue in updating the tasks!"
      })
    }
})


module.exports = userRouter;
