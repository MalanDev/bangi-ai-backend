const express = require('express');
const { saveUploadedImageUrl, saveGeneratedImageUrl, getUploadedImageUrls, getGeneratedImageUrls, getAllImageUrls } = require('../controllers/imageController');
const router = express.Router();


router.post('/images/uploaded', saveUploadedImageUrl);
router.post('/images/generated', saveGeneratedImageUrl);
router.get('/images/uploaded/:uid', getUploadedImageUrls);
router.get('/images/generated/:uid', getGeneratedImageUrls);
router.post('/images/all/:uid', getAllImageUrls);

module.exports = router;
