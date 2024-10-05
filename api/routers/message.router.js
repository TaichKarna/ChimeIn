const express = require('express');
const { getMessagesByChatId } = require('../controllers/message.controller');
const messageRouter = express.Router();
const { verifyToken } = require('../utils/verifyToken')

messageRouter.get('/:chatId', verifyToken, getMessagesByChatId)

module.exports = { messageRouter }