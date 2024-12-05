const mongoose = require("mongoose");
const { mongo_url } = require("../config");
mongoose.connect(mongo_url);

// defifing the taskSchema, which will accept the taskname and the description from the user
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  priority: {
    type: String,
  },
});

// defining the userSchema, which will store the username, pass and the tasks of the specific user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignedTasks: [taskSchema],
});

const tasks = mongoose.model("Tasks", taskSchema);
const users = mongoose.model("Users", userSchema);

module.exports = {
  tasks,
  users,
};
