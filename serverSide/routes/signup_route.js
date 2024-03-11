import express from 'express'
import { signup } from '../controllers/signup_controller.js'

const signupRouter = express.Router()

signupRouter.post('/signup', signup)

export default signupRouter