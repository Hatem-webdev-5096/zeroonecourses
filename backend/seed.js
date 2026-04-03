require('dotenv').config();
const pool = require('./config/database');

const sampleCourses = [
  {
    name: 'Web Development with React',
    description: 'Master modern web development with React, including components, hooks, routing, state management, and best practices. Perfect for beginners and intermediate developers looking to build professional web applications.',
    short_description: 'Learn React and build responsive web applications',
    price: 1500,
    location_type: 'hybrid',
    course_length_hours: 40,
    number_of_sessions: 10,
    featured: true,
  },
  {
    name: 'JavaScript Fundamentals',
    description: 'Get started with JavaScript programming. Learn variables, functions, objects, arrays, and DOM manipulation. This course covers everything you need to know to start your journey as a web developer.',
    short_description: 'Master JavaScript basics and programming fundamentals',
    price: 1000,
    location_type: 'online',
    course_length_hours: 30,
    number_of_sessions: 8,
    featured: true,
  },
  {
    name: 'Advanced Python Programming',
    description: 'Advance your Python skills with advanced concepts including decorators, generators, async programming, and design patterns. Perfect for developers looking to master Python for data science or backend development.',
    short_description: 'Expert-level Python programming and best practices',
    price: 1800,
    location_type: 'onsite',
    course_length_hours: 50,
    number_of_sessions: 12,
    featured: true,
  },
  {
    name: 'Digital Marketing Essentials',
    description: 'Learn the fundamentals of digital marketing including SEO, SEM, social media marketing, and email campaigns. Build a strong foundation to launch your digital marketing career.',
    short_description: 'Complete guide to digital marketing strategies',
    price: 1200,
    location_type: 'hybrid',
    course_length_hours: 35,
    number_of_sessions: 9,
    featured: true,
  },
  {
    name: 'English Communication Skills',
    description: 'Improve your English communication skills with focus on speaking, listening, reading, and writing. Ideal for professionals and students who want to enhance their English proficiency.',
    short_description: 'Master professional English communication',
    price: 900,
    location_type: 'online',
    course_length_hours: 25,
    number_of_sessions: 6,
    featured: false,
  },
  {
    name: 'UI/UX Design Masterclass',
    description: 'Learn to design beautiful and functional user interfaces. Cover design principles, wireframing, prototyping, and best practices. Use industry-standard tools like Figma.',
    short_description: 'Create stunning user interfaces and experiences',
    price: 1400,
    location_type: 'online',
    course_length_hours: 45,
    number_of_sessions: 11,
    featured: true,
  },
  {
    name: 'Data Analysis with Excel',
    description: 'Master data analysis using Excel. Learn pivot tables, VLOOKUP, advanced formulas, data visualization, and business analytics. Perfect for professionals working with data.',
    short_description: 'Professional data analysis and reporting',
    price: 800,
    location_type: 'onsite',
    course_length_hours: 20,
    number_of_sessions: 5,
    featured: false,
  },
  {
    name: 'Mobile App Development',
    description: 'Build mobile applications for iOS and Android. Learn React Native or Flutter frameworks, state management, and deployment. Create cross-platform mobile apps.',
    short_description: 'Develop professional mobile applications',
    price: 2000,
    location_type: 'hybrid',
    course_length_hours: 60,
    number_of_sessions: 15,
    featured: true,
  },
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    for (const course of sampleCourses) {
      const result = await pool.query(
        `INSERT INTO courses (name, description, short_description, price, location_type, course_length_hours, number_of_sessions, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [course.name, course.description, course.short_description, course.price, course.location_type, course.course_length_hours, course.number_of_sessions, course.featured]
      );
      console.log(`✓ Created course: ${course.name} (ID: ${result.rows[0].id})`);
    }

    console.log('\n✓ Database seeding completed successfully!');
    console.log(`\nAdded ${sampleCourses.length} sample courses to the database.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seedDatabase();
