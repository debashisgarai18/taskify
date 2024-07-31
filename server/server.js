const express = require("express");
const userRouter = require("./Routes/userRouter");
const { PORT } = require("./config");
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running!!`);
});
