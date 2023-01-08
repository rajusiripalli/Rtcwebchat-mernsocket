const router = require("express").Router();
const auth = require('../middleware/authMiddleware');
const {createChat, getAllchats} = require('../controllers/chats');



// create a new chat
router.post("/create-new-chat", auth, createChat);

// get all chats of current user

router.get("/get-all-chats", auth, getAllchats);
  
  // clear all unread messages of a chat
  
//   router.post("/clear-unread-messages", authMiddleware, async (req, res) => {
//     try {
//       // find chat and update unread messages count to 0
//       const chat = await Chat.findById(req.body.chat);
//       if (!chat) {
//         return res.send({
//           success: false,
//           message: "Chat not found",
//         });
//       }
//       const updatedChat = await Chat.findByIdAndUpdate(
//         req.body.chat,
//         {
//           unreadMessages: 0,
//         },
//         { new: true }
//       )
//         .populate("members")
//         .populate("lastMessage");
  
//       // find all unread messages of this chat and update them to read
//       await Message.updateMany(
//         {
//           chat: req.body.chat,
//           read: false,
//         },
//         {
//           read: true,
//         }
//       );
//       res.send({
//         success: true,
//         message: "Unread messages cleared successfully",
//         data: updatedChat,
//       });
//     } catch (error) {
//       res.send({
//         success: false,
//         message: "Error clearing unread messages",
//         error: error.message,
//       });
//     }
//   });
  
  module.exports = router;