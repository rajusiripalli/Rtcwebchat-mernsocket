
const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');

 const register = async (req, res) => {
    try {
           //check user if already exist or not;
        const user = await User.findOne({email: req.body.email}).exec()
        if(user){
           return res.status(StatusCodes.OK).json({
                status: false,
                message: "User already exist",
            })
        }

        //create new user
        const newuser = await User.create({...req.body});
        const token = newuser.createJWT()
        res.status(StatusCodes.CREATED).json({status: true, message: "user created successfully", data: {name: newuser.name, email: newuser.email}, token})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            status: false
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
 
        if(!email || !password){
            return res.status(StatusCodes.OK).json({
                message: 'Please provide username and password',
                status: false
            })    }
     
        const user = await User.findOne({email}).exec();
     
        if(!user){
           return res.status(StatusCodes.OK).json({
                message: 'Invalid credentails',
                status: false
            }) 
        }
     
        //compare password
        const isPasswordCorrect = await user.ComparePassword(password);
        if(!isPasswordCorrect){
          return res.status(StatusCodes.OK).json({
                message: 'Password incorrect',
                status: false
            }) 
        }
     
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({status: true, message: "Logged in successfully", user: {name: user.name}, token})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            status: false
        })
        console.log("login error", error);
    }
  
 
 
 }

 const getcurrentUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(StatusCodes.OK).json({status: true, message: "user data fetched successfully", data: user})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, message: error.message})

    }
 }

 const getallUsers = async (req, res) =>{
    try {
        const user = req.user;

        const allUsers = await User.find({ _id: { $ne: user._id } }).select("-password")
        res.status(StatusCodes.OK).json({
                status: true, 
                message: "Users fetched successfully", 
                data: allUsers
        })
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, message: error.message})

      }
 }


module.exports = {
    register,
    login, 
    getcurrentUser,
    getallUsers
}