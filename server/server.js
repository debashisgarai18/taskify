const express = require('express');
const userRouter = require('./Routes/userRouter')
const app = express();

app.use('/user', userRouter);
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running!!');
})
