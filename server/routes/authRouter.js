const express = require('express');
const router = express.Router();
const {register, login,getcurrentUser, getallUsers} = require('../controllers/auth');
const auth = require('../middleware/authMiddleware');
//user registartion

router.post('/register',register);
router.post('/login',login);
router.get('/get-current-user',auth, getcurrentUser);
router.get("/get-all-users",auth, getallUsers);


module.exports = router