const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");


const connectDB = asyncHandler(async() => {
    const db = await mongoose.connect(process.env.MANGO_DB)
    console.log(`database running on: ${db.connection.host}`)
})

module.exports = connectDB