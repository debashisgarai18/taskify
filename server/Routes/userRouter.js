const { Router } = require("express");
const userRouter = Router();

userRouter.get('/signin', (req, res) => {
    res.status(200).json({
        message : "Signin endppoint is running!!"
    })
})

module.exports = userRouter;