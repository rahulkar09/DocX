const mongoose = require("mongoose");

require("dotenv").config()

const dbConnect = () => {
    if (!process.env.MONGODB_URL) {
        console.error("ERROR: MONGODB_URL is not defined in environment variables");
        process.exit(1);
    }

    return mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
    })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.error("DB connection failed:", err.message);
        process.exit(1);
    });
}

module.exports = dbConnect;