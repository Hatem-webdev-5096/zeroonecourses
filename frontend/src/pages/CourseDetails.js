import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courseAPI } from '../api/client';
import '../styles/globals.css';

export const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
    
    // Refetch course details when page comes back into focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchCourseDetails();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getCourseById(id);
      setCourse(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load course details. Please try again later.');
      console.error('Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    setEnrolled(true);
    setTimeout(() => setEnrolled(false), 3000);
  };

  const getLocationIcon = (locationType) => {
    switch (locationType) {
      case 'online':
        return '🌐';
      case 'onsite':
        return '🏢';
      case 'hybrid':
        return '🔄';
      default:
        return '📚';
    }
  };

  const getLocationLabel = (locationType) => {
    switch (locationType) {
      case 'online':
        return 'Online Course';
      case 'onsite':
        return 'Onsite Course';
      case 'hybrid':
        return 'Hybrid Course';
      default:
        return 'Course';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error || 'Course not found'}</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/')}
          style={{ marginTop: '1rem' }}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="course-details"
    >
      <div className="container">
        {enrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="form-success"
            style={{ marginBottom: '2rem' }}
          >
            ✓ Thank you for your interest! We'll contact you soon with enrollment details.
          </motion.div>
        )}

        <button
          className="btn btn-secondary"
          onClick={() => navigate('/')}
          style={{ marginBottom: '2rem' }}
        >
          ← Back to Courses
        </button>

        <div className="details-container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="details-image"
          >
            {course.image_url ? (
              <img 
                src={course.image_url} 
                alt={course.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <div style={{ backgroundColor: '#ddd', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', borderRadius: '8px' }}>
                📚
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="details-info"
          >
            <h1>{course.name}</h1>

            <div className="details-meta">
              <div className="meta-item">
                <span className="meta-icon">{getLocationIcon(course.location_type)}</span>
                <span>{getLocationLabel(course.location_type)}</span>
                {(course.location_type === 'hybrid' || course.location_type === 'onsite') && (
                <a
                  href="https://www.google.com/maps/search/30.2253,31.4723"
                  target="_blank"
                  rel="noopener noreferrer"
                //   className="btn btn-secondary"
                >
                  📍 View on Maps
                </a>
              )}
              </div>
              {course.course_length_hours && (
                <div className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  <span>{course.course_length_hours} Hours</span>
                </div>
              )}
              {course.number_of_sessions && (
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>{course.number_of_sessions} Sessions</span>
                </div>
              )}
            </div>

            <div className="course-price">EGP {parseFloat(course.price).toFixed(2)}</div>

            <div className="details-description">
              <h3>Course Description</h3>
              <p>{course.description}</p>
            </div>

            <div className="cta-section">
              {/* <button className="btn btn-primary btn-lg" onClick={handleEnroll}>
                Enroll Now
              </button> */}
              <button className="btn btn-outline" onClick={() => navigate('/contact')}>Contact Us</button>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '4rem' }}
        >
          <div className="section-title">
            <h2>What You'll Learn</h2>
          </div>
          <div className="grid">
            <div className="mv-card">
              <h4>🎯 Practical Skills</h4>
              <p>Hands-on training with real-world projects and case studies.</p>
            </div>
            <div className="mv-card">
              <h4>📖 Comprehensive Content</h4>
              <p>Complete curriculum covering beginner to advanced topics.</p>
            </div>
            <div className="mv-card">
              <h4>🤝 Student Support</h4>
              <p>Access to instructors and fellow learners throughout the course.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseDetails;
