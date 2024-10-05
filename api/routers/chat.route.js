const express = require('express');
const {
    createChat,
    getChatById,
    addMemberToChat,
    removeMemberFromChat,
    promoteMemberToAdmin,
    leaveChat,
    getAllChats
} = require('../controllers/chat.controller');
const { verifyToken } = require('../utils/verifyToken');

const chatRouter = express.Router();

chatRouter.use(verifyToken);

chatRouter.post('/', createChat);

chatRouter.get('/', getAllChats)

chatRouter.get('/:chatId', getChatById);

chatRouter.post('/members/add', addMemberToChat);

chatRouter.delete('/members/remove', removeMemberFromChat);

chatRouter.patch('/members/promote', promoteMemberToAdmin);

chatRouter.delete('/leave', leaveChat);

module.exports = { chatRouter };
