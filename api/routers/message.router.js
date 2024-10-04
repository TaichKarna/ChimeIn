const express = require('express');
const { createMessage, getMessages } = require('../controllers/message.controller');
const messageRouter = express.Router();
const { verifyToken } = require('../utils/verifyToken')

messageRouter.post('/create',verifyToken, createMessage);
messageRouter.get('/getmessages', verifyToken, getMessages)

module.exports = { messageRouter }