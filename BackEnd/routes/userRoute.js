const express = require("express")
const {registerUser , loginUser, getProfile, updateProfile, bookAppointment, getMyAppointments, cancelAppointment, updateAppointmentStatus} = require("../controllers/userController")
const authUser = require("../middlewares/authUser")
const upload = require("../middlewares/multer")
const authDoctor = require("../middlewares/authDoctor")
const userRouter = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.get("/get-profile" ,authUser, getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment' , authUser , bookAppointment)
userRouter.get('/my-appointments', authUser, getMyAppointments)
userRouter.delete('/cancel-appointment/:id', authUser,cancelAppointment);
userRouter.put('/update-appointment-status/:id', authUser, updateAppointmentStatus);





module.exports = userRouter