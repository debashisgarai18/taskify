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

  try {
    // checking if the user exists in the DB or not
    const checkEntry = await users.findOne({
      username: uname,
    });

    if (!checkEntry) {
      try {
        // pushing the data into the DB
        const response = await users.create({
          name: name,
          username: uname,
          password: hashedPwd,
        });
        if (response) {
          // console.log(response._id);
          const token = jwt.sign({ userId: response._id }, JWT_SECRET);
          return res.status(200).json({
            user: response._id,
            token: token,
            message: "The user is created",
          });
        }
      } catch (err) {
        return res.status(403).json({
          message: "The user cannot be created",
          error: `Error ${err}`,
        });
      }
    } else {
      return res.status(403).json({
        message: "This user already present!!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error : ${err}`,
    });
  }
});

// this is to implement the signin endpoint
userRouter.post("/signin", userInputMiddleware, async (req, res) => {
  const { uname, pwd } = req.body;

  try {
    // check whether the user exists in the DB or not
    const check = await users.findOne({
      username: uname,
    });
    if (check) {
      // decrypt the password
      const decodePwd = bcrypt.compare(pwd, check.password);

      if (!decodePwd) {
        return res.status(403).json({
          message:
            "The password enterred is incorrect! Kindly check and re-enter.",
        });
      }
      // if the password is correct we'll proceed to the generation of the jwt token
      else {
        const token = jwt.sign({ userId: check._id }, JWT_SECRET);
        return res.status(200).json({
          token: token,
          user: check._id,
          message: "User is signed in",
        });
      }
    } else {
      return res.status(404).json({
        message: "the user doesnot exist OR check the username and re-enter",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `Some internal server error : ${err}`,
    });
  }
});

// me endpoint
userRouter.get("/me", userValdationMW, async (req, res) => {
  const userId = req.userId;
  return res.status(200).json({
    user: userId,
    message: "User is authenticated",
  });
});

// the endpoint to enter the landing page for a specific user
userRouter.get("/landing", userValdationMW, async (req, res) => {
  const userId = req.userId;

  // find the entry with this username
  const response = await users.findOne({
    _id: userId,
  });
  res.status(200).json({
    user: response,
  });
});

// the endpoint to add the tasks
userRouter.post("/addTasks", userValdationMW, async (req, res) => {
  const { task, desc, creationDate } = req.body;
  const userId = req.userId;
  try {
    const addedTask = await tasks.create({
      taskName: task,
      description: desc,
      createdAt:
        creationDate && !isNaN(Date.parse(creationDate))
          ? new Date(creationDate)
          : new Date(),
    });
    if (addedTask) {
      const updateUser = await users.findById({
        _id: userId,
      });
      if (updateUser) {
        updateUser.assignedTasks.push(addedTask._id);
        updateUser.save();
        return res.status(200).json({
          user: updateUser,
          task: addedTask,
          message: "Task created",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: `Some internal server error : ${err}`,
    });
  }
});

// get all the tasks for the specific user + the count of the pending and the completed Tasks
userRouter.get("/showtasks", userValdationMW, async (req, res) => {
  const userId = req.userId;
  const date = req.query.date;

  try {
    const userDetails = await users.findById({
      _id: userId,
    });

    const allTasks = await Promise.all(
      // map cannot handle async operations so we have to wrap in a Promise.all
      userDetails.assignedTasks.map(async (e) => {
        return await tasks.findById({
          _id: e,
        });
      })
    );

    const filteredTasks = allTasks.filter((e) => {
      const extractedDate = e.createdAt.toISOString().split("T")[0];
      if (extractedDate === date) return e;
    });

    // count of the completed and pending tasks in  the array
    const pendingTaskCount = filteredTasks.filter((e) => !e.completed).length;
    const completedTaskCount = filteredTasks.filter((e) => e.completed).length;

    return res.status(200).json({
      filter: filteredTasks,
      pendingCount: pendingTaskCount,
      completedCount: completedTaskCount,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Some Internal Server Error : ${err}`,
    });
  }
});

// endpoint to mark the task as conpleted
userRouter.put("/updateTaskStatus", userValdationMW, async (req, res) => {
  const taskId = req.query.taskId;

  try {
    const getTask = await tasks.findById({
      _id: taskId,
    });
    getTask.completed = !getTask.completed;
    getTask.save();
    return res.status(200).json({
      message: "The task status is updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: `Some internal server error : ${err}`,
    });
  }
});

// endpoint top delete the task from the DB
userRouter.delete("/deleteTask", userValdationMW, async (req, res) => {
  const taskId = req.query.taskId;
  const userId = req.userId;
  try {
    const resp = await tasks.deleteOne({
      _id: taskId,
    });
    if (resp.deletedCount === 0) {
      return res.status(404).json({
        message: "The task is not found",
      });
    }
    const findUser = await users.findById({
      _id: userId,
    });

    findUser.assignedTasks.splice(findUser.assignedTasks.indexOf(taskId), 1);
    findUser.save();
    return res.status(200).json({
      message: "The Task is deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: `Some internal server Error : ${err}`,
    });
  }
});

// endpoint to change the priority of a specific task
userRouter.put("/chagePriority", userValdationMW, async (req, res) => {
  const taskId = req.query.taskId;
  try {
    const updateTask = await tasks.findById({
      _id: taskId,
    });
    if (updateTask.priority === "low priority") {
      updateTask.priority = "high priority";
    } else {
      updateTask.priority = "low priority";
    }
    updateTask.save();
    return res.status(200).json({
      message: `The priority is changed for task : ${taskId}`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Some internal server error : ${err}`,
    });
  }
});

// endpoint to update task or the description
userRouter.put("/updateTaskDetails", userValdationMW, async (req, res) => {
  const taskId = req.query.taskId;
  const { task, desc } = req.body;
  try {
    const updatedTask = await tasks.findByIdAndUpdate(taskId, {
      taskName: task,
      description: desc,
    });
    if (updatedTask)
      return res.status(200).json({
        message: `The task details updated for ${taskId}`,
      });
  } catch (err) {
    return res.status(500).json({
      message: `Some internal server error : ${err}`,
    });
  }
});

// endpoint to filter the tasks based on the priority
// todo : merge this with showTasks endpoint
userRouter.get("/filterPriority", userValdationMW, async (req, res) => {
  const userId = req.userId;
  const filterPriority = req.query.priority;
  const date = req.query.currDate;
  try {
    const findUser = await users.findById(userId);
    const allTasks = await Promise.all(
      findUser.assignedTasks.map(async (e) => {
        return await tasks.findById(e);
      })
    );
    const filteredTasks = allTasks.filter((e) => {
      const extractedDate = e.createdAt.toISOString().split("T")[0];
      if (extractedDate === date && e.priority.includes(filterPriority))
        return e;
    });

    return res.status(200).json({
      prioritizedTasks: filteredTasks,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Some internal server error : ${err}`,
    });
  }
});

// todo : endpoint to filter the tasks on the basis of searched string

module.exports = userRouter;
