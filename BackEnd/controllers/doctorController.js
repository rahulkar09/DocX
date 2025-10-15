const doctorModel = require("../models/doctorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointmentModel");
require("dotenv").config();

// ✅ Change doctor availability
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({
      success: true,
      message: "Availability Changed",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Get doctor list
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get all appointments for a doctor
const appointmentDoctor = async (req, res) => {
  try {
    const docId = req.user.id;
    const appointments = await appointmentModel
      .find({ docId })
      .populate("userId", "name image email")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Update appointment status (mark completed/incomplete)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const docId = req.user.id;

    const appointment = await appointmentModel.findOne({ _id: id, docId });
    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found or not authorized",
      });
    }

    appointment.isCompleted = isCompleted;
    await appointment.save();

    res.json({
      success: true,
      message: `Appointment marked as ${isCompleted ? "completed" : "not completed"}`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const docId = req.user.id;

    const appointment = await appointmentModel.findOne({ _id: id, docId });
    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found or not authorized",
      });
    }

    appointment.cancelled = true;
    appointment.isCompleted = false;
    await appointment.save();

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const doctorProfile = async(req,res) => {
    try{
        const docId = req.user.id  // ✅ Direct assignment
        const profileData = await doctorModel.findById(docId).select('-password')  // ✅ Use findById
        
        return res.json({
            success : true,
            profileData
        })
    }
    catch(error){
        console.log(error);
        res.json({
          success: false,
          message: error.message
        })
    }
}

const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.user.id;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    return res.json({
      success: true,
      message: "profile updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Export all controllers
module.exports = {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentDoctor,
  updateAppointmentStatus,
  cancelAppointment,
  doctorProfile,
  updateDoctorProfile
};
