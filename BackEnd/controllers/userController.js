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
            return res.json({
                success : false,
                message : "Missing details"
            })
          }
       if(!validator.isEmail(email)){
         return res.json({
                success : false,
                message : "Enter a valid email"
            })
       }

       if(password.length < 8){
         return res.json({
                success : false,
                message : "Enter a strong password"
            })
       }


     //hashing user password

     const salt   = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password , salt)


     const userData = {
        name , email , password : hashedPassword 
     }

     const newUser = new userModel(userData)
     const user = await newUser.save()
     
     const token = jwt.sign({id:user._id}  , process.env.JWT_SECRET )
     
     
     
     res.json({
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
        const user = await userModel.findOne({email})


        if(!user){
            return res.json({
                success : false,
                message : "User doesnot exist"
            })
        }


        const isMatch = await bcrypt.compare(password , user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)
            res.json({
                success : true,
                token
            })
        }
        else{
            return res.json({
                success : false,
                message : "Invalid credentials"
            })
        }


    }
    catch(error){
       console.log(error)
       res.json({
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

        if(!name || !phone || !address || !dob || !gender){
            return res.json({
                success : false,
                message : "Data missing"
            })
        }

        await userModel.findByIdAndUpdate(userId , { name,phone,address,dob,gender})

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
       res.json({
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
        const docData  = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({
                success : false,
                message : "Doctor not available"
            })
        }
        let slot_booked = docData.slot_booked

        // checking for slots availiblity
        if(slot_booked[slotDate]){
            if(slot_booked[slotDate].includes(slotTime)){
                return res.json({
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

        delete docData.slot_booked


        const appointmentData = {
            userId , docData , userData , docId , amount : docData.fees , slotTime , slotDate , date : Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots in docData
       await doctorModel.findByIdAndUpdate(docId, { slot_booked });
       res.json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
    }
    catch(error){
        console.log(error);
    res.json({ success: false, message: error.message });

    }
}

// GET /api/user/my-appointments
const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // Make sure middleware sets req.user = userId
    const appointments = await appointmentModel.find({ userId }).populate('docData', '-password');
    res.json({ success: true, appointments });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// DELETE /api/user/cancel-appointment/:id
const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await appointmentModel.findByIdAndDelete(appointmentId);
    res.json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


// PATCH /api/doctor/update-appointment-status/:id
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { isCompleted } = req.body;

    // Validate
    if (typeof isCompleted !== "boolean") {
      return res.json({
        success: false,
        message: "isComplete must be a boolean value (true or false)",
      });
    }

    const updated = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { isCompleted },
      { new: true }
    );

    if (!updated) {
      return res.json({
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
    res.json({
      success: false,
      message: err.message,
    });
  }
};




//payment -- 11:34:55 - 12:15:00


module.exports = {registerUser , loginUser , getProfile , updateProfile , bookAppointment , getMyAppointments , cancelAppointment,updateAppointmentStatus}