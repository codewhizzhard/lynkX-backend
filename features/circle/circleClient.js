const axios = require("axios");
const dotenv = require("dotenv").config;

const circleClient = axios.create({
    baseURL: "https://api.circle.com/v1/w3s/",
    headers: {
        Authorization: `Bearer ${process.env.APP_ID}`,
        "Content-Type": "application/json"
    }
})

module.exports = circleClient