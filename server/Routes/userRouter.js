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
      // console.log(response._id);
      const token = jwt.sign({ userId: response._id }, JWT_SECRET);
      res.status(200).json({
        token: token,
        userId: response._id,
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
    const decodePwd = bcrypt.compare(pwd, check.password);

    if (!decodePwd) {
      res
        .status(404)
        .json(
          "The password enterred is incorrect! Kindly check and re-enter!!"
        );
    }
    // if the password is correct we'll proceed to the generation of the jwt token
    else {
      const token = jwt.sign({ userId: check._id }, JWT_SECRET);
      res.status(200).json({
        token: token,
      });
    }
  } else {
    res.status(404).json({
      message: "the user doesnot exist || check the username and re-enter!!",
    });
  }
});

// the endpoint to enter the landing page for a specific user
userRouter.get("/landing", userValdationMW, async (req, res) => {
  const userId = req.userId;

  // find the entry with this username
  const response = await users.findOne({
    _id: userId,
  });
  res.status(200).json({
    user: response.name,
  });
});

// the endpoint to add the tasks
userRouter.post("/addtasks", userValdationMW, async (req, res) => {
  const { tname, desc } = req.body;

  // push the data in the DB
  const response = await tasks.create({
    taskName: tname,
    description: desc,
  });
  if (response) {
    res.status(200).json({
      task_id: response._id,
    });
  } else {
    res.status(404).json({
      message: "There is some issue in pushing the tasks in the DB",
    });
  }
});

// the endpoint to actually add the tasks to the sepcific userarray
userRouter.post("/addtasks/:taskId", userValdationMW, async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.userId;

  const update = await users.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $push: {
        assignedTasks: taskId,
      },
    }
  );

  if (update) {
    res.status(200).json({
      message: "The user is updated with the task!!",
    });
  } else {
    res.status(404).json({
      message: "There is some issue in updating the tasks!",
    });
  }
});

// get all the tasks for the specific user
userRouter.get("/showtasks", userValdationMW, async (req, res) => {
  const uId = req.userId;

  const response = await users.findOne({
    _id: uId,
  });

  if (response) {
    const data = await tasks.find({
      _id: {
        $in: response.assignedTasks,
      },
    });

    res.status(200).json({
      all_tasks: data.map((e) => {
        return {
          task: e.taskName,
          desc: e.description,
        };
      }),
    });
  } else {
    res.status(400).json({
      message: "There is some issue in generating the data",
    });
  }
});

// todo : implement the me endpoint for all the auth routes
// todo : add a route in which the user can mark their tasks in the low / high priority
// todo : add an endpoint to mark the tasks completed for user
// todo : endpoint to filter the tasks on the basis of searched string 
// todo : add endpoint show tasks on the basis of given start date

module.exports = userRouter;
