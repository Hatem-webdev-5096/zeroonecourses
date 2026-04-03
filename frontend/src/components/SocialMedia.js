import React from 'react';
import { motion } from 'framer-motion';
import '../styles/SocialMedia.css';

const SocialMedia = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: '/facebook.png',
      url: 'https://www.facebook.com/share/1TVTPTYXgq/',
    },
    {
      name: 'Instagram',
      icon: '/instagram.png',
      url: 'https://www.instagram.com/zerone_courses_/',
    },
    {
      name: 'TikTok',
      icon: '/tiktok.png',
      url: 'https://www.tiktok.com/@zerone.courses',
    },
  ];

  return (
    <section className="social-media-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="social-media-content"
        >
          <div className="social-media-header">
            <h2>Follow Us on Social Media</h2>
            <p>Stay connected and get the latest updates from ZeroOne Courses</p>
          </div>

          <div className="social-links-container">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div>
                  <img src={link.icon} alt={link.name} />
                </div>
                <span className="social-name">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMedia;
