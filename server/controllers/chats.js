const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const {StatusCodes} = require('http-status-codes');


const createChat = async (req, res) =>{
  try {
    const newChat = new Chat(req.body);
    const savedChat = await newChat.save();

    // populate members and last message in saved chat
   // await savedChat.populate("members");
    
    res.status(StatusCodes.OK).json({
        status: true, 
        message: "Chat created successfully", 
        data: savedChat
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Error creating chat",
        error: error.message,
    })
  }
}

const getAllchats = async (req, res) => {
    try {
        const user = req.user;

        const chats = await Chat.find({
          members: {
            $in: [user._id],
          },
        })
          // .populate("members")
          // .populate("lastMessage")
          // .sort({ updatedAt: -1 });
        res.status(StatusCodes.OK).json({
          success: true,
          message: "Chats fetched successfully",
          data: chats,
        });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Error fetching chats",
          error: error.message,
        });
      }
}


module.exports = {
    createChat,
    getAllchats
}