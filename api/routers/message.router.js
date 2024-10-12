const express = require('express');
const { sendMessage, getMessagesByChatId } = require('../controllers/message.controller');
const messageRouter = express.Router();
const { verifyToken } = require('../utils/verifyToken')

messageRouter.get('/:chatId', verifyToken, getMessagesByChatId)
messageRouter.post('/:chatId', verifyToken, sendMessage)

module.exports = { messageRouter }