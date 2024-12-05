const express = require("express");
const userRouter = require("./Routes/userRouter");
const { PORT } = require("./config");
const app = express();
const cors = require('cors');

// this needs to be checked in the cors part as we are doing {credentials  = include} while calling the API in the front-end 
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running!!`);
});
