const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("MongoDB is connected")
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log("Listening on PORT 3000!!!")
})