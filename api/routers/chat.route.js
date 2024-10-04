const express = require('express');
const {
    createChat,
    getChatById,
    addMemberToChat,
    removeMemberFromChat,
    promoteMemberToAdmin,
    leaveChat,
} = require('../controllers/chat.controller');
const { verifyToken } = require('../utils/verifyToken');

const chatRouter = express.Router();

chatRouter.use(verifyToken);

// Route to create a chat
chatRouter.post('/', createChat);

// Route to get a chat by ID
chatRouter.get('/:chatId', getChatById);

// Route to add a member to a chat (only admin can do this)
chatRouter.post('/members/add', addMemberToChat);

// Route to remove a member from a chat (only admin can do this)
chatRouter.delete('/members/remove', removeMemberFromChat);

// Route to promote a member to admin in a chat (only admin can do this)
chatRouter.patch('/members/promote', promoteMemberToAdmin);

// Route to leave a chat
chatRouter.delete('/leave', leaveChat);

module.exports = { chatRouter };
