const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://deba018_:Debashis10@cluster0.nflzrpr.mongodb.net/taskify"
);

// defifing the taskSchema, which will accept the taskname and the description from the user
const taskSchema = new mongoose.Schema({
  taskName: String,
  description: String,
});

// defining the userSchema, which will store the username, pass and the tasks of the specific user
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  tasks: [taskSchema],
});

const tasks = mongoose.model("Tasks", taskSchema);
const users = mongoose.model("Users", userSchema);

module.exports = {
  tasks,
  users,
};
