import express from 'express'
const app = express()
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user_route.js'
import signupRouter from './routes/signup_route.js'

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("MongoDB is connected")
}).catch((err) => {
    console.log(err)
})

app.use("/api/user", userRouter)
app.use("/api/serverSide", signupRouter)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    })
})

app.listen(3000, () => {
    console.log("Listening on PORT 3000!!!")
})