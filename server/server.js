const express = require("express");
const userRouter = require("./Routes/userRouter");
const { PORT } = require("./config");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// this needs to be checked in the cors part as we are doing {credentials  = include} while calling the API in the front-end 
app.use(cors({
  origin : ["http://localhost:5173"],
  methods : ["GET", "POST", "UPDATE", "DELETE", "PUT"],
  credentials : true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running!!`);
});
