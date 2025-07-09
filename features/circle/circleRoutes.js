const express = require("express");

const router = express.Router();

const {createUsers, userToken, initializeUser} = require("./circleController");

router.post("/create/user", createUsers);
/* router.post('/create-challenge', createChallenge);
router.post('/verify-challenge', verifyChallenge); */
router.post("/userToken", userToken);
router.post("/user/initialize", initializeUser)


module.exports = router