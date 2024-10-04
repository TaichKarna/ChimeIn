const express = require('express');
const Multer = require('multer');
const { uploadImage } = require('../controllers/upload.controller');
const { verifyToken } = require('../utils/verifyToken')

const uploadRouter = express.Router();

const storage = new Multer.memoryStorage();
const upload = Multer({ storage });

uploadRouter.post('/images', verifyToken, upload.single('file'), uploadImage);

module.exports = { uploadRouter }
