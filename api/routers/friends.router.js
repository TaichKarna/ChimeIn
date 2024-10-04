const express = require('express');
const { getFriendsList } = require('../controllers/friends.controller');
const { verifyToken } = require('../utils/verifyToken')

const friendsRouter = express.Router();

friendsRouter.get('/', verifyToken, getFriendsList);

module.exports =  { friendsRouter };
