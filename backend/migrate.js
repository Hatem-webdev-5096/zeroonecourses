require('dotenv').config();
const pool = require('./config/database');

async function addCourseColumns() {
  try {
    console.log('Starting migration: Adding course_length_hours and number_of_sessions columns...');

    // Check if columns already exist
    const checkColumns = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' 
      AND column_name IN ('course_length_hours', 'number_of_sessions')
    `);

    if (checkColumns.rows.length < 2) {
      // Add column if it doesn't exist
      if (checkColumns.rows.some(row => row.column_name === 'course_length_hours') === false) {
        await pool.query(`
          ALTER TABLE courses 
          ADD COLUMN course_length_hours INTEGER
        `);
        console.log('✓ Added course_length_hours column');
      }

      if (checkColumns.rows.some(row => row.column_name === 'number_of_sessions') === false) {
        await pool.query(`
          ALTER TABLE courses 
          ADD COLUMN number_of_sessions INTEGER
        `);
        console.log('✓ Added number_of_sessions column');
      }
    } else {
      console.log('✓ Columns already exist. No migration needed.');
    }

    console.log('\n✓ Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

addCourseColumns();
