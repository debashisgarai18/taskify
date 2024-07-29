const { Router } = require("express");
const userRouter = Router();
const z = require("zod");
const { users } = require("../Database");
const bcrypt = require("bcrypt");

// making the zod schema for the input validation
const userInputCheck = z.object({
  username: z.string().email("Invalid email type!!"),
  password: z
    .string()
    .min(6, "Min 6 characters is required for the password!!"),
});

// signup endpoint
userRouter.post("/signup", async (req, res) => {
  const { uname, pwd } = req.body;

  // checking the input validation
  const check = userInputCheck.safeParse({
    username: uname,
    password: pwd,
  });
  if (check.success) {
    const hashedPwd = await bcrypt.hash(pwd, 10);


    // checking if the user exists in the DB or not
    const checkEntry = await users.findOne({
      username: uname,
    });
    console.log(checkEntry)
    if (!checkEntry) {
      // pushing the data into the DB
      const response = await users.create({
        username: uname,
        password: hashedPwd,
      });
      if (response) {
        res.status(200).json({
          message: "The data is pushed successfully!!",
        });
      } else {
        res.status(200).json({
          message: "The is some issue in pushing the data!!",
        });
      }
    } else {
      res.status(404).json({
        message: "This user already present!!",
      });
    }
  } else {
    // console.log(check.error.errors);
    const err = check.error.errors.map((e) => e.message);
    res.status(404).json({
      message: err,
    });
  }
});

userRouter.get("/signin", (req, res) => {
  res.status(200).json({
    message: "Signin endppoint is running!!",
  });
});

module.exports = userRouter;
