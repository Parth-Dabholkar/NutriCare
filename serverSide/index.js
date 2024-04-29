import express from 'express'
const app = express()
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user_route.js'
import signupRouter from './routes/signup_route.js'
import nodemailer from 'nodemailer'
import bodyparser from 'body-parser'

const mailtrapUser = 'e2974501361b28'
const mailtrapPass = '8bd47ab35020dd'
const mailtrapHost = 'sandbox.smtp.mailtrap.io'
const mailtrapPort = 2525

const transporter = nodemailer.createTransport({
    host: mailtrapHost,
    port: mailtrapPort,
    auth: {
      user: mailtrapUser,
      pass: mailtrapPass,
    },
  });

dotenv.config()
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

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

app.post('/api/send-feedback', (req, res) => {
    const { email, message } = req.body;
  
    const mailOptions = {
      from: email, // Email of the sender
      to: 'highauthoritycorporation@gmail.com', // Replace with the recipient's email address
      subject: 'Feedback Form Submission',
      text: `You received a new feedback message from: ${email}\n\nMessage:\n${message}`,
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        res.status(500).json({ error: 'Error sending feedback. Please try again.' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ success: 'Feedback sent successfully.' });
      }
    });
  });

app.listen(3000, () => {
    console.log("Listening on PORT 3000!!!")
})