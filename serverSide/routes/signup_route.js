import express from 'express'
import { signin, signup, google } from '../controllers/signup_controller.js'

const signupRouter = express.Router()

signupRouter.post('/signup', signup)
signupRouter.post('/signin', signin)
signupRouter.post('/google', google)

export default signupRouter