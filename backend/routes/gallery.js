const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const cloudinary = require('../config/cloudinary');
const authMiddleware = require('../middleware/auth');

// Constants for file size limits
const IMAGE_MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const VIDEO_MAX_SIZE = 100 * 1024 * 1024; // 100 MB

// Get all gallery items (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// Get gallery item by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM gallery WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    res.status(500).json({ error: 'Failed to fetch gallery item' });
  }
});

// Create a new gallery item (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, media_type, media_base64, thumbnail_base64 } = req.body;

    if (!title || !media_type || !media_base64) {
      return res.status(400).json({ error: 'Missing required fields: title, media_type, media_base64' });
    }

    if (!['image', 'video'].includes(media_type)) {
      return res.status(400).json({ error: 'Invalid media_type. Must be "image" or "video"' });
    }

    // Validate file size from base64
    const base64Size = Buffer.byteLength(media_base64, 'base64');
    const maxSize = media_type === 'image' ? IMAGE_MAX_SIZE : VIDEO_MAX_SIZE;

    if (base64Size > maxSize) {
      const maxMB = media_type === 'image' ? '10' : '100';
      return res.status(400).json({ error: `File size exceeds ${maxMB}MB limit` });
    }

    let media_url = null;
    let thumbnail_url = null;

    try {
      // Upload media to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(media_base64, {
        folder: 'zeroone-gallery',
        resource_type: 'auto',
        ...(media_type === 'video' && { video_sampling: 5 }),
      });
      media_url = uploadResponse.secure_url;

      // Upload thumbnail to Cloudinary if provided
      if (thumbnail_base64) {
        const thumbResponse = await cloudinary.uploader.upload(thumbnail_base64, {
          folder: 'zeroone-gallery/thumbnails',
          resource_type: 'auto',
        });
        thumbnail_url = thumbResponse.secure_url;
      } else if (media_type === 'video') {
        // Auto-generate thumbnail for videos
        thumbnail_url = media_url.replace(/\/upload\//, '/upload/w_500,h_300,c_fill/');
      } else {
        // Use the image itself as thumbnail
        thumbnail_url = media_url.replace(/\/upload\//, '/upload/w_500,h_300,c_fill/');
      }
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(400).json({ error: 'Media upload failed' });
    }

    const result = await pool.query(
      `INSERT INTO gallery (title, description, media_url, media_type, thumbnail_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description || '', media_url, media_type, thumbnail_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ error: 'Failed to create gallery item' });
  }
});

// Update a gallery item (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, media_type, media_base64, thumbnail_base64 } = req.body;

    let media_url = undefined;
    let thumbnail_url = undefined;

    // Upload new media if provided
    if (media_base64 && media_type) {
      if (!['image', 'video'].includes(media_type)) {
        return res.status(400).json({ error: 'Invalid media_type. Must be "image" or "video"' });
      }

      const base64Size = Buffer.byteLength(media_base64, 'base64');
      const maxSize = media_type === 'image' ? IMAGE_MAX_SIZE : VIDEO_MAX_SIZE;

      if (base64Size > maxSize) {
        const maxMB = media_type === 'image' ? '10' : '100';
        return res.status(400).json({ error: `File size exceeds ${maxMB}MB limit` });
      }

      try {
        const uploadResponse = await cloudinary.uploader.upload(media_base64, {
          folder: 'zeroone-gallery',
          resource_type: 'auto',
        });
        media_url = uploadResponse.secure_url;

        if (thumbnail_base64) {
          const thumbResponse = await cloudinary.uploader.upload(thumbnail_base64, {
            folder: 'zeroone-gallery/thumbnails',
            resource_type: 'auto',
          });
          thumbnail_url = thumbResponse.secure_url;
        } else if (media_type === 'video') {
          thumbnail_url = media_url.replace(/\/upload\//, '/upload/w_500,h_300,c_fill/');
        } else {
          thumbnail_url = media_url.replace(/\/upload\//, '/upload/w_500,h_300,c_fill/');
        }
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(400).json({ error: 'Media upload failed' });
      }
    }

    let updateQuery = `UPDATE gallery SET 
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      updated_at = CURRENT_TIMESTAMP`;

    const params = [title, description];
    let paramIndex = 3;

    if (media_url !== undefined) {
      updateQuery += `, media_url = $${paramIndex}`;
      params.push(media_url);
      paramIndex++;
    }

    if (thumbnail_url !== undefined) {
      updateQuery += `, thumbnail_url = $${paramIndex}`;
      params.push(thumbnail_url);
      paramIndex++;
    }

    updateQuery += ` WHERE id = $${paramIndex} RETURNING *`;
    params.push(id);

    const result = await pool.query(updateQuery, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ error: 'Failed to update gallery item' });
  }
});

// Delete a gallery item (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM gallery WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

module.exports = router;
