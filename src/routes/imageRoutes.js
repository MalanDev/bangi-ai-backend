const express = require('express');
const { saveUploadedImageUrl, saveGeneratedImageUrl, getUploadedImageUrls, getGeneratedImageUrls, getAllImageUrls, getImagesUrlsByJobUser, getAllImageByUserUrls } = require('../controllers/imageController');
const router = express.Router();


router.post('/images/uploaded', saveUploadedImageUrl);
router.post('/images/generated', saveGeneratedImageUrl);
router.get('/images/uploaded/:uid', getUploadedImageUrls);
router.get('/images/generated/:uid', getGeneratedImageUrls);
router.get('/images/all', getAllImageUrls);
router.get('/images/all/byUser/:uid', getAllImageByUserUrls);
router.get('/images/jobUser', getImagesUrlsByJobUser);

module.exports = router;
