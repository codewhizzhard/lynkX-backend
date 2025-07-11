const Circle = require("./circleClient");
const asyncHandler = require("express-async-handler");
const {v4: uuidv4 } = require("uuid");
const User = require("../model/userModel");
const bcrpyt = require("bcrypt")

const getAppId = asyncHandler(async() => {
    const response = await Circle.get("/config/entity");
    return response.data.data.appId
})

const userToken = asyncHandler(async (req, res) => {
    const {userId} = req.body;
    const response = await Circle.post("/users/token", {
        userId: r
    });
    res.json({
        userToken: response.data.data.userToken,
        encryptionKey: response.data.data.encryptionKey
    }) ///encryptionKey
})

const createUsers = asyncHandler(async(req, res) => {
    // getting appId automatically and passing it as a response to the frontend
    const appId = await getAppId();
    
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({message: "Required both email and password"})
    const userIsValid = await User.findOne({email});
    if (userIsValid) return res.status(200).json({message: "sign in to wallet"});

    const userId = uuidv4();
    
    const hashedPassword = await bcrpyt.hash(password, 10);

    const user = new User({
        email,
        password: hashedPassword,
        userId
    })

    await user.save();

    const response = await Circle.post("/users", {
        userId: user.userId
    });
    if (response) return res.status(201).json({userId: response.data.data.id, status: response.data.data.status, appId});
    

})


const initializeUser = asyncHandler(async (req, res) => {
    const idempotencykey = uuidv4();
    const response = await Circle.post("", {
        idempotencykey,
        blockchain: "ETH-MAINNET"
       
    }, {
        headers: {
            "x-user-Token": "token"
        }
    })
    res.json(response.data.data.challenge_id)
    console.log("initialize:", response.data.data.challenge_id)
})

module.exports = {createUsers, userToken, initializeUser}