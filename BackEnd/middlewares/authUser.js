const jwt = require('jsonwebtoken')
require('dotenv').config()

const authUser = async (req, res, next) => {
  try {
    // ✅ Get token from headers
    const { token } = req.headers

    if (!token) {
      return res.json({
        success: false,
        message: "Access denied. No token provided."
      })
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
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

module.exports = authUser
