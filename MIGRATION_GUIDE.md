# Database Migration Guide

## Issue
You may be experiencing a 500 error when creating courses with the error: "Failed to create course". This is because the existing database on Render was missing the new columns `course_length_hours` and `number_of_sessions` that were added to support course duration features.

## Solution

### Step 1: Run the Migration Script

Navigate to the backend directory and run the migration:

```bash
cd backend
npm run migrate
```

This script will:
- Check if the `course_length_hours` and `number_of_sessions` columns exist
- Add them to the `courses` table if they don't exist
- Skip the migration if columns already exist

### Step 2: Verify the Migration

After running the migration, you should see output like:
```
Starting migration: Adding course_length_hours and number_of_sessions columns...
✓ Added course_length_hours column
✓ Added number_of_sessions column
✓ Migration completed successfully!
```

Or if columns already exist:
```
✓ Columns already exist. No migration needed.
```

### Step 3: Restart Your Backend Server

```bash
npm start
```

### Step 4: Test Course Creation

- Navigate to the Admin Dashboard
- Try creating a new course with the length hours and sessions fields
- The 500 error should be resolved

## For Render Deployment

If you're using Render, you can run the migration through their console:

1. Go to your Render service dashboard
2. Open the "Shell" tab
3. Run: `npm run migrate`
4. The migration will update your production database

## What Changed

- Added `course_length_hours` INTEGER column to courses table
- Added `number_of_sessions` INTEGER column to courses table
- Both columns are optional (can be NULL)

## Rollback (if needed)

If you need to remove these columns, connect to your database and run:

```sql
ALTER TABLE courses DROP COLUMN IF EXISTS course_length_hours;
ALTER TABLE courses DROP COLUMN IF EXISTS number_of_sessions;
```
