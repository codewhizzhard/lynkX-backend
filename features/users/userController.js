const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({message: "Require both email and password"});
    const userValid = await User.findOne({email});
    if (!userValid) return res.status(400).json({message: "User not found"});
    console.log("user:", userValid);
      //res.status(200).json({message: userValid})

     const valid = await bcrypt.compare(password, userValid.password);
     if (valid) {
        const accessToken = jwt.sign({
            user: {
                userEmail: userValid.email,
                userId: userValid.id
            },
        }, "gggg", {expiresIn: "7d"});
        res.status(200).json({accessToken});
     } else {
        res.status(401).json({message: "credentials invalid"});
        throw new Error("credentials invalid")
     }
})

module.exports = {login}