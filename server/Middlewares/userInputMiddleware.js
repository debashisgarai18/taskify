const z = require("zod");

// making the zod schema for the input validation
const userInputCheck = z.object({
  username: z.string().email("Invalid email type!!"),
  password: z
    .string()
    .min(6, "Min 6 characters is required for the password!!"),
});

const userInputMiddleware = (req, res, next) => {
  const { uname, pwd } = req.body;

  // checking the input validation
  const check = userInputCheck.safeParse({
    username: uname,
    password: pwd,
  });

  // if it passed, we'll proceed to the next call
  if(check.success) next();
  else{ 
    const err = check.error.errors.map((e) => e.message);
    res.status(404).json({
      message: err,
    });
  }
};

module.exports = userInputMiddleware;
