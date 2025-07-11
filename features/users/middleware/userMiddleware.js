const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, "gggg", (err, decoded) => {
            if (err) {
               return  res.status(401).json({message: "user not authorized"});
            }
            req.user = decoded?.user;
            next();
        })
    } else {
        return res.status(401).json({message: "Not Authorized"});
    }
    
})

module.exports = validateToken;