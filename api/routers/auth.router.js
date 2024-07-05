const {signin, signup, google} = require('../controllers/auth.controller')
const express = require('express')
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
module.exports = router