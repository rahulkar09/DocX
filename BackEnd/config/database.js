const mongoose = require("mongoose");

require("dotenv").config()

const dbConnect =() =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("DB connected successfully")})
    .catch((err)=>{
        console.log("DB connection failed");
        console.error(err)
        process.exit(1);
    })
}

module.exports = dbConnect;