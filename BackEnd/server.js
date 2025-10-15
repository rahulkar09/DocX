const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConnect = require('../BackEnd/config/database')
const connectCloudinary = require('./config/cloudinary')
const adminRouter = require('./routes/adminRoute')
const doctorRouter = require('./routes/doctorRoute')
const userRouter = require('./routes/userRoute')


const app = express()
const PORT = process.env.PORT || 4000

//middlewares

app.use(express.json())
app.use(cors())

//API endpoint

app.use('/api/admin', adminRouter)
app.use('/api/doctor' , doctorRouter)
app.use('/api/user', userRouter)


app.get('/',(req,res) => {
    res.send("Api Working")
})

dbConnect();
connectCloudinary();

app.listen(PORT , ()=>{
    console.log("server started at port number" , PORT)
})


