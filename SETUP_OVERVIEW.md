# Project Setup Script - ZeroOne Courses

This document provides a complete overview of the project structure and setup.

## 📁 Project Structure

```
ZeroOne Courses/
│
├── backend/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection & table initialization
│   ├── routes/
│   │   ├── courses.js            # Course API endpoints
│   │   └── contact.js            # Contact form API endpoint
│   ├── public/                   # Static files
│   ├── seed.js                   # Database seeding script
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML entry point
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js         # Axios API client
│   │   ├── components/
│   │   │   ├── Header.js         # Navigation component
│   │   │   ├── CourseCard.js     # Course card component
│   │   │   └── Footer.js         # Footer component
│   │   ├── pages/
│   │   │   ├── Home.js           # Home/Featured courses page
│   │   │   ├── CourseDetails.js  # Course details page
│   │   │   ├── AboutUs.js        # About us page
│   │   │   └── Contact.js        # Contact page
│   │   ├── styles/
│   │   │   └── globals.css       # Global styles & animations
│   │   ├── App.js                # Main React app component
│   │   └── index.js              # React entry point
│   ├── package.json              # Frontend dependencies
│   └── .env                      # Frontend environment variables
│
├── README.md                     # Comprehensive documentation
├── QUICK_START.md               # Quick start guide
├── .gitignore                   # Git ignore rules
└── SETUP_OVERVIEW.md            # This file

```

## 🚀 Quick Setup Commands

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed          # Optional: populate with sample data
npm start            # Start server on port 5000
```

### 2. Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm start            # Start app on port 3000
```

## 📋 Project Features

### Pages & Components
- ✅ **Home Page**: Hero section + featured courses grid
- ✅ **Course Details**: Full course information with enrollment
- ✅ **About Us**: Mission, vision, core values, and trust factors
- ✅ **Contact Us**: Contact form, phone numbers, location, hours
- ✅ **Header**: Navigation with active link highlighting
- ✅ **Footer**: Copyright and company message

### Course Card Features
- Course title and description
- Course price in EGP
- Location type badge (🌐 Online, 🏢 Onsite, 🔄 Hybrid)
- Call-to-action "Learn More" button
- Hover effects with animations

### Design System
- **Color Palette**:
  - Primary Red: #CC0000
  - Dark Black: #1a1a1a
  - Pure White: #ffffff
  - Light Gray: #f5f5f5

- **Animations**:
  - Fade-in on page load
  - Slide-up on scroll (Framer Motion)
  - Card hover lift effect
  - Button state feedback
  - Form validation animations

- **Responsive Breakpoints**:
  - Mobile: ≤ 480px
  - Tablet: ≤ 768px
  - Desktop: > 768px

## 🗄️ Database Schema

### Courses Table
```sql
- id (Primary Key)
- name (VARCHAR 255)
- description (TEXT)
- short_description (VARCHAR 500)
- price (DECIMAL 10,2)
- image_url (VARCHAR 500)
- location_type (online/onsite/hybrid)
- featured (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Contact Messages Table
```sql
- id (Primary Key)
- name (VARCHAR 255)
- email (VARCHAR 255)
- phone (VARCHAR 20)
- subject (VARCHAR 500)
- message (TEXT)
- created_at (TIMESTAMP)
```

## 🔌 API Endpoints

### Course Endpoints
```
GET    /api/courses           # Get all courses
GET    /api/courses/featured  # Get featured courses only
GET    /api/courses/:id       # Get single course
POST   /api/courses           # Create course (admin)
PUT    /api/courses/:id       # Update course (admin)
DELETE /api/courses/:id       # Delete course (admin)
```

### Contact Endpoints
```
POST   /api/contact           # Submit contact form
GET    /api/contact           # Get all messages (admin)
```

## 📱 Frontend Pages

### Home (/)
- Hero section with CTA buttons
- Featured courses grid (using 3-column responsive layout)
- "Why Choose ZeroOne Courses" section with 4 benefit cards

### Course Details (/course/:id)
- Course image placeholder
- Full course information
- Location type and pricing
- Enrollment button
- "What You'll Learn" section

### About Us (/about)
- Hero section
- Mission and Vision cards (side by side)
- Core Values grid (6 cards)
- Why Parents Trust Us section

### Contact (/contact)
- Hero section
- Contact info (phone, address, email, hours)
- Contact form (name, email, phone, subject, message)
- Map placeholder
- Success/Error notifications

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Axios** - HTTP client (prepared for future use)

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **CSS3** - Styling with animations and transitions

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zero_one_courses
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📊 Sample Database Seed

Run `npm run seed` in the backend folder to populate with 8 sample courses:
1. Web Development with React
2. JavaScript Fundamentals
3. Advanced Python Programming
4. Digital Marketing Essentials
5. English Communication Skills
6. UI/UX Design Masterclass
7. Data Analysis with Excel
8. Mobile App Development

## 🎨 Design Highlights

1. **Professional Modern Layout**: Clean, uncluttered design targeting youth and parents
2. **Color Identity**: Uses ZeroOne logo colors (red, black, white)
3. **Interactive Elements**: Smooth animations and transitions
4. **Mobile-First**: Responsive design works on all devices
5. **Accessibility**: Clear typography, good contrast, semantic HTML
6. **Performance**: Optimized CSS, lazy loading ready

## 🚦 Getting Started Checklist

- [ ] Install Node.js and PostgreSQL
- [ ] Create PostgreSQL database
- [ ] Update backend/.env with DB credentials
- [ ] Run `npm install` in backend
- [ ] Run `npm run seed` in backend (optional)
- [ ] Start backend: `npm start`
- [ ] Run `npm install` in frontend
- [ ] Start frontend: `npm start`
- [ ] Visit http://localhost:3000
- [ ] Test features: courses, details, about, contact

## 📞 Contact & Support

- **Primary Email**: info@zeroone.courses
- **Support Email**: support@zeroone.courses
- **Address**: 123 Tech Street, New Cairo, Cairo 11835, Egypt

---

Created for ZeroOne Courses ⚡
