# ZeroOne Courses - Render Deployment Guide

## Overview
This guide will help you deploy the ZeroOne Courses application on Render.com as three separate services:
1. **Backend API** (Node.js/Express)
2. **Frontend** (React)
3. **Database** (PostgreSQL)

---

## Prerequisites

Before starting, you'll need:
- A [Render.com](https://render.com) account (free tier available)
- A [GitHub](https://github.com) account
- Your project code pushed to GitHub
- Cloudinary account credentials (already configured)
- Basic understanding of environment variables

---

## Step 1: Prepare Your GitHub Repository

### 1.1 Push Your Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit - ready for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zero-one-courses.git
git push -u origin main
```

### 1.2 Verify Project Structure
Ensure your repository has this structure:
```
zero-one-courses/
├── backend/
│   ├── config/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── render.yaml
└── README.md
```

---

## Step 2: Create PostgreSQL Database on Render

### 2.1 Create Database Service
1. Log in to [Render.com Dashboard](https://dashboard.render.com)
2. Click **"+ New"** → **"PostgreSQL"**
3. Configure the database:
   - **Name:** `zero-one-courses-db`
   - **Database:** `zero_one_courses` (auto-filled)
   - **User:** `postgres` (auto-filled)
   - **Region:** Choose closest to your users
   - **PostgreSQL Version:** 15
   - **Plan:** Free (or Free tier if upgrading later)

### 2.2 Note Database Credentials
After creation, you'll see:
- **Hostname/Host:** Save this (looks like `dpg-xxx.render.com`)
- **Port:** Usually `5432`
- **Database:** `zero_one_courses`
- **User:** `postgres`
- **Password:** Save this securely (shown only once)

**Keep these credentials handy for the backend configuration.**

---

## Step 3: Deploy Backend API Service

### 3.1 Create Backend Service
1. Click **"+ New"** → **"Web Service"**
2. Connect your GitHub repository:
   - Click **"Connect"** next to your GitHub repo
   - Authorize Render to access GitHub
   - Select your `zero-one-courses` repository

### 3.2 Configure Backend Service
Fill in the following settings:

**Basic Information:**
- **Name:** `zero-one-courses-api`
- **Environment:** `Node`
- **Region:** Same as database
- **Branch:** `main`

**Build & Deploy:**
- **Build Command:** 
  ```
  cd backend && npm install
  ```
- **Start Command:** 
  ```
  cd backend && npm start
  ```

**Plan:** Free tier is suitable for testing

### 3.3 Add Environment Variables
After service creation, go to **Settings** → **Environment** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `DB_HOST` | From Step 2.2 (your database hostname) |
| `DB_PORT` | `5432` |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | From Step 2.2 (your database password) |
| `DB_NAME` | `zero_one_courses` |
| `JWT_SECRET` | Generate a strong random string (use: `openssl rand -base64 32` or any 32+ char random string) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `FRONTEND_URL` | Leave empty for now, update after frontend deployment |

### 3.4 Deploy Backend
- Click **"Create Web Service"**
- Render will automatically deploy
- **Once deployed**, note your backend URL (looks like `https://zero-one-courses-api.onrender.com`)

**Wait for the backend to show "Live" status before proceeding.**

---

## Step 4: Deploy Frontend Service

### 4.1 Create Frontend Service
1. Click **"+ New"** → **"Web Service"**
2. Connect the same GitHub repository
3. Configure frontend service:

**Basic Information:**
- **Name:** `zero-one-courses-frontend`
- **Environment:** `Node`
- **Region:** Same as other services
- **Branch:** `main`

**Build & Deploy:**
- **Build Command:**
  ```
  cd frontend && npm install && npm run build
  ```
- **Start Command:**
  ```
  cd frontend && npx serve -s build -l 3000
  ```

### 4.2 Add Frontend Environment Variables
Go to **Settings** → **Environment** and add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | Your backend URL from Step 3.4 (e.g., `https://zero-one-courses-api.onrender.com/api`) |

### 4.3 Deploy Frontend
- Click **"Create Web Service"**
- Wait for deployment to complete (shows "Live")
- **Note your frontend URL** (looks like `https://zero-one-courses-frontend.onrender.com`)

---

## Step 5: Update Backend CORS Configuration

### 5.1 Update Backend Environment Variable
1. Go to your **Backend Service** on Render
2. Go to **Settings** → **Environment**
3. Add/Update the `FRONTEND_URL` variable:
   - **Key:** `FRONTEND_URL`
   - **Value:** Your frontend URL from Step 4.3

### 5.2 Trigger Redeployment
- Click the three dots menu
- Select **"Manual Deploy"** → **"Deploy latest commit"**
- Wait for redeployment to complete

---

## Step 6: Verify Deployment

### 6.1 Test Backend
Open your browser and visit:
```
https://your-backend-url.onrender.com/api/health
```
You should see:
```json
{"status":"Server is running"}
```

### 6.2 Test Frontend
Visit your frontend URL:
```
https://your-frontend-url.onrender.com
```
You should see the ZeroOne Courses landing page

### 6.3 Test Admin Login
1. Navigate to `/adminlogin`
2. Login with:
   - **Username:** `Admin`
   - **Password:** `123456`
3. Try uploading a test image to the gallery

### 6.4 Check Browser Console
- Press `F12` to open Developer Tools
- Go to **Console** tab
- Look for any error messages
- Verify API calls are going to your Render backend URL (not localhost)

---

## Step 7: Update Local Environment (Optional)

### Frontend .env (for local development)
Create or update `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend .env (for local development)
Create or update `backend/.env`:
```
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_local_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zero_one_courses
NODE_ENV=development
JWT_SECRET=your_local_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
```

---

## Troubleshooting Guide

### Issue: 401 Unauthorized errors when uploading gallery items
**Solution:** Make sure `adminToken` is being stored in localStorage after login. Check browser console under Application → Storage → Local Storage.

### Issue: Database connection errors
**Solution:** 
- Verify database hostname, port, user, and password are correct
- Check that database is in the same region as backend
- Run database migrations by accessing the service logs

### Issue: "Cannot POST /api/gallery"
**Solution:** 
- Backend hasn't been redeployed after code changes
- Manually deploy backend from Render dashboard
- Wait for deployment to complete (check logs for "Listening on port 5000")

### Issue: Frontend shows "localhost:5000" errors
**Solution:**
- Update `REACT_APP_API_URL` environment variable
- Ensure there are no hardcoded localhost URLs in the code
- Redeploy frontend after making changes

### Issue: CORS errors
**Solution:**
- Verify `FRONTEND_URL` is set correctly in backend
- Check that frontend URL matches exactly (including https://)
- Redeploy backend after updating environment variable

### Accessing Database Directly
If you need to connect to your Render database locally:
```bash
psql -U postgres -h [YOUR_HOST] -d zero_one_courses -W
```
(It will prompt for password)

---

## Performance Tips

### Free Tier Considerations
- Free tier services spin down after 15 minutes of inactivity
- First request may take 30+ seconds to wake up
- For production use, upgrade to paid tier
- Database takes ~30 seconds to initialize on first request

### Optimization Recommendations
1. **Enable Build Cache** in Render settings
2. **Upgrade to Standard Tier** for better performance:
   - Backend: ~$7/month
   - Frontend: ~$7/month
   - Database: ~$7/month (total ~$21/month)

### Monitoring
- Check service logs frequently (Render Dashboard → Service → Logs)
- Set up error alerting if available
- Monitor database connection limits

---

## Next Steps

### Additional Features to Consider
1. **SSL/HTTPS:** Already configured automatically by Render
2. **Custom Domain:** 
   - Go to Service Settings → Custom Domain
   - Add your domain (requires DNS configuration)
   
3. **Automated Email Notifications:**
   - Set up GitHub webhook for deployments
   - Enable error alerts in Render settings

4. **Database Backup:**
   - Enable backup on your database service
   - Available on upgraded tiers

### Continuous Deployment
Every push to your GitHub `main` branch will automatically trigger:
1. Logs built on Render
2. Tests run (if configured)
3. Services automatically redeployed
4. Zero downtime deployment

---

## Quick Reference URLs

After deployment, replace with your actual URLs:

- **Frontend:** https://zero-one-courses-frontend.onrender.com
- **Backend API:** https://zero-one-courses-api.onrender.com/api
- **Admin Login:** https://zero-one-courses-frontend.onrender.com/adminlogin
- **Gallery:** https://zero-one-courses-frontend.onrender.com/gallery
- **Health Check:** https://zero-one-courses-api.onrender.com/api/health

---

## Support Resources

- [Render Documentation](https://docs.render.com)
- [PostgreSQL on Render](https://docs.render.com/databases)
- [Node.js on Render](https://docs.render.com/deploy-node-express-app)
- [Environment Variables](https://docs.render.com/environment-variables)

---

## Important Security Notes

⚠️ **Never commit your actual .env file with credentials to GitHub**
- Use `.env.example` as a template
- Add `.env` to `.gitignore`
- Always use Render's environment variables for secrets
- Rotate JWT_SECRET and database passwords regularly

---

**Congratulations!** Your ZeroOne Courses application is now deployed on Render! 🎉
