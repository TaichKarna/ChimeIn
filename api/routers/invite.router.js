const express = require('express')
const verifyToken = require('../utils/verifyToken')
const router = express.Router();
const { addFriends } = require('../controllers/invite.controller');

router.post('/:friendId', verifyToken, addFriends); // add friends from token id and invite id


module.exports = router