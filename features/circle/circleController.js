const Circle = require("./circleClient");
const asyncHandler = require("express-async-handler");
const {v4: uuidv4 } = require("uuid");
const User = require("../model/userModel");
const bcrpyt = require("bcrypt")

const getAppId = asyncHandler(async() => {
    const response = await Circle.get("/config/entity");
    return response.data.data.appId
})

const createUsers = asyncHandler(async(req, res) => {

    console.log("aopppp",await getAppId());
    const {email, password} = req.body;

    const userIsValid = await User.findOne({email});
    console.log("validUser:",userIsValid)
    if (userIsValid) return res.status(200).json({message: "connect wallet"});

    const userId = uuidv4();
    console.log("userid:", userId);
    
    const hashedPassword = await bcrpyt.hash(password, 10);

    const user = new User({
        email,
        password: hashedPassword,
        userId
    })

    await user.save();

    const response = await Circle.post("/users", {
        userId: user.userId
    })
    console.log("responsedByCircle:", response.data.data.id)
    if (response) return res.status(201).json({userId: response.data.data.id, status: response.request.status});

})

/* 
const createChallenge = asyncHandler(async (req, res) => {
    const {userId} = req.body.userId;

    const response = await Circle.post("/auth/challenges", {
        userId,
    });
    const challenge = response.data.data
    res.status(200).json({
        challengeId: challenge.id,
        clientSecret: challenge.clientSecret
    })
}) */

/* const verifyChallenge = asyncHandler(async (req, res) => {
    const {challenge_id, verification_code} = req.body;

    const response = await Circle.post("/auth/token", {
        challenge_id, verification_code
    })
    res.json(response.data.data)
}) */

const userToken = asyncHandler(async (req, res) => {
    const {userId} = req.body;
    const response = await Circle.post("/users/token", {
        userId
    });
    res.json({
        userToken: response.data.data.userToken,
        encryptionKey: response.data.data.encryptionKey
    }) ///encryptionKey
})

const initializeUser = asyncHandler(async (req, res) => {
    const idempotencykey = uuidv4();
    const response = await Circle.post("", {
        idempotencykey,
        blockchain: "ETH-MAINNET"
       
    })
    res.json(response.data.data.challenge_id)
})

module.exports = {createUsers, userToken, initializeUser}