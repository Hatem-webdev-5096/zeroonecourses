# 🔧 Installation & Troubleshooting Guide

## Prerequisites Check

Before starting, ensure you have:

```
✓ Node.js v14+ (check: node --version)
✓ npm v6+ (check: npm --version)
✓ PostgreSQL v12+ (check: psql --version)
✓ ~2GB free disk space
✓ Port 3000, 5000, 5432 available
```

### Installing Prerequisites

#### Windows - Node.js & npm
1. Download from https://nodejs.org/
2. Run installer, select "Add to PATH"
3. Restart terminal after installation
4. Verify: `node --version` and `npm --version`

#### Windows - PostgreSQL
1. Download from https://www.postgresql.org/download/windows/
2. Run EnterpriseDB installer
3. Remember the password for postgres user
4. Keep port as 5432
5. Verify: `psql --version`

---

## Step-by-Step Installation

### Phase 1: Database Setup

#### 1.1 Create PostgreSQL Database

**Option A: Via Command Line**
```bash
# Open terminal in admin mode
psql -U postgres

# In psql prompt:
CREATE DATABASE zero_one_courses;

# Verify creation:
\l

# Exit psql:
\q
```

**Option B: Via pgAdmin UI**
1. Open pgAdmin (comes with PostgreSQL)
2. Right-click "Databases"
3. Create → Database
4. Name: `zero_one_courses`
5. Click Save

#### 1.2 Verify Connection

```bash
psql -U postgres -d zero_one_courses

# Should see:
# zero_one_courses=>

# Exit:
\q
```

### Phase 2: Backend Setup

#### 2.1 Navigate to Backend Folder

```bash
cd "d:\Programming\Center\ZeroOne Courses\backend"

# Verify location:
dir
# Should show: config, routes, public, seed.js, server.js, package.json
```

#### 2.2 Install Dependencies

```bash
npm install

# This will download ~100+ packages
# Wait for "added X packages" message
```

**Expected output:**
```
added 53 packages in 5.23s
```

#### 2.3 Configure Database Connection

Edit `.env` file:

```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=<your-postgres-password>
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zero_one_courses
NODE_ENV=development
```

#### 2.4 Test Backend Start

```bash
npm start

# Should see:
# Server running on port 5000
# Database tables initialized successfully
```

**If it works:** ✓ Stop with Ctrl+C and continue

**If error:** See troubleshooting section below

#### 2.5 Seed Sample Data (Optional)

```bash
npm run seed

# Should see:
# ✓ Created course: Web Development with React (ID: 1)
# ✓ Created course: JavaScript Fundamentals (ID: 2)
# ...
# ✓ Database seeding completed successfully!
```

### Phase 3: Frontend Setup

#### 3.1 Open New Terminal

Keep backend running in first terminal, open new terminal

#### 3.2 Navigate to Frontend

```bash
cd "d:\Programming\Center\ZeroOne Courses\frontend"

# Verify:
dir
# Should show: public, src, package.json
```

#### 3.3 Install Dependencies

```bash
npm install

# Wait for completion
# Takes ~2-3 minutes
```

**Expected output:**
```
added 1,500+ packages in 2m 45s
```

#### 3.4 Verify .env File

Check `.env` contains:
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 3.5 Start Frontend

```bash
npm start

# Browser should automatically open http://localhost:3000
# Should see: ZeroOne Courses homepage with featured courses
```

---

## Verification Checklist

After startup:

- [ ] Terminal 1 (Backend): "Server running on port 5000"
- [ ] Terminal 2 (Frontend): "webpack compiled successfully"
- [ ] Browser opens automatically to localhost:3000
- [ ] Header shows "ZeroOne" logo and navigation
- [ ] Featured courses grid visible
- [ ] "Learn More" buttons clickable
- [ ] Navigation links work (About Us, Contact)
- [ ] Contact form displays

---

## Testing the Application

### Test 1: View Featured Courses

1. Go to http://localhost:3000
2. See course cards with:
   - Course title
   - Price in EGP
   - Location badge (Online/Onsite/Hybrid)
   - "Learn More" button

**If not working:** Check if backend is running (`npm start` in backend folder)

### Test 2: View Course Details

1. Click "Learn More" on any course
2. Should see:
   - Full course description
   - Price
   - Location type
   - "Enroll Now" button
   - "What You'll Learn" section

**If not working:** Check browser console (F12) for errors

### Test 3: Submit Contact Form

1. Go to Contact page
2. Fill form with:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "01012345678"
   - Subject: "Test inquiry"
   - Message: "This is a test"
3. Click "Send Message"
4. Should see success message

**If not working:** Check browser Network tab (F12) for API errors

### Test 4: Check Database

```bash
psql -U postgres -d zero_one_courses

# View courses:
SELECT * FROM courses;

# View messages:
SELECT * FROM contact_messages;

# Exit:
\q
```

---

## Troubleshooting Guide

### ❌ "Connection refused" on Backend Start

**Problem:** Cannot connect to PostgreSQL

**Solution:**
1. Check PostgreSQL is running:
   - Windows Services: Search "Services"
   - Look for: "postgresql-x64-XX"
   - Status should be "Running"

2. Verify credentials in `.env`:
   ```
   DB_USER=postgres (default)
   DB_PASSWORD=<your-password-set-during-install>
   DB_HOST=localhost
   DB_PORT=5432
   ```

3. Test connection:
   ```bash
   psql -U postgres
   # Should launch psql prompt
   ```

4. Confirm database exists:
   ```bash
   \l
   # Look for "zero_one_courses" in list
   ```

---

### ❌ "Port 5000 already in use"

**Problem:** Another process using port 5000

**Solutions:**

**Option 1: Use Different Port**
1. Edit `backend/.env`
2. Change: `PORT=5001`
3. Restart backend
4. Update frontend `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5001/api
   ```
5. Restart frontend

**Option 2: Kill Process Using Port**

Windows PowerShell:
```bash
netstat -ano | findstr :5000
# Note the PID from last column
taskkill /PID <PID> /F
```

---

### ❌ "Port 3000 already in use"

**Problem:** Another process using port 3000

**Solutions:**

**Option 1: Use Different Port**
```bash
PORT=3001 npm start
```

**Option 2: Kill Process**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### ❌ "React app not loading" or "Blank page"

**Problem:** Frontend loads but nothing displays

**Solutions:**

1. **Check Browser Console (F12 → Console tab)**
   - Look for red errors with "CORS", "404", or "500"

2. **CORS Error?**
   - Backend running on port 5000?
   - Frontend running on port 3000?
   - Check `.env` has correct API URL

3. **API Errors?**
   - Go to Network tab (F12)
   - Look for failed requests
   - Check if backend is responding

4. **Refresh Browser**
   - Press Ctrl+Shift+R (hard refresh)
   - Clear cache: Ctrl+Shift+Delete

5. **Restart Both Servers**
   ```
   Stop frontend: Ctrl+C in terminal
   Stop backend: Ctrl+C in terminal
   npm start (backend)
   npm start (frontend)
   ```

---

### ❌ "npm install fails"

**Problem:** Dependency installation errors

**Solutions:**

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   ```

2. **Delete existing node_modules**
   ```bash
   rmdir /s /q node_modules
   rm package-lock.json
   npm install
   ```

3. **Check npm version**
   ```bash
   npm --version
   # Should be v6+
   npm install -g npm@latest
   ```

4. **Check internet connection**
   - npm needs to download packages

---

### ❌ "No courses showing" on Home page

**Problem:** Featured courses grid is empty

**Solutions:**

1. **Database seeded?**
   ```bash
   npm run seed
   ```

2. **Manually add course:**
   ```bash
   curl -X POST http://localhost:5000/api/courses \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Course",
       "description": "Test description",
       "price": 1000,
       "location_type": "online",
       "featured": true
     }'
   ```

3. **Check database directly:**
   ```bash
   psql -U postgres -d zero_one_courses
   SELECT COUNT(*) FROM courses;
   SELECT * FROM courses WHERE featured = true;
   \q
   ```

---

### ❌ "Contact form won't submit"

**Problem:** Form submission fails

**Solutions:**

1. **Check all fields filled:**
   - Name (required)
   - Email (required)
   - Message (required)

2. **Check browser console (F12):**
   - Look for error messages

3. **Verify backend is running:**
   ```bash
   curl http://localhost:5000/api/health
   # Should return: {"status":"Server is running"}
   ```

4. **Check database:**
   ```bash
   psql -U postgres -d zero_one_courses
   SELECT * FROM contact_messages;
   \q
   ```

---

### ❌ "npm start hangs" or takes forever

**Problem:** Installation or build is stuck

**Solutions:**

1. **Stop the process** (Ctrl+C)

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Try again:**
   ```bash
   npm start
   ```

4. **Check disk space:**
   - Ensure you have 2GB+ free space
   - Check: `System Settings → Storage`

---

### ❌ "Module not found" errors

**Problem:** Missing dependency

**Solutions:**

1. **Install missing module:**
   ```bash
   npm install <module-name>
   ```

2. **Reinstall all dependencies:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **Verify package.json exists:**
   ```bash
   dir
   # Should see package.json
   ```

---

## Advanced Debugging

### View Backend Logs

```bash
# Backend logs to console
# Check for: Database errors, Route errors, Connection issues
```

### View Browser Console

```
F12 → Console tab
- Check for JavaScript errors
- Check for CORS errors
- Check API response errors
```

### View Network Requests

```
F12 → Network tab
- Monitor API calls
- Check response status (200, 404, 500)
- Check response payload
```

### Database Query Debugging

```bash
psql -U postgres -d zero_one_courses

# View all courses:
SELECT id, name, featured FROM courses;

# View all messages:
SELECT id, name, email, created_at FROM contact_messages;

# Count records:
SELECT COUNT(*) FROM courses;

# View recent messages:
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5;
```

---

## Performance Optimization Tips

### Backend
1. Minimize database queries
2. Use connection pooling (already implemented)
3. Add caching for frequently accessed data

### Frontend
1. Use React DevTools to check re-renders
2. Lazy load images
3. Code split routes

### Database
1. Add indexes on frequently queried fields
2. Archive old contact messages
3. Regular backups

---

## Common Port Issues

### Check Which Process Uses a Port

```bash
# Port 5000
netstat -ano | findstr :5000

# Port 3000
netstat -ano | findstr :3000

# Port 5432 (PostgreSQL)
netstat -ano | findstr :5432
```

### Kill a Process

```bash
# Replace <PID> with actual process id
taskkill /PID <PID> /F

# Force kill
taskkill /PID <PID> /F /T
```

---

## Getting Help

If you encounter issues:

1. **Check this guide** for your error
2. **Check console errors** (F12)
3. **Check terminal output** for backend logs
4. **Review configuration** in `.env` files
5. **Restart all services** (backend + frontend)
6. **Clear all caches** (npm, browser)
7. **Contact support:** info@zeroone.courses

---

## Success Indicators ✓

You're ready when you see:

- Backend terminal: "✓ Server running on port 5000"
- Frontend terminal: "✓ Compiled successfully"
- Browser: "ZeroOne Courses | Master IT & Language Skills"
- Home page displays featured courses
- All navigation links work
- Contact form submits successfully
- Database contains courses and messages

---

**Congratulations! Your ZeroOne Courses platform is ready! 🎉**
