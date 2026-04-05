import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SocialMedia from '../components/SocialMedia';
import '../styles/globals.css';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Main Hero Section */}
      <motion.div
        className="hero hero-vibrant"
        // style={{ minHeight: '750px' }}
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

        <div className="hero-content" >
          <motion.div
            className="hero-emoji-row"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="emoji">🎓</span>
            <span className="emoji">📚</span>
            <span className="emoji">💡</span>
            <span className="emoji">🚀</span>
            <span className="emoji">⭐</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-title"
          >
            Transform Your Child's Academic Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-subtitle"
          >
            Expert-led courses in IT & Languages designed to boost grades, build confidence, and unlock unlimited potential
          </motion.p>

          <motion.div
            className="hero-highlights"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="highlight-item">
              <span className="highlight-icon">📈</span>
              <span>Better Grades</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🎯</span>
              <span>Expert Teachers</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🏅</span>
              <span>Proven Results</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              className="btn btn-primary btn-hero"
              onClick={() => navigate('/courses')}
            >
              🌟 Start Learning Now
            </button>
            <button
              className="btn btn-outline btn-hero"
              onClick={() => navigate('/about')}
            >
              📖 Our Philosophy
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission & Values Section */}
      <section className="section" style={{ backgroundColor: '#f5f5f5' }}>
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

      {/* CTA Section */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Get Started?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              Browse our extensive course catalog and find the perfect course for your learning journey.
            </p>
            <button
              className="btn btn-primary"
              style={{ fontSize: '1.1rem', padding: '15px 40px' }}
              onClick={() => navigate('/courses')}
            >
              View All Courses
            </button>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Impact</h2>
          </div>

          <div className="grid">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mv-card"
              style={{ textAlign: 'center' }}
            >
              <h3 style={{ color: '#CC0000', fontSize: '2.5rem' }}>1000+</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--black)' }}>Happy Learners</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mv-card"
              style={{ textAlign: 'center' }}
            >
              <h3 style={{ color: '#CC0000', fontSize: '2.5rem' }}>50+</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--black)' }}>Expert Courses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mv-card"
              style={{ textAlign: 'center' }}
            >
              <h3 style={{ color: '#CC0000', fontSize: '2.5rem' }}>95%</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--black)' }}>Success Rate</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mv-card"
              style={{ textAlign: 'center' }}
            >
              <h3 style={{ color: '#CC0000', fontSize: '2.5rem' }}>24/7</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--black)' }}>Support Available</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <SocialMedia />
    </div>
  );
};

export default Landing;
