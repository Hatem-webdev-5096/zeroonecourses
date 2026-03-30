import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import CourseForm from '../components/CourseForm';
import GalleryForm from '../components/GalleryForm';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('admin');

    if (!token) {
      navigate('/adminlogin');
      return;
    }

    setAdmin(JSON.parse(adminData));
    fetchCourses();
    fetchGalleryItems();
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/courses`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setCourses(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/gallery`
      );
      setGalleryItems(response.data);
    } catch (err) {
      console.error('Failed to fetch gallery items:', err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/courses/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCourses(courses.filter(course => course.id !== courseId));
      setError('');
    } catch (err) {
      setError('Failed to delete course');
      console.error('Delete error:', err);
    }
  };

  const handleDeleteGallery = async (galleryId) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/gallery/${galleryId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setGalleryItems(galleryItems.filter(item => item.id !== galleryId));
      setError('');
    } catch (err) {
      setError('Failed to delete gallery item');
      console.error('Delete error:', err);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleEditGallery = (item) => {
    setEditingGallery(item);
    setShowGalleryForm(true);
  };

  const handleCourseFormClose = () => {
    setShowCourseForm(false);
    setEditingCourse(null);
  };

  const handleGalleryFormClose = () => {
    setShowGalleryForm(false);
    setEditingGallery(null);
  };

  const handleCourseFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('adminToken');

      if (editingCourse) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/courses/${editingCourse.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setCourses(
          courses.map(course =>
            course.id === editingCourse.id ? response.data : course
          )
        );
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/courses`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setCourses([response.data, ...courses]);
      }

      handleCourseFormClose();
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save course');
      console.error('Save error:', err);
    }
  };

  const handleGalleryFormSubmit = (newItem) => {
    if (editingGallery) {
      setGalleryItems(
        galleryItems.map(item =>
          item.id === editingGallery.id ? newItem : item
        )
      );
    } else {
      setGalleryItems([newItem, ...galleryItems]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/');
  };

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage your courses and gallery</p>
        </div>
        <div className="header-actions">
          <span className="admin-name">Welcome, {admin?.username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          📚 Courses
        </button>
        <button
          className={`tab-button ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          🎨 Gallery
        </button>
      </div>

      {error && (
        <motion.div
          className="error-alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      <div className="dashboard-content">
        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <>
            <div className="content-header">
              <h2>Courses Management</h2>
              <button
                className="create-course-button"
                onClick={() => setShowCourseForm(true)}
              >
                + Create New Course
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="no-courses">
                <p>No courses available. Create your first course!</p>
              </div>
            ) : (
              <div className="courses-table-wrapper">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Price</th>
                      <th>Location Type</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <motion.tr
                        key={course.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="course-name">
                          <div className="course-info">
                            {course.image_url && (
                              <img
                                src={course.image_url}
                                alt={course.name}
                                className="course-thumbnail"
                              />
                            )}
                            <span>{course.name}</span>
                          </div>
                        </td>
                        <td>${course.price}</td>
                        <td>
                          <span className="badge">{course.location_type}</span>
                        </td>
                        <td>
                          <span
                            className={`featured-badge ${
                              course.featured ? 'featured' : 'not-featured'
                            }`}
                          >
                            {course.featured ? '✓ Yes' : 'No'}
                          </span>
                        </td>
                        <td className="actions">
                          <button
                            className="edit-button"
                            onClick={() => handleEditCourse(course)}
                            title="Edit course"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteCourse(course.id)}
                            title="Delete course"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <>
            <div className="content-header">
              <h2>Gallery Management</h2>
              <button
                className="create-course-button"
                onClick={() => setShowGalleryForm(true)}
              >
                + Add to Gallery
              </button>
            </div>

            {galleryItems.length === 0 ? (
              <div className="no-courses">
                <p>No gallery items yet. Add your first photo or video!</p>
              </div>
            ) : (
              <div className="gallery-management-grid">
                {galleryItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="gallery-management-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="gallery-card-img-wrapper">
                      {item.media_type === 'video' ? (
                        <div className="video-thumbnail-admin">
                          <img 
                            src={item.thumbnail_url || item.media_url} 
                            alt={item.title}
                          />
                          <div className="play-button-admin">▶</div>
                        </div>
                      ) : (
                        <img 
                          src={item.thumbnail_url || item.media_url} 
                          alt={item.title}
                        />
                      )}
                      <span className="media-type-badge">
                        {item.media_type === 'video' ? '🎬' : '📷'}
                      </span>
                    </div>
                    <div className="gallery-card-info">
                      <h3>{item.title}</h3>
                      {item.description && <p>{item.description}</p>}
                      <div className="gallery-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEditGallery(item)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteGallery(item.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showCourseForm && (
        <CourseForm
          course={editingCourse}
          onSubmit={handleCourseFormSubmit}
          onClose={handleCourseFormClose}
        />
      )}

      {showGalleryForm && (
        <GalleryForm
          editingItem={editingGallery}
          onClose={handleGalleryFormClose}
          onGalleryAdded={handleGalleryFormSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
