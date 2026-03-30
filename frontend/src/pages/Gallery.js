import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/globals.css';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchGalleryItems();
    // Set up auto-refresh on page visibility
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchGalleryItems();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gallery');
      setGalleryItems(response.data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.media_type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-vibrant hero-section">
        <div className="hero-bg-elements">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="hero-emojis">
            {['📸', '🎥', '🎉', '✨', '🌟'].map((emoji, idx) => (
              <motion.span
                key={idx}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.2
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
          <h1 className="hero-title">📚 Our Gallery</h1>
          <p className="hero-subtitle">
            Explore our events, activities, and special moments that showcase our vibrant learning community
          </p>
        </motion.div>
      </div>

      {/* Gallery Section */}
      <section className="section">
        <div className="container">
          {/* Filter Buttons */}
          <div className="gallery-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All 📌
            </button>
            <button
              className={`filter-btn ${filter === 'image' ? 'active' : ''}`}
              onClick={() => setFilter('image')}
            >
              Photos 🖼️
            </button>
            <button
              className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
              onClick={() => setFilter('video')}
            >
              Videos 🎬
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Loading gallery...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>No gallery items yet. Check back soon! 🎨</p>
            </div>
          ) : (
            <motion.div
              className="gallery-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  className="gallery-card"
                  variants={itemVariants}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="gallery-card-image">
                    {item.media_type === 'video' ? (
                      <div className="video-thumbnail">
                        <img 
                          src={item.thumbnail_url || item.media_url} 
                          alt={item.title}
                          onError={(e) => { e.target.src = '🎥'; }}
                        />
                        <div className="play-button">▶</div>
                      </div>
                    ) : (
                      <img 
                        src={item.thumbnail_url || item.media_url} 
                        alt={item.title}
                        onError={(e) => { e.target.src = '🖼️'; }}
                      />
                    )}
                  </div>
                  <div className="gallery-card-content">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                    <span className="media-badge">
                      {item.media_type === 'video' ? '🎬 Video' : '📷 Photo'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal for viewing full media */}
      {selectedItem && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            className="modal-content gallery-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>
            
            {selectedItem.media_type === 'video' ? (
              <div className="gallery-video-container">
                <video
                  controls
                  src={selectedItem.media_url}
                >
                  Your browser doesn't support video playback
                </video>
              </div>
            ) : (
              <div className="gallery-image-container">
                <img 
                  src={selectedItem.media_url} 
                  alt={selectedItem.title}
                />
              </div>
            )}
            
            <div className="gallery-modal-info">
              <h2>{selectedItem.title}</h2>
              {selectedItem.description && <p>{selectedItem.description}</p>}
              <span className="media-badge">
                {selectedItem.media_type === 'video' ? '🎬 Video' : '📷 Photo'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
