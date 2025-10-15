const express = require("express")
const { doctorList, loginDoctor, appointmentDoctor, doctorProfile, updateDoctorProfile } = require("../controllers/doctorController")
const authDoctor = require("../middlewares/authDoctor")
const { updateAppointmentStatus, cancelAppointment } = require("../controllers/userController")

const doctorRouter = express.Router()


doctorRouter.get('/list' , doctorList)
doctorRouter.post('/login' , loginDoctor)
doctorRouter.get('/appointments' , authDoctor , appointmentDoctor)
doctorRouter.put("/update-appointment-status/:id", authDoctor, updateAppointmentStatus);
doctorRouter.delete("/cancel-appointment/:id", authDoctor, cancelAppointment);
doctorRouter.get('/profile' , authDoctor , doctorProfile)
doctorRouter.post('/update-profile' , authDoctor , updateDoctorProfile)
module.exports = doctorRouter