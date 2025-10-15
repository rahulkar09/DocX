const jwt = require('jsonwebtoken')
require('dotenv').config()

const authDoctor = async (req, res, next) => {
  try {
    // ✅ Get token from headers
    const { dtoken } = req.headers

    if (!dtoken) {
      return res.json({
        success: false,
        message: "Access denied. No token provided."
      })
    }

    // ✅ Verify token
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET)
    req.user = decoded // ✅ Fixed this line

    // ✅ Token verified successfully
    next()
  } catch (err) {
    console.error("Error in authUser:", err)
    return res.json({
      success: false,
      message: "Invalid or expired token"
    })
  }
}

module.exports = authDoctor
