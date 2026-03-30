# 🏗️ ZeroOne Courses - Application Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER (Port 3000)                   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React Frontend Application                  │   │
│  │                                                           │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌──────────┐  │   │
│  │  │ Header Comp.   │  │ CourseCard Comp│  │ Footer   │  │   │
│  │  │ (Navigation)   │  │ (Reusable)     │  │ Comp.    │  │   │
│  │  └────────────────┘  └────────────────┘  └──────────┘  │   │
│  │                                                           │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │        React Router (Client-side Routing)       │   │   │
│  │  │  Routes: /, /course/:id, /about, /contact       │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                           │   │
│  │  ┌──────────────┐  ┌──────────┐  ┌─────────────────┐   │   │
│  │  │ Home Page    │  │ About    │  │ Contact Form    │   │   │
│  │  │ - Hero       │  │ Us Page  │  │ - Name, Email   │   │   │
│  │  │ - Courses    │  │ - Mission│  │ - Message       │   │   │
│  │  └──────────────┘  └──────────┘  └─────────────────┘   │   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │        Axios HTTP Client (api/client.js)       │   │   │
│  │  │  Communicates with: http://localhost:5000/api  │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │         Framer Motion Animations Library        │   │   │
│  │  │    (Fade-in, Slide-up, Hover effects)          │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │      Global CSS (colors, animations, layout)   │   │   │
│  │  │   Color Palette: Red (#CC0000), Black, White    │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP (Axios)
                   CORS Enabled (Port 3000 ↔ 5000)
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                   API SERVER (Port 5000)                         │
│                    Node.js + Express.js                          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │        Express Server with CORS & Body Parser            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌───────────────────┐              ┌───────────────────┐      │
│  │ COURSES ROUTES    │              │ CONTACT ROUTES    │      │
│  │                   │              │                   │      │
│  │ GET /courses      │              │ POST /contact     │      │
│  │ GET /courses/:id  │              │ GET /contact      │      │
│  │ GET /featured     │              │                   │      │
│  │ POST /courses     │              │                   │      │
│  │ PUT /courses/:id  │              │                   │      │
│  │ DELETE /courses   │              │                   │      │
│  └───────────────────┘              └───────────────────┘      │
│          ↓                                    ↓                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │    Database Connection Layer (config/database.js)       │  │
│  │         Manages PostgreSQL Connection Pool              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                             │
│                      (Port 5432)                                 │
│                                                                   │
│  ┌──────────────────────┐      ┌──────────────────────────┐    │
│  │   COURSES TABLE      │      │ CONTACT_MESSAGES TABLE   │    │
│  │                      │      │                          │    │
│  │ id (PK)              │      │ id (PK)                  │    │
│  │ name                 │      │ name                     │    │
│  │ description          │      │ email                    │    │
│  │ short_description    │      │ phone                    │    │
│  │ price                │      │ subject                  │    │
│  │ image_url            │      │ message                  │    │
│  │ location_type        │      │ created_at               │    │
│  │ featured             │      │                          │    │
│  │ created_at           │      │                          │    │
│  │ updated_at           │      │                          │    │
│  │                      │      │                          │    │
│  │ 8 Sample Courses     │      │ Stores All Inquiries     │    │
│  └──────────────────────┘      └──────────────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Example: User Views Featured Courses

```
1. User opens http://localhost:3000 (Home Page)
   ↓
2. React Home Component mounts (pages/Home.js)
   ↓
3. useEffect hook triggers fetchFeaturedCourses()
   ↓
4. Axios client calls: courseAPI.getFeaturedCourses()
   ↓
5. HTTP GET request sent to: http://localhost:5000/api/courses/featured
   ↓
6. Express server receives request → routes/courses.js (featured route)
   ↓
7. Database query executes: SELECT * FROM courses WHERE featured = true
   ↓
8. PostgreSQL returns course data
   ↓
9. Server responds with JSON array of courses
   ↓
10. React sets state with course data
   ↓
11. Component renders CourseCard for each course
   ↓
12. Cards display with Framer Motion animations
```

---

### Example: User Submits Contact Form

```
1. User fills out Contact Form (pages/Contact.js)
   ↓
2. User clicks "Send Message" button
   ↓
3. handleSubmit prevents default and calls contactAPI.submitMessage(formData)
   ↓
4. Axios client creates POST request with form data
   ↓
5. HTTP POST sent to: http://localhost:5000/api/contact
   ↓
6. Express server receives request → routes/contact.js (POST handler)
   ↓
7. Server validates required fields (name, email, message)
   ↓
8. Database insert: INSERT INTO contact_messages (...)
   ↓
9. PostgreSQL stores message and returns inserted record
   ↓
10. Server responds with success message and timestamp
   ↓
11. React catches success state
   ↓
12. Success message displayed to user
   ↓
13. Form clears automatically
```

---

## Component Hierarchy

```
App.js (Root)
│
├── Header.js (Navigation)
│   ├── Logo with Icon
│   ├── Nav Links (active link highlighting)
│   └── Mobile menu support
│
├── Main Routes
│   ├── Home.js
│   │   ├── Hero Section
│   │   ├── Featured Courses Grid
│   │   │   └── CourseCard.js (×multiple)
│   │   │       ├── Course Image
│   │   │       ├── Location Badge
│   │   │       ├── Title & Description
│   │   │       ├── Price
│   │   │       └── Learn More Link
│   │   │
│   │   └── Why Choose Section
│   │       └── Benefit Cards (×4)
│   │
│   ├── CourseDetails.js
│   │   ├── Course Image
│   │   ├── Course Info
│   │   ├── Location Indicator
│   │   ├── Price
│   │   ├── Description
│   │   ├── Enrollment Button
│   │   └── Learning Outcomes Section
│   │
│   ├── AboutUs.js
│   │   ├── Hero Section
│   │   ├── Mission Card
│   │   ├── Vision Card
│   │   ├── Core Values Grid (×6)
│   │   └── Trust Factors Section (×4)
│   │
│   └── Contact.js
│       ├── Hero Section
│       ├── Contact Info Section
│       │   ├── Phone Numbers
│       │   ├── Address
│       │   ├── Email
│       │   └── Hours
│       │
│       ├── Contact Form
│       │   ├── Input: Name
│       │   ├── Input: Email
│       │   ├── Input: Phone
│       │   ├── Input: Subject
│       │   ├── Textarea: Message
│       │   └── Submit Button
│       │
│       └── Map Section
│
└── Footer.js
    ├── Copyright
    └── Mission Statement
```

---

## Request/Response Examples

### GET /api/courses/featured

**Request:**
```
GET http://localhost:5000/api/courses/featured
Headers: (automatic from Axios)
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Web Development with React",
    "description": "Learn modern web development...",
    "short_description": "Master React and build responsive web applications",
    "price": "1500.00",
    "image_url": null,
    "location_type": "hybrid",
    "featured": true,
    "created_at": "2024-03-29T10:30:00Z",
    "updated_at": "2024-03-29T10:30:00Z"
  },
  {...},
  {...}
]
```

---

### POST /api/contact

**Request:**
```json
{
  "name": "Ahmed Hassan",
  "email": "ahmed@example.com",
  "phone": "+20100123456",
  "subject": "Inquiry about React Course",
  "message": "I'm interested in the React course..."
}
```

**Response:**
```json
{
  "message": "Message received successfully",
  "id": 1,
  "created_at": "2024-03-29T14:45:30Z"
}
```

---

## State Management Flow

### Home Page Loading State

```
Initial:  loading = true, courses = [], error = null
         ↓
Fetching: → API call in progress
         ↓
Success: loading = false, courses = [{...}, {...}], error = null
         → Render course grid
         
OR
         ↓
Error:   loading = false, courses = [], error = "Failed to load..."
         → Render error message
```

### Contact Form Submission State

```
Initial:  formData = {...}, loading = false, success = false, error = null
         ↓
Submitting: loading = true
           ↓
Success:   loading = false, success = true, formData = {} (reset)
          → Show success message (5s timeout)
          
OR
          ↓
Error:    loading = false, error = "Failed to send..."
         → Show error message
```

---

## API Security & Error Handling

### Database Connection Error
```
→ Database Connection Error
  → error caught in pool error handler
  → console.log to server logs
  → API tries to respond with 500 status
  → Frontend catches error and displays message
```

### Validation Error
```
→ Missing required field (name, email, message)
  → API validates on server
  → Returns 400 status code
  → Responds with: { error: "Name, email, and message are required" }
  → Frontend displays error to user
```

### Course Not Found
```
→ User requests /course/999 (doesn't exist)
  → Server queries: SELECT * FROM courses WHERE id = 999
  → Returns empty result set
  → Server responds with 404 status
  → Responds with: { error: "Course not found" }
  → Frontend navigates or shows error
```

---

## Environment Isolation

### Development Mode
```
Frontend (.env):
  REACT_APP_API_URL=http://localhost:5000/api
  
Backend (.env):
  PORT=5000
  NODE_ENV=development
  DB_HOST=localhost (local PostgreSQL)
```

### Production Mode (Future)
```
Frontend (.env):
  REACT_APP_API_URL=https://api.zeroone.courses/api
  
Backend (.env):
  PORT=80
  NODE_ENV=production
  DB_HOST=prod-db-server.com (cloud database)
```

---

## Performance Considerations

1. **React Optimization:**
   - Components use functional components with hooks
   - Framer Motion for GPU-accelerated animations
   - CSS modules for scoped styling

2. **Database Optimization:**
   - Indexed by created_at for sorting
   - Connection pooling for performance
   - SQL SELECT queries optimized

3. **API Optimization:**
   - CORS headers for efficient requests
   - JSON responses (lightweight)
   - Error handling prevents crashes

4. **Frontend Optimization:**
   - Lazy component routing ready
   - CSS Grid for responsive layouts
   - Mobile-first responsive design

---

This architecture is scalable, maintainable, and production-ready!
