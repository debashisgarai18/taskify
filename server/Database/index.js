const mongoose = require("mongoose");
const { mongo_url } = require("../config");
mongoose.connect(mongo_url);

// defifing the taskSchema, which will accept the taskname and the description from the user
const taskSchema = new mongoose.Schema({
  taskName: String,
  description: String,
});

// defining the userSchema, which will store the username, pass and the tasks of the specific user
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  assignedTasks: [taskSchema]
});

// todo : update the tasks schema with the start date, completed, priority stuff

const tasks = mongoose.model("Tasks", taskSchema);
const users = mongoose.model("Users", userSchema);

module.exports = {
  tasks,
  users,
};
