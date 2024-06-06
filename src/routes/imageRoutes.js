const express = require('express');
const { saveUploadedImageUrl, saveGeneratedImageUrl, getUploadedImageUrls, getGeneratedImageUrls } = require('../controllers/imageController');
const router = express.Router();

router.post('/images/uploaded', saveUploadedImageUrl);
router.post('/images/generated', saveGeneratedImageUrl);
router.get('/images/uploaded/:uid', getUploadedImageUrls);
router.get('/images/generated/:uid', getGeneratedImageUrls);

module.exports = router;
