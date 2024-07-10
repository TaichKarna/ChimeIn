const express = require('express')
const { updateUser, deleteUser, signOut, getFriends} = require('../controllers/user.controller')
const verifyToken = require('../utils/verifyToken')
const router = express.Router();

router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout', signOut);
router.get('/friends',verifyToken, getFriends)

module.exports = router