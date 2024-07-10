const express = require('express');
const { createMessage, getMessages } = require('../controllers/message.controller');
const router = express.Router();
const verifyToken = require('../utils/verifyToken')

router.post('/create',verifyToken, createMessage);
router.get('/getmessages', verifyToken, getMessages)

module.exports = router