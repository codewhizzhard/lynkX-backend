const axios = require("axios");

const circleClient = axios.create({
    baseURL: "https://api.circle.com/v1/w3s/",
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json"
    }
})

module.exports = circleClient