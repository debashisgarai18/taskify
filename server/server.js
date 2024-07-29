const express = require("express");
const userRouter = require("./Routes/userRouter");
const { PORT } = require("./config");
const app = express();

app.use(express.json());
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running!!`);
});
