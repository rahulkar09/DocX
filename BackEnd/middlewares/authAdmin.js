const jwt = require('jsonwebtoken')
require('dotenv').config()

const authAdmin = async (req, res, next) => {
  try {
    // ✅ Get token from headers
    const { atoken } = req.headers

    if (!atoken) {
      return res.json({
        success: false,
        message: "Access denied. No token provided."
      })
    }

    // ✅ Verify token
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET)

    // ✅ Check if token belongs to the admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Unauthorized access"
      })
    }

    // ✅ Token verified successfully
    next()
  } catch (err) {
    console.error("Error in authAdmin:", err)
    return res.json({
      success: false,
      message: "Invalid or expired token"
    })
  }
}

module.exports = authAdmin
