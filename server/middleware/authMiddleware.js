const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const auth = async (req, res, next) =>{
    //check header
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json({status: false, message: "Invalid Authentication"})
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //attach the user to the job routes
        const user = await User.findById(payload.userId).select('-password').exec()
        req.user = user;
        next();
    } catch (error) {
         res.status(StatusCodes.UNAUTHORIZED).json({status: false, message: error.message})
    }
}

module.exports = auth;