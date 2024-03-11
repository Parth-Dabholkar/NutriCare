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

app.use("/user", userRouter)
app.use("/serverSide", signupRouter)

app.listen(3000, () => {
    console.log("Listening on PORT 3000!!!")
})