import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import SocialMedia from '../components/SocialMedia';
import { courseAPI } from '../api/client';
import '../styles/globals.css';

export const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getFeaturedCourses();
      setCourses(response.data);
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
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>Master Digital & Language Skills</h1>
          <p>
            Empower yourself with cutting-edge IT and language education. Join thousands of learners
            on their journey to success.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary">Explore Courses</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
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
              <p>No featured courses available at the moment.</p>
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

      {/* Why Choose Us Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose ZeroOne Courses?</h2>
          </div>

          <div className="grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mv-card"
            >
              <h3>📚 High-Quality Content</h3>
              <p>Carefully curated courses designed by industry experts to ensure you learn the most relevant and up-to-date skills.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mv-card"
            >
              <h3>🎯 Flexible Learning</h3>
              <p>Learn at your own pace with our online and hybrid course options. Perfect for students and working professionals.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mv-card"
            >
              <h3>👥 Expert Instructors</h3>
              <p>Learn from experienced professionals who bring real-world insights and practical knowledge to every lesson.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mv-card"
            >
              <h3>🏆 Career Ready</h3>
              <p>Gain skills that employers are looking for and advance your career with career-focused training programs.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <SocialMedia />
    </div>
  );
};

export default Home;
