const fs = require('fs')
const path = require('path')
const multer = require('multer')

const uploadDir = path.join(__dirname, '..', 'uploads')

// check if folder exists, if not create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

module.exports = upload
