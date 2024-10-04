const express = require('express');
const { sendFriendRequest, respondToFriendRequest, getFriendRequests } = require('../controllers/invite.controller');
const { verifyToken } = require('../utils/verifyToken')
const inviteRouter = express.Router();

inviteRouter.post('/', verifyToken, sendFriendRequest);

inviteRouter.post('/respond', verifyToken, respondToFriendRequest);

inviteRouter.get('/:userId', verifyToken, getFriendRequests);

module.exports = { inviteRouter }
