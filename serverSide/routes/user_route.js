import express from 'express'
import { test } from '../controllers/user_controller.js'
import { signout } from '../controllers/user_controller.js'
const userRouter = express.Router()

userRouter.get("/test", test)
userRouter.post("/signout", signout)

export default userRouter