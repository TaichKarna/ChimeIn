const express = require('express')
const { updateUser, deleteUser, signOut, getFriends} = require('../controllers/user.controller')
const { verifyToken } = require('../utils/verifyToken')
const userRouter = express.Router();

userRouter.put('/update/:userId',verifyToken, updateUser);
userRouter.delete('/delete/:userId',verifyToken, deleteUser);

module.exports = { userRouter }