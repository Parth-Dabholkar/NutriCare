import User from "../models/user_model.js"
import bcryptjs from 'bcryptjs' // For hashing. If someone hacks database they cannot see the passwords
import { errorHandler } from "../utils/errors.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    console.log(req.body)

    //destructuring to get username, email and password from request body(post request)
    const { username, email, password } = req.body

    //if username,email,password field is empty, throw this error
    if(!username || !email || !password || username === '' || email === ''|| password === '')
    {
        next(errorHandler(400, 'All fields are required!!'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10) // hash the password for 10 rounds

    //To store the data in mongoDB using User model
    const newUser = new User({
        username,
        email,
        password : hashedPassword, // now we save hashedPassword instead of password string for protection
    })
    
    //Try catch block to display error
    try
    {
        await newUser.save() // To save the data in mongoDB
        res.json('signup successful')// To show that signup is successful
    }
    catch(err)
    {
        next(err)//Throw error if username or password is same
    }

}

export const signin = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password || email === '' || password === '')
    {
        next(errorHandler(400, 'All fields are required!!'))
    }

    try{
        const validUser = await User.findOne({email})

        if(!validUser)
        {
            next(errorHandler(404,"User not found!!"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword)
        {
           return next(errorHandler(400,'Inavlid Password!!'))
        }
        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)

        const {password : pass, ...rest} = validUser._doc
        res.status(200).cookie('access_token', token, {
            httpOnly : true
        }).json(rest)
    }
    catch(error)
    {
        next(error)
    }
}