const express = require("express");
const router = express.Router();
const {login} = require("./userController");
const validateToken = require("./middleware/userMiddleware");

router.post("/login", login);

router.get("/get", validateToken,(req, res) => {
    console.log("userget:", req.user)
    res.status(200).json({message: "gotten"});
})


module.exports = router;