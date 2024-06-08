const db = require('../config/db');

const saveUploadedImageUrl = async (req, res) => {
  const { uid,jobId, imageUrl } = req.body;
  try {
   
    await db.query('INSERT INTO images (uid,jobId, uploaded_image_url) VALUES (?, ?, ?)', [uid,jobId, imageUrl]);
    res.status(200).send({ message: 'Uploaded image URL saved successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const saveGeneratedImageUrl = async (req, res) => {
  const { uid,jobId, imageUrl } = req.body;
  try {
    const [images] = await db.query('SELECT * FROM images WHERE uid = ? AND jobId = ?', [uid, jobId]);
    if (images.length === 0) {
    await db.query('INSERT INTO images (uid,jobId, generated_image_url) VALUES (?, ?, ?)', [uid,jobId, imageUrl]);
    res.status(201).send({ message: 'Generated image URL saved successfully' });
    }else{
      await db.query('UPDATE images SET generated_image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE uid = ? AND jobId = ?', [imageUrl,uid,jobId ]);
      res.status(201).send({ message: 'Generated image URL updated successfully' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getUploadedImageUrls = async (req, res) => {
  const { uid } = req.params;
  try {
    
    const [rows] = await db.query('SELECT uploaded_image_url, jobId, created_at, updated_at FROM images WHERE uid = ?', [uid]);
    res.status(200).send({ images: rows });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getGeneratedImageUrls = async (req, res) => {
  const { uid } = req.params;
  try {
    const [rows] = await db.query('SELECT generated_image_url,jobId, created_at, updated_at FROM images WHERE uid = ?', [uid]);
    const images = rows.map(row => {
      const urls = row.generated_image_url ? row.generated_image_url.split(',').map(url => url.trim()) : [];
      return { ...row, generated_image_url: urls };
    });
    res.status(200).send({ images: images });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllImageUrls = async (req, res) => {
  
  try {
    const [rows] = await db.query('SELECT uploaded_image_url,generated_image_url,jobId, created_at, updated_at FROM images ORDER BY RAND() LIMIT 9');

    const images = rows.map(row => {
      const urls = row.generated_image_url ? row.generated_image_url.split(',').map(url => url.trim()) : [];
      const lastUrl = urls.length ? urls[urls.length - 1] : null;
      
      return { ...row, generated_image_url: [lastUrl] };
    });

    res.status(200).send({ images: images });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllImageByUserUrls = async (req, res) => {
  const { uid } = req.params;
  try {
    const [rows] = await db.query('SELECT uploaded_image_url,generated_image_url,jobId, created_at, updated_at FROM images WHERE uid = ?', [uid]);

    const images = rows.map(row => {
      const urls = row.generated_image_url ? row.generated_image_url.split(',').map(url => url.trim()) : [];
      return { ...row, generated_image_url: urls };
    });

    res.status(200).send({ images: images });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getImagesUrlsByJobUser = async (req, res) => {
  const { uid, jobId } = req.query;
  try {
    const [rows] = await db.query('SELECT uploaded_image_url,generated_image_url,jobId, created_at, updated_at FROM images WHERE uid = ? AND jobId = ?', [uid, jobId]);
    const images = rows.map(row => {
      const urls = row.generated_image_url ? row.generated_image_url.split(',').map(url => url.trim()) : [];
      return { ...row, generated_image_url: urls };
    });
    res.status(200).send({ images: images });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { saveUploadedImageUrl, saveGeneratedImageUrl, getUploadedImageUrls, getGeneratedImageUrls, getAllImageUrls,getAllImageByUserUrls, getImagesUrlsByJobUser };
