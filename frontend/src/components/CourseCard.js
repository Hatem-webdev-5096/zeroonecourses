import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/globals.css';

export const CourseCard = ({ course }) => {
  const getBadgeIcon = (locationType) => {
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
        return 'Online';
      case 'onsite':
        return 'Onsite';
      case 'hybrid':
        return 'Hybrid';
      default:
        return 'Course';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="course-card"
    >
      <div className="course-image">
        {course.image_url ? (
          <img 
            src={course.image_url} 
            alt={course.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '48px' }}>
            📚
          </div>
        )}
        <div className="course-badge">
          <span className="badge-icon">{getBadgeIcon(course.location_type)}</span>
          <span>{getLocationLabel(course.location_type)}</span>
        </div>
      </div>

      <div className="course-content">
        <h3 className="course-title">{course.name}</h3>
        <p className="course-description">
          {course.short_description || course.description.substring(0, 150)}...
        </p>
        <div className="course-price">EGP {parseFloat(course.price).toFixed(2)}</div>
        <Link to={`/course/${course.id}`} className="btn btn-primary">
          Learn More
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
