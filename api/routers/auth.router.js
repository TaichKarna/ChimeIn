const { signin, signup } = require('../controllers/auth.controller')
const express = require('express')
const authRouter = express.Router();

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)

module.exports =  { authRouter }