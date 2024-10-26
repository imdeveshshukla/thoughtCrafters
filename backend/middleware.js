const express = require("express");
const zod = require("zod")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("./config");

const authMiddleware  = (req, res, next) => {
    const authHeader = req.headers.authorization;

if(!authHeader) {
    return res.status(403).json({
        message:"Auth empty!"
    });
    
}
    try{
        // console.log(authHeader);
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        console.log(decoded);
        
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
    } catch(err) {
        return res.status(403).json({
            message:"Not verified!!"
        });
    }
}

module.exports = {
    authMiddleware
};