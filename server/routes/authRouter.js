const express = require('express');
const router = express.Router();
const {register, login,getcurrentUser} = require('../controllers/auth');
const auth = require('../middleware/authMiddleware');
//user registartion

router.post('/register',register);
router.post('/login',login);
router.get('/get-current-user',auth, getcurrentUser);


module.exports = router