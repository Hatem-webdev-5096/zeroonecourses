import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SocialMedia from '../components/SocialMedia';
import { contactAPI } from '../api/client';
import '../styles/globals.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactAPI.submitMessage(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Error submitting contact form:', err);
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
            <span className="emoji">📞</span>
            <span className="emoji">💬</span>
            <span className="emoji">✉️</span>
            <span className="emoji">😊</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-title"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-subtitle"
          >
            We'd love to hear from you. Contact us with any questions or inquiries.
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="contact-info"
            >
              <h2>Contact Information</h2>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h4>Phone Numbers</h4>
                  <p>Primary: ‎+20 10 35671683</p>
                  <p>Secondary: +20 01017978863</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>Samira Mousa St.</p>
                  <p>5th district, El Obour city, Cairo</p>
                  <p>Block 16087, 1st floor, Appartment 3</p>
                  <p>Egypt</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">⏰</div>
                <div className="contact-details">
                  <h4>Working Hours</h4>
                  <p>Saturday - Thursday: 10:00 AM - 6:00 PM</p>
                  <p>Friday: 2:00 PM - 6:00 PM</p>
                  <p>Friday Morning: By appointment only</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>info@zeroone.courses</p>
                  <p>support@zeroone.courses</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-form">
                <h3>Send us a Message</h3>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="form-success"
                  >
                    ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="form-error"
                  >
                    ✗ {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Full Name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+20 100 123-4567"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Inquiry about courses..."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: '100%' }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>We are excited to meet you</h2>
            <p>Find us at our main office</p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              title="ZeroOne Courses Location"
              style={{
                width: '100%',
                height: '400px',
                borderRadius: '8px',
                border: 'none',
              }}
              src="https://www.google.com/maps?q=30.2253,31.4723&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a
              href="https://www.google.com/maps/search/30.2253,31.4723"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              🔗 Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <SocialMedia />
    </div>
  );
};

export default Contact;
