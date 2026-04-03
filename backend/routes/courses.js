const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const cloudinary = require('../config/cloudinary');
const authMiddleware = require('../middleware/auth');

// Get all featured courses (public)
router.get('/featured', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses WHERE featured = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    res.status(500).json({ error: 'Failed to fetch featured courses' });
  }
});

// Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Create a new course (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, short_description, price, location_type, course_length_hours, number_of_sessions, featured, image_base64 } = req.body;

    if (!name || !description || price === undefined || !location_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let image_url = null;

    // Upload image to Cloudinary if provided
    if (image_base64) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image_base64, {
          folder: 'zeroone-courses',
          resource_type: 'auto',
        });
        image_url = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(400).json({ error: 'Image upload failed' });
      }
    }

    const result = await pool.query(
      `INSERT INTO courses (name, description, short_description, price, image_url, location_type, course_length_hours, number_of_sessions, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, description, short_description || description.substring(0, 200), price, image_url, location_type, course_length_hours || null, number_of_sessions || null, featured || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update a course (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, short_description, price, location_type, course_length_hours, number_of_sessions, featured, image_base64 } = req.body;

    let image_url = undefined;

    // Upload new image to Cloudinary if provided
    if (image_base64) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image_base64, {
          folder: 'zeroone-courses',
          resource_type: 'auto',
        });
        image_url = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(400).json({ error: 'Image upload failed' });
      }
    }

    let updateQuery = `UPDATE courses SET 
      name = COALESCE($1, name),
      description = COALESCE($2, description),
      short_description = COALESCE($3, short_description),
      price = COALESCE($4, price),
      location_type = COALESCE($5, location_type),
      course_length_hours = COALESCE($6, course_length_hours),
      number_of_sessions = COALESCE($7, number_of_sessions),
      featured = COALESCE($8, featured),
      updated_at = CURRENT_TIMESTAMP`;

    const params = [name, description, short_description, price, location_type, course_length_hours, number_of_sessions, featured];

    if (image_url !== undefined) {
      updateQuery += `, image_url = $${params.length + 1}`;
      params.push(image_url);
    }

    updateQuery += ` WHERE id = $${params.length + 1} RETURNING *`;
    params.push(id);

    const result = await pool.query(updateQuery, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete a course (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM courses WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

module.exports = router;
