# ZeroOne Courses Website

A full-stack educational platform for ZeroOne Courses built with Node.js, Express, PostgreSQL, and React.

## Project Structure

```
ZeroOne Courses/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   ├── courses.js
│   │   └── contact.js
│   ├── public/
│   ├── package.json
│   ├── server.js
│   └── .env
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── client.js
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── CourseCard.js
    │   │   └── Footer.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── CourseDetails.js
    │   │   ├── AboutUs.js
    │   │   └── Contact.js
    │   ├── styles/
    │   │   └── globals.css
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env
```

## Features

- **Featured Courses Page**: Showcase courses with cards displaying image, description, price, and location type (online/onsite/hybrid)
- **Course Details Page**: Full course information with enrollment option
- **About Us Page**: Company mission, vision, and core values
- **Contact Us Page**: Contact form, phone numbers, location, and working hours
- **Professional Design**: Modern, clean interface with red and black color palette
- **Smooth Animations**: Using Framer Motion for engaging UI interactions
- **Responsive Design**: Mobile-friendly layout
- **Database Integration**: PostgreSQL for reliable data management

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database (optional - the app will create tables automatically):
```sql
CREATE DATABASE zero_one_courses;
```

4. Update the `.env` file with your database credentials:
```
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zero_one_courses
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
```
For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is pre-configured to connect to `http://localhost:5000/api`

4. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Database Seeding

To populate the database with sample courses, use the backend API:

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Web Development with React",
    "description": "Learn modern web development with React, including components, hooks, routing, and state management.",
    "short_description": "Master React and build responsive web applications",
    "price": 1500,
    "location_type": "online",
    "featured": true
  }'
```

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create a course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)

## Pages

### Home (`/`)
- Hero section with call-to-action buttons
- Featured courses grid
- Why choose us section

### Course Details (`/course/:id`)
- Full course information
- Course metadata (location type, price)
- Enrollment button
- Related course information

### About Us (`/about`)
- Company mission and vision
- Core values
- Why parents trust us section

### Contact (`/contact`)
- Contact information (phone, address, email)
- Contact form
- Working hours
- Map section placeholder

## Design Features

- **Color Palette**: 
  - Primary: #CC0000 (Red)
  - Secondary: #1a1a1a (Black)
  - Accent: #ffffff (White)

- **Animations**: 
  - Smooth transitions on page load
  - Hover effects on cards
  - Form validation feedback
  - Success/Error messages

- **Responsive Design**: 
  - Mobile: 480px and below
  - Tablet: 768px and below
  - Desktop: 1024px and above

## Environment Variables

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

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists or allow auto-creation

### CORS Error
- Backend already has CORS enabled
- Ensure frontend is on `http://localhost:3000`
- Check backend port is `5000`

### Port Already in Use
- Change PORT in backend `.env`
- Change frontend port: `PORT=3001 npm start`

## Future Enhancements

- User authentication and registration
- Student dashboard with enrolled courses
- Course progress tracking
- Payment integration
- Email notifications
- Instructor dashboard
- Reviews and ratings
- Course certificates

## License

This project is created for ZeroOne Courses. All rights reserved.

## Support

For questions or issues, contact: info@zeroone.courses
