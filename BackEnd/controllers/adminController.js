const isEmail = require('validator/lib/isEmail')
const { v2: cloudinary } = require('cloudinary')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel')
require('dotenv').config()

// ✅ API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // ✅ Check if all fields are present
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        // ✅ Email validation
        if (!isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        // ✅ Check if doctor already exists
        const existingDoctor = await doctorModel.findOne({ email })
        if (existingDoctor) {
            return res.json({
                success: false,
                message: "Doctor with this email already exists"
            })
        }

        // ✅ Password strength check
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long"
            })
        }

        // ✅ Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // ✅ Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        // ✅ Prepare doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            available: true,
            slot_booked: [],
            date: Date.now()
        }

        // ✅ Save doctor to DB
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        return res.json({
            success: true,
            message: "Doctor added successfully"
        })
    } catch (err) {
        console.error("Error in addDoctor:", err)
        return res.json({
            success: false,
            message: err.message
        })
    }
}

// ✅ API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        // ✅ Validate fields
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required"
            })
        }

        // ✅ Compare with admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET,
                // { expiresIn: "1d" }
            )

            return res.json({
                success: true,
                message: "Admin logged in successfully",
                token
            })
        } else {
            return res.json({
                success: false,
                message: "Invalid admin credentials"
            })
        }

    } catch (err) {
        console.error("Error in loginAdmin:", err)
        return res.json({
            success: false,
            message: err.message
        })
    }
}

//api to get all doctors
const allDoctors = async(req,res)=> {
    try{
        const doctors = await doctorModel.find({}).select('-password')

        res.json({
            success:true,
            doctors
        })
    }
    catch(err){
        console.log(err)
        res.json({
            success:false,
            message: err.message
        })
    }
}

module.exports = { addDoctor, loginAdmin , allDoctors }
