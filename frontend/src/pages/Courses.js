import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import { courseAPI } from '../api/client';
import '../styles/globals.css';

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedCourses();
    
    // Refetch courses when page comes back into focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchFeaturedCourses();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getFeaturedCourses();
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        className="hero hero-vibrant"
        style={{ minHeight: '450px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <div className="hero-bg-elements">
          <motion.div className="hero-shape hero-shape-1" animate={{ y: [0, 30, 0] }} transition={{ duration: 4, repeat: Infinity }} />
          <motion.div className="hero-shape hero-shape-2" animate={{ y: [0, -30, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} />
          <motion.div className="hero-shape hero-shape-3" animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} />
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-emoji-row"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="emoji">📚</span>
            <span className="emoji">🎯</span>
            <span className="emoji">💡</span>
            <span className="emoji">🏆</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-title"
          >
            Explore Our Courses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-subtitle"
          >
            Choose from our handpicked selection of expertly-led courses designed to boost your skills and accelerate your success
          </motion.p>
        </div>
      </motion.div>

      {/* Featured Courses Section */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Courses</h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Loading courses...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
              <p>{error}</p>
            </div>
          ) : courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No courses are currently available.</p>
            </div>
          ) : (
            <div className="grid">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Courses;
