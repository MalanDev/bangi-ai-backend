const db = require('../config/db');

const saveUploadedImageUrl = async (req, res) => {
  const { uid, imageUrl } = req.body;
  try {
    await db.query('INSERT INTO images (uid, uploaded_image_url) VALUES (?, ?)', [uid, imageUrl]);
    res.status(201).send({ message: 'Uploaded image URL saved successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const saveGeneratedImageUrl = async (req, res) => {
  const { uid, imageUrl } = req.body;
  try {
    await db.query('INSERT INTO images (uid, generated_image_url) VALUES (?, ?)', [uid, imageUrl]);
    res.status(201).send({ message: 'Generated image URL saved successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getUploadedImageUrls = async (req, res) => {
  const { uid } = req.params;
  try {
    const [rows] = await db.query('SELECT uploaded_image_url, created_at, updated_at FROM images WHERE uid = ?', [uid]);
    res.status(200).send({ images: rows });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getGeneratedImageUrls = async (req, res) => {
  const { uid } = req.params;
  try {
    const [rows] = await db.query('SELECT generated_image_url, created_at, updated_at FROM images WHERE uid = ?', [uid]);
    res.status(200).send({ images: rows });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllImageUrls = async (req, res) => {
  const { uid } = req.params;
  try {
    const [rows] = await db.query('SELECT uploaded_image_url,generated_image_url, created_at, updated_at FROM images WHERE uid = ?', [uid]);
    res.status(200).send({ images: rows });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { saveUploadedImageUrl, saveGeneratedImageUrl, getUploadedImageUrls, getGeneratedImageUrls, getAllImageUrls };
