# ⚡ ZeroOne Courses - Quick Reference Guide

## 🚀 QUICK START (3 minutes)

### Prerequisites
```
✓ Node.js installed (node --version)
✓ PostgreSQL installed (psql --version)
✓ Database "zero_one_courses" created
```

### Terminal 1: Backend
```bash
cd backend
npm install
npm run seed
npm start
```
**Expected:** "Server running on port 5000"

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm start
```
**Expected:** Browser opens to http://localhost:3000

---

## 📋 ENVIRONMENT SETUP

### Backend (.env)
```
PORT=5000
DB_USER=postgres
DB_PASSWORD=<your-password>
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zero_one_courses
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌐 URLS & PORTS

| Service | URL/Port | Status |
|---------|----------|--------|
| Frontend | http://localhost:3000 | ✅ |
| Backend | http://localhost:5000 | ✅ |
| PostgreSQL | localhost:5432 | ✅ |

---

## 📄 PAGES & ROUTES

| Page | Route | Status |
|------|-------|--------|
| Home/Courses | / | ✅ |
| Course Details | /course/:id | ✅ |
| About Us | /about | ✅ |
| Contact | /contact | ✅ |

---

## 🔌 API ENDPOINTS

| Method | Endpoint | Status |
|--------|----------|--------|
| GET | /api/courses | ✅ |
| GET | /api/courses/featured | ✅ |
| GET | /api/courses/:id | ✅ |
| POST | /api/courses | ✅ |
| PUT | /api/courses/:id | ✅ |
| DELETE | /api/courses/:id | ✅ |
| POST | /api/contact | ✅ |
| GET | /api/contact | ✅ |

---

## 🎨 DESIGN COLORS

| Color | Hex | Usage |
|-------|-----|-------|
| Red | #CC0000 | Primary, buttons |
| Black | #1a1a1a | Text, backgrounds |
| White | #ffffff | Backgrounds, text |
| Light Gray | #f5f5f5 | Section backgrounds |

---

## 📁 KEY FILES

### Backend
- `server.js` - Main server
- `config/database.js` - DB connection
- `routes/courses.js` - Course API
- `routes/contact.js` - Contact API
- `seed.js` - Sample data

### Frontend  
- `App.js` - Main component
- `pages/Home.js` - Home page
- `pages/CourseDetails.js` - Course details
- `pages/AboutUs.js` - About page
- `pages/Contact.js` - Contact page
- `components/Header.js` - Navigation
- `components/CourseCard.js` - Card component
- `components/Footer.js` - Footer
- `styles/globals.css` - All styles

---

## 🧪 TESTING

### Test API
```bash
curl http://localhost:5000/api/health
```

### View Courses in DB
```bash
psql -U postgres -d zero_one_courses
SELECT * FROM courses;
\q
```

### Add Course via API
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test","price":1000,"location_type":"online","featured":true}'
```

---

## 🐛 TROUBLESHOOTING

### Backend Won't Start
- Check PostgreSQL is running
- Verify .env credentials
- Try: `npm install` again

### Frontend Won't Load
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check backend is running

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: `PORT=3001 npm start`

### No Courses Showing
- Run: `npm run seed` (in backend)
- Check database: `SELECT * FROM courses;`

### Course Details Page 404
- Try course ID 1: `/course/1`
- Check database has courses

---

## 📦 DEPENDENCIES SUMMARY

### Backend
- express
- pg (PostgreSQL)
- cors
- body-parser
- dotenv
- nodemon (dev)

### Frontend
- react
- react-router-dom
- axios
- framer-motion
- react-scripts

---

## 🗄️ DATABASE SCHEMA

### Courses
- id, name, description, short_description
- price, image_url, location_type, featured
- created_at, updated_at

### Contact Messages
- id, name, email, phone, subject
- message, created_at

---

## 📱 RESPONSIVE BREAKPOINTS

- Mobile: ≤ 480px
- Tablet: ≤ 768px
- Desktop: > 768px

---

## 💾 SAMPLE COURSES (Pre-loaded)

1. Web Development with React - $1,500 (Hybrid) ⭐
2. JavaScript Fundamentals - $1,000 (Online) ⭐
3. Advanced Python - $1,800 (Onsite) ⭐
4. Digital Marketing - $1,200 (Hybrid) ⭐
5. English Communication - $900 (Online)
6. UI/UX Design - $1,400 (Online) ⭐
7. Data Analysis - $800 (Onsite)
8. Mobile App Dev - $2,000 (Hybrid) ⭐

⭐ = Featured course

---

## 🎯 FEATURES

### Home Page
- Hero section
- Featured courses grid
- Why choose us (4 cards)

### Course Details
- Full info & description
- Price display
- Location type
- Enrollment button
- What you'll learn section

### About Us
- Mission & Vision
- 6 core values
- Why parents trust us (4 cards)

### Contact
- Contact form
- Phone numbers (3)
- Email addresses
- Business hours
- Address

---

## ⚙️ NPM SCRIPTS

### Backend
```bash
npm start      # Run server
npm run dev    # Run with nodemon
npm run seed   # Seed database
```

### Frontend
```bash
npm start      # Start dev server
npm build      # Build for production
npm test       # Run tests
```

---

## 🔑 IMPORTANT COMMANDS

### Database
```bash
psql -U postgres
CREATE DATABASE zero_one_courses;
\q
```

### Backend
```bash
cd backend
npm install
npm run seed
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📊 PROJECT STATS

| Metric | Value |
|--------|-------|
| Total Files | 32 |
| Backend Files | 8 |
| Frontend Files | 13 |
| Docs | 11 |
| API Endpoints | 8 |
| Pages | 4 |
| Components | 7 |
| CSS Lines | 400+ |
| Code Lines | 5000+ |

---

## ✅ LAUNCH CHECKLIST

- [ ] Prerequisites installed
- [ ] Database created
- [ ] Backend npm install done
- [ ] Frontend npm install done
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3000)
- [ ] Browser shows home page
- [ ] Courses visible
- [ ] Navigation works
- [ ] Contact form works
- [ ] Database seeded
- [ ] All 4 pages load

---

## 🎨 ANIMATIONS

- Page fade-in (0.6s)
- Card slide-up (0.6s)
- Hover lift (-10px)
- Button hover (-2px + shadow)
- Form notifications (instant)

---

## 🛡️ SECURITY

- ✅ CORS configured
- ✅ SQL injection prevention
- ✅ Input validation
- ✅ Environment secrets
- ✅ Error hiding

---

## 📞 SUPPORT

- Email: info@zeroone.courses
- Support: support@zeroone.courses
- Docs: README.md
- Troubleshooting: INSTALLATION_GUIDE.md

---

## 🚀 NEXT STEPS

1. **Setup** → Follow Quick Start
2. **Test** → Click through all pages
3. **Populate** → Add real courses
4. **Deploy** → Choose hosting
5. **Promote** → Share with audience

---

## 📖 DOCUMENTATION FILES

| File | Purpose |
|------|---------|
| README.md | Main guide |
| QUICK_START.md | Fast setup |
| INSTALLATION_GUIDE.md | Detailed setup |
| ARCHITECTURE.md | System design |
| PROJECT_SUMMARY.md | Overview |
| FILE_STRUCTURE.md | File list |

---

**Version:** 1.0.0  
**Status:** Production Ready ✅  
**Created:** March 29, 2024  

---

**Print this page as reference while setting up! 📋**
