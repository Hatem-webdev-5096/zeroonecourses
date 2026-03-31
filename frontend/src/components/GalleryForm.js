import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GalleryForm.css';

const GalleryForm = ({ onClose, onGalleryAdded, editingItem = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media_type: 'image',
  });

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        description: editingItem.description || '',
        media_type: editingItem.media_type,
      });
    }
  }, [editingItem]);

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const maxSize = formData.media_type === 'image' ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    const maxMB = formData.media_type === 'image' ? 10 : 100;

    if (selectedFile.size > maxSize) {
      setError(`File size exceeds ${maxMB}MB limit`);
      return;
    }

    setFile(selectedFile);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_IMAGE_SIZE) {
      setError('Thumbnail size exceeds 10MB limit');
      return;
    }

    setThumbnail(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.title.trim()) {
        setError('Title is required');
        setLoading(false);
        return;
      }

      if (!editingItem && !file) {
        setError('Please select a file to upload');
        setLoading(false);
        return;
      }

      let media_base64 = null;
      let thumbnail_base64 = null;

      if (file) {
        const reader = new FileReader();
        media_base64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }

      if (thumbnail) {
        const thumbReader = new FileReader();
        thumbnail_base64 = await new Promise((resolve) => {
          thumbReader.onload = () => resolve(thumbReader.result);
          thumbReader.readAsDataURL(thumbnail);
        });
      }

      const token = localStorage.getItem('adminToken');
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const url = editingItem
        ? `${baseUrl}/gallery/${editingItem.id}`
        : `${baseUrl}/gallery`;

      const payload = {
        title: formData.title,
        description: formData.description,
        media_type: formData.media_type,
        ...(media_base64 && { media_base64 }),
        ...(thumbnail_base64 && { thumbnail_base64 }),
      };

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };

      const response = editingItem
        ? await axios.put(url, payload, config)
        : await axios.post(url, payload, config);

      onGalleryAdded(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload gallery item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="gallery-form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h2>{editingItem ? 'Edit Gallery Item' : 'Add to Gallery'}</h2>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your gallery item a title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a description (optional)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="media_type">Media Type *</label>
            <select
              id="media_type"
              name="media_type"
              value={formData.media_type}
              onChange={handleChange}
              disabled={editingItem ? true : false}
            >
              <option value="image">📷 Image (max 10MB)</option>
              <option value="video">🎬 Video (max 100MB)</option>
            </select>
          </div>

          {!editingItem && (
            <div className="form-group">
              <label htmlFor="file">Upload {formData.media_type === 'image' ? 'Photo' : 'Video'} *</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept={formData.media_type === 'image' ? 'image/*' : 'video/*'}
                required
              />
            </div>
          )}

          {editingItem && (
            <div className="form-group">
              <label htmlFor="file">Replace {formData.media_type === 'image' ? 'Photo' : 'Video'} (optional)</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept={formData.media_type === 'image' ? 'image/*' : 'video/*'}
              />
            </div>
          )}

          {formData.media_type === 'video' && (
            <div className="form-group">
              <label htmlFor="thumbnail">Custom Thumbnail (optional)</label>
              <input
                type="file"
                id="thumbnail"
                onChange={handleThumbnailChange}
                accept="image/*"
              />
              <small>Upload a custom thumbnail for your video</small>
            </div>
          )}

          {preview && (
            <div className="form-preview">
              <p>Preview:</p>
              {formData.media_type === 'image' ? (
                <img src={preview} alt="Preview" />
              ) : (
                <video src={preview} controls width="100%" />
              )}
            </div>
          )}

          <div className="form-buttons">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Uploading...' : editingItem ? 'Update Gallery Item' : 'Add to Gallery'}
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryForm;
