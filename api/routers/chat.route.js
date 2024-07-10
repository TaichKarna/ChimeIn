const express = require('express');
const { createChat, findUserChats } = require('../controllers/chat.controller');
const router = express.Router();
const verifyToken = require('../utils/verifyToken')

router.post('/create',verifyToken,createChat);
router.get('/getuserchats', verifyToken, findUserChats)

module.exports = router