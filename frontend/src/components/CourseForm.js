import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/CourseForm.css';

const CourseForm = ({ course, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    price: '',
    location_type: 'online',
    course_length_hours: '',
    number_of_sessions: '',
    featured: false,
    image_base64: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        description: course.description || '',
        short_description: course.short_description || '',
        price: course.price || '',
        location_type: course.location_type || 'online',
        course_length_hours: course.course_length_hours || '',
        number_of_sessions: course.number_of_sessions || '',
        featured: course.featured || false,
        image_base64: null,
      });
      if (course.image_url) {
        setImagePreview(course.image_url);
      }
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image_base64: reader.result,
        }));
        setImagePreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.location_type) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal-overlay" onClick={onClose}>
      <motion.div
        className="form-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="form-modal-header">
          <h2>{course ? 'Edit Course' : 'Create New Course'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {error && (
          <motion.div
            className="form-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Course Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter course name"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location_type">Location Type *</label>
              <select
                id="location_type"
                name="location_type"
                value={formData.location_type}
                onChange={handleInputChange}
                required
                disabled={loading}
              >
                <option value="online">Online</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="featured">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                Feature this course
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="course_length_hours">Course Length (Hours)</label>
              <input
                type="number"
                id="course_length_hours"
                name="course_length_hours"
                value={formData.course_length_hours}
                onChange={handleInputChange}
                placeholder="e.g., 40"
                min="0"
                step="1"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="number_of_sessions">Number of Sessions</label>
              <input
                type="number"
                id="number_of_sessions"
                name="number_of_sessions"
                value={formData.number_of_sessions}
                onChange={handleInputChange}
                placeholder="e.g., 10"
                min="0"
                step="1"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter full course description"
              rows="5"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="short_description">Short Description</label>
            <textarea
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleInputChange}
              placeholder="Brief course summary (auto-filled from description if left empty)"
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Course Image (JPG, PNG, WebP - Max 5MB)</label>
            <div className="image-upload-area">
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image_base64: null }));
                    }}
                    disabled={loading}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Saving...' : (course ? 'Update Course' : 'Create Course')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CourseForm;
