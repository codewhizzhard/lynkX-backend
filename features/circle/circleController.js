const Circle = require("./circleClient");
const asyncHandler = require("express-async-handler");
const {v4: uuidv4 } = require("uuid");
const User = require("../model/userModel");
const bcrpyt = require("bcrypt")

const createUsers = asyncHandler(async(req, res) => {

    const {email, password} = req.body;

    const hashedPassword = await bcrpyt.hash(password, 10);

    const userIsValid = await User.findOne({email});
    if (userIsValid) return res.status(200).json({message: "connect wallet"});

    const userId = uuidv4();

    const user = new User({
        email,
        password: hashedPassword,
        userId
    })

    await user.save();

    const response = await Circle.post("/users", {
        userId: user.userId
    })
    if (response) return res.status(201).json({message: response.data.data.id});


   
   
})

const createChallenge = asyncHandler(async (req, res) => {
    const user_id = req.body;

    const response = await Circle.post("/auth/challenges", {
        user_id,
        client_id: process.env.APP_ID
    });
    res.json(response.data.data)
})

const verifyChallenge = asyncHandler(async (req, res) => {
    const {challenge_id, verification_code} = req.body;

    const response = await Circle.post("/auth/token", {
        challenge_id, verification_code
    })
    res.json(response.data.data)
})

const userToken = asyncHandler(async (req, res) => {
    const {userId} = req.body;
    const response = await Circle.post("token", {
        userId
    });
    res.json(response.data.data) ///encryptionKey
})

const initializeUser = asyncHandler(async (req, res) => {
    const response = await Circle.post("", {
        idempotencykey,
        blockchain: "ETH-MAINNET"
       
    })
    res.json(response.data)
})

module.exports = {createUsers, createChallenge, verifyChallenge, userToken, initializeUser}