import React from 'react';
import { motion } from 'framer-motion';
import '../styles/globals.css';

export const AboutUs = () => {
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
            <span className="emoji">🎓</span>
            <span className="emoji">💼</span>
            <span className="emoji">🌍</span>
            <span className="emoji">✨</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-title"
          >
            About ZeroOne Courses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-subtitle"
          >
            Dedicated to empowering learners with cutting-edge education and skills for the digital era
          </motion.p>
        </div>
      </motion.div>

      {/* Mission & Vision Section */}
      <section className="about-section">
        <div className="container">
          <div className="mission-vision">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mv-card"
            >
              <h3>👁️‍🗨️ Vision</h3>
              <p>
                To be a leading educational hub in Egypt and the Arab world for digital and language skills—developing a generation that is creative, confident, and ready to shape the future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mv-card"
            >
              <h3>🚀 Mission</h3>
              <p>
                Empowering learners of all ages to master IT and language skills through high-quality education, interactive learning experiences, and up-to-date curricula aligned with the digital era—supported by continuous guidance to help them achieve their academic and career goals.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Our Core Values</h2>
            <div className="grid">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mv-card"
              >
                <h4>📚 Quality Education</h4>
                <p>We are committed to providing high-quality, relevant, and practical education that prepares learners for real-world challenges.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mv-card"
              >
                <h4>💡 Innovation</h4>
                <p>We continuously update our curricula and teaching methods to keep pace with technology trends and industry demands.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mv-card"
              >
                <h4>🤝 Inclusivity</h4>
                <p>We believe in making education accessible to learners of all ages and backgrounds, supporting their growth at every stage.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mv-card"
              >
                <h4>🎯 Student Success</h4>
                <p>Our ultimate goal is to see our learners succeed academically and professionally, achieving their career aspirations.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mv-card"
              >
                <h4>🌍 Excellence</h4>
                <p>We maintain the highest standards in our teaching, content, and student support services.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mv-card"
              >
                <h4>🚀 Empowerment</h4>
                <p>We empower our learners to take charge of their learning journey and believe in their potential to achieve greatness.</p>
              </motion.div>
            </div>
          </div>

          {/* Why Parents Trust Us */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: '4rem', textAlign: 'center' }}
          >
            <h2 style={{ marginBottom: '2rem' }}>Why Parents Trust ZeroOne Courses</h2>
            <div className="grid">
              <div className="mv-card">
                <h4>✓ Proven Track Record</h4>
                <p>Hundreds of successful learners who have advanced their careers and achieved their goals.</p>
              </div>
              <div className="mv-card">
                <h4>✓ Safe Learning Environment</h4>
                <p>Secure, supervised, and supportive learning spaces both online and at our center.</p>
              </div>
              <div className="mv-card">
                <h4>✓ Experienced Instructors</h4>
                <p>Professional educators with years of experience in their respective fields.</p>
              </div>
              <div className="mv-card">
                <h4>✓ Progress Tracking</h4>
                <p>Regular updates and progress reports to keep parents informed of their child's learning journey.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
