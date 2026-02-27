const validator = require('validator')
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { v2: cloudinary } = require('cloudinary')
const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')


const registerUser = async (req,res)=>{
    try {
          const {name , email , password} = req.body

          if(!name || !password || !email){
            return res.status(400).json({
                success : false,
                message : "Missing details"
            })
          }
       if(!validator.isEmail(email)){
         return res.status(400).json({
                success : false,
                message : "Enter a valid email"
            })
       }

       if(password.length < 8){
         return res.status(400).json({
                success : false,
                message : "Enter a strong password"
            })
       }

       // prevent duplicate registration
       const existing = await userModel.findOne({ email });
       if (existing) {
         return res.status(400).json({
           success: false,
           message: "User already registered with this email",
         });
       }


     //hashing user password

     const salt   = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password , salt)


     const userData = {
        name , email , password : hashedPassword 
     }

     const newUser = new userModel(userData)
     const user = await newUser.save()
     
     const token = jwt.sign({id:user._id}  , process.env.JWT_SECRET , { expiresIn: '7d' })
     
     
     
     res.status(201).json({
        success : true,
        token
     })





    }
    catch(error){
       console.log(error)
       res.json({
        success : false, 
        message : error.message
       })
    }
}



//api for login user
const loginUser = async(req,res)=>{
    try{
        const {email , password } = req.body

        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "Email and password are required",
          });
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET, { expiresIn: '7d' })
            return res.json({
                success : true,
                token
            })
        }
        else{
            return res.status(401).json({
                success : false,
                message : "Invalid credentials"
            })
        }


    }
    catch(error){
       console.log(error)
       res.status(500).json({
        success : false, 
        message : error.message
       })
    }
}

//api to get user profile
const getProfile = async (req,res) => {
    try{
        const userId = req.user.id
        const userData = await userModel.findById(userId).select('-password')

        return res.json({
            success : true,
            userData
        })

    }
    catch(error){
          console.log(error)
       res.json({
        success : false, 
        message : error.message
       })
    }
}

//update the user profile
const updateProfile = async(req,res)=>{
    try{
        const userId = req.user.id
        const { name , phone , address ,dob , gender} = req.body
        const imageFile = req.file

        // allow partial updates but at least one field should be present
        if(!name && !phone && !address && !dob && !gender && !imageFile){
            return res.status(400).json({
                success : false,
                message : "Nothing to update"
            })
        }

        const updateFields = {};
        if (name) updateFields.name = name;
        if (phone) updateFields.phone = phone;
        if (address) updateFields.address = address;
        if (dob) updateFields.dob = dob;
        if (gender) updateFields.gender = gender;

        await userModel.findByIdAndUpdate(userId , updateFields)

        if(imageFile){
            const uploadImage = await cloudinary.uploader.upload(imageFile.path , {resource_type: 'image'})
            const imageURL = uploadImage.secure_url

            await userModel.findByIdAndUpdate(userId , {image: imageURL})
        }

        return res.json({
            success : true,
            message : "profile updated"
        })

    }
    catch(error){
       console.log(error)
       res.status(500).json({
        success : false, 
        message : error.message
       })  
    }
}

//api for booking
const bookAppointment = async(req,res)=>{
    try{
        const userId = req.user.id
        const {docId , slotDate , slotTime} = req.body

        if (!docId || !slotDate || !slotTime) {
          return res.status(400).json({
            success: false,
            message: 'Please provide docId, slotDate and slotTime',
          });
        }

        const docData  = await doctorModel.findById(docId).select('-password')
        if (!docData) {
          return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        if(!docData.available){
            return res.status(400).json({
                success : false,
                message : "Doctor not available"
            })
        }
        // ensure we have an object to mutate
        let slot_booked = docData.slot_booked || {}

        // checking for slots availability
        if(slot_booked[slotDate]){
            if(slot_booked[slotDate].includes(slotTime)){
                return res.status(409).json({
                    success : false,
                    message : "Slot not available"
                })
            }
            else{
                slot_booked[slotDate].push(slotTime)
            }
        }
        else{
            slot_booked[slotDate]= []
            slot_booked[slotDate].push(slotTime)
        }

        const userData =await userModel.findById(userId).select('-password')

        // do not send internal slot data back to client
        const safeDocData = { ...docData.toObject() }
        delete safeDocData.slot_booked

        const appointmentData = {
            userId , docData: safeDocData , userData , docId , amount : docData.fees , slotTime , slotDate , date : Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots in doctor
       await doctorModel.findByIdAndUpdate(docId, { slot_booked });
       res.json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
    }
    catch(error){
        console.log(error);
    res.status(500).json({ success: false, message: error.message });

    }
}

// GET /api/user/my-appointments
const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // middleware attaches user
    const appointments = await appointmentModel.find({ userId });
    // docData is stored as an object, not a ref, so populate does nothing
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/user/cancel-appointment/:id
const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // release the slot in doctor's schedule
    const { docId, slotDate, slotTime } = appointment;
    if (docId) {
      const doc = await doctorModel.findById(docId);
      if (doc && doc.slot_booked && doc.slot_booked[slotDate]) {
        doc.slot_booked[slotDate] = doc.slot_booked[slotDate].filter(t => t !== slotTime);
        await doc.save();
      }
    }

    await appointmentModel.findByIdAndDelete(appointmentId);
    res.json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// PATCH /api/doctor/update-appointment-status/:id
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { isCompleted } = req.body;

    // Validate
    if (typeof isCompleted !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isCompleted must be a boolean value (true or false)",
      });
    }

    const updated = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { isCompleted },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: `Appointment marked as ${isCompleted ? "completed" : "pending"}`,
      appointment: updated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




//payment -- 11:34:55 - 12:15:00


module.exports = {registerUser , loginUser , getProfile , updateProfile , bookAppointment , getMyAppointments , cancelAppointment,updateAppointmentStatus}