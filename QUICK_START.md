# Quick Start Guide - ZeroOne Courses Website

## Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

## Step 1: Database Setup

1. **Create PostgreSQL Database**
   ```bash
   psql -U postgres
   CREATE DATABASE zero_one_courses;
   \q
   ```

2. **Update Backend Environment**
   - Open `backend/.env`
   - Update credentials if needed (default is postgres/password)

## Step 2: Backend Setup & Run

```bash
cd backend

# Install dependencies
npm install

# Seed sample data (optional but recommended)
npm run seed

# Start the server
npm start
# or for development with auto-reload:
npm run dev
```

Backend runs on: **http://localhost:5000**

## Step 3: Frontend Setup & Run

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Frontend runs on: **http://localhost:3000**

## Step 4: Create Sample Courses (if not seeded)

Using Postman or curl:

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Course",
    "description": "This is a sample course description",
    "short_description": "Sample course",
    "price": 1500,
    "location_type": "online",
    "featured": true
  }'
```

## Website Navigation

Once running, visit `http://localhost:3000` and explore:

- **Home Page** (`/`) - Featured courses showcase
- **Course Details** (`/course/1`) - Full course information  
- **About Us** (`/about`) - Mission, vision, and values
- **Contact** (`/contact`) - Contact form and information

## Features Implemented

✅ Featured courses with cards (image, description, price, type)
✅ Course details page with full information
✅ About us page with mission/vision
✅ Contact page with form and location info
✅ Professional modern design (black/red/white palette)
✅ Smooth animations with Framer Motion
✅ Responsive design (mobile, tablet, desktop)
✅ PostgreSQL database integration
✅ RESTful API endpoints
✅ Contact form submission

## API Endpoints

### Courses
- `GET /api/courses` - All courses
- `GET /api/courses/featured` - Featured only
- `GET /api/courses/:id` - Single course
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Contact
- `POST /api/contact` - Submit message
- `GET /api/contact` - All messages (admin)

## Troubleshooting

**Port 5000 already in use:**
- Edit `backend/.env`: Change `PORT=5000` to `PORT=5001`

**Port 3000 already in use:**
- Run: `PORT=3001 npm start` in frontend folder

**Database connection error:**
- Verify PostgreSQL is running
- Check `.env` credentials
- Ensure database exists: `psql -l`

**CORS errors:**
- Confirm backend is running on port 5000
- Confirm frontend is on port 3000

## Next Steps

Consider adding:
- User authentication
- Payment integration
- Instructor dashboard
- Student progress tracking
- Email notifications
- Course reviews/ratings
- Certificate generation

## Need Help?

Refer to the main `README.md` for detailed documentation.
