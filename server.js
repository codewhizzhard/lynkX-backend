const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/database.config");
const router = require("./features/users/userRoute");

const app = express();


const PORT = process.env.PORT || 5000

connectDB()
app.listen(PORT, () => {
    console.log(`running ${PORT}`)
})
app.use(express.json());
app.use('/api/circle', require("./features/circle/circleRoutes"))
app.use("/api/user", router)