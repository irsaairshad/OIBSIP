# Login Authentication System

A complete, production-ready login authentication system built with Node.js, Express.js, and vanilla JavaScript. This project demonstrates secure user authentication with password hashing, session management, and form validation.



📋 Features

✅ User Registration



Email validation

Password requirements (minimum 8 characters, at least 1 number)

Password confirmation validation

Duplicate username/email prevention


✅ Secure Login



Session-based authentication

Generic error messages (doesn't reveal which field is wrong)

Protected routes

Automatic redirect to login for unauthenticated users


✅ Protected Dashboard



Accessible only after successful login

Displays user information

Logout functionality

Session management


✅ Security Features



SHA-256 password hashing

Session management with express-session

CSRF protection-ready architecture

Input validation (server-side)

No sensitive data in cookies or local storage


✅ User Experience



Clean, modern UI with gradient backgrounds

Responsive design (mobile, tablet, desktop)

Real-time form validation feedback

Error handling with helpful messages

Smooth animations and transitions



🛠️ Technology Stack

Backend


Node.js - JavaScript runtime

Express.js - Web framework

crypto - Built-in Node.js module for SHA-256 hashing

express-session - Session management

body-parser - Request body parsing


Frontend


HTML5 - Semantic markup

CSS3 - Styling and responsive design

Vanilla JavaScript - Client-side interactivity (no frameworks)


Security


SHA-256 - Password hashing algorithm

Sessions - User session management

Input Validation - Server-side and client-side validation




🚀 Installation & Setup

Prerequisites


Node.js (v14 or higher)

npm (comes with Node.js)


Step 1: Install Dependencies

npm install

This will install:



express

body-parser

express-session

crypto (built-in)


Step 2: Start the Server

npm start

Or for development with auto-reload:


npm install -g nodemon
npm run dev

Step 3: Access the Application

Open your browser and navigate to:


http://localhost:3000

You'll be automatically redirected to the login page.



📝 Usage Guide

1. Registration


Navigate to /register or click "Register here" on the login page

Enter a username (at least 3 characters)

Enter a valid email address

Enter a password (minimum 8 characters with at least 1 number)

Confirm the password

Click "Register"


Example Credentials:


Username: john_doe
Email: john@example.com
Password: SecurePass123

2. Login


Go to /login page

Enter your username or email

Enter your password

Click "Login"

You'll be redirected to the dashboard


3. Dashboard


View your account information

See all security features implemented

Click "Logout" to end your session and return to login



🔐 Security Implementation

Password Hashing

Passwords are hashed using SHA-256 before storage:


function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

Why SHA-256?



It's a one-way hash function (irreversible)

Industry-standard cryptographic hash

Demonstrates security best practices

Perfect for this educational project


Note: For production, use bcrypt or Argon2 for additional security with salt rounds.


Session Management


Sessions are created upon successful login

Session data includes user ID and username

Session timeout: 24 hours

Logout destroys the session completely

Session secret is configurable in server.js


Input Validation


Client-side: Real-time feedback during typing

Server-side: All data validated before processing

Email validation using regex

Password strength requirements enforced

No empty field submission allowed


Protected Routes


Dashboard is only accessible with active session

Unauthenticated access automatically redirects to login

API endpoints verify session before returning data



📊 Feature Checklist

All requirements from OASIS INFOBYTE Task 4 are implemented:



 Registration page with username/email and password fields

 Password validation (minimum 8 characters, at least 1 number)

 Duplicate username/email check

 Login page with username/email and password fields

 Incorrect credential handling (generic error message)

 Protected/Dashboard page (only accessible after login)

 Logout button that clears session and redirects to login

 Password hashing (SHA-256)

 Basic form validation (both client and server side)



🧪 Test Cases

Successful Registration

Step 1: Go to /register
Step 2: Enter:
  - Username: testuser
  - Email: test@example.com
  - Password: TestPassword123
  - Confirm: TestPassword123
Step 3: See success message and redirect to login

Successful Login

Step 1: Go to /login
Step 2: Enter credentials from registration
Step 3: Redirected to dashboard with user info displayed

Validation Tests

Invalid Registration:



Empty fields → "All fields are required"

Weak password → "Password must be at least 8 characters..."

Mismatched passwords → "Passwords do not match"

Duplicate email → "Username or email already exists"


Invalid Login:



Wrong password → "Invalid credentials"

Non-existent user → "Invalid credentials"

Empty fields → "Username and password are required"


Protected Route Access

1. Try accessing /dashboard without login → Redirected to /login
2. Login successfully → Can access dashboard
3. Click logout → Session destroyed, redirected to login


🎨 Responsive Design

The application is fully responsive:



Desktop (1024px+): Full-width layout with optimized spacing

Tablet (768px - 1023px): Adjusted padding and font sizes

Mobile (< 768px): Single-column layout, touch-friendly buttons


Test on mobile:


# Use browser DevTools
# Press Ctrl+Shift+M (Windows) or Cmd+Shift+M (Mac) to toggle device mode


🔧 Configuration

Session Secret

Change the session secret in server.js for production:


app.use(session({
  secret: 'change_this_to_a_random_string_in_production',
  // ... other options
}));

Session Timeout

Modify the session cookie maxAge in server.js:


cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours in milliseconds

Server Port

Change the port in server.js:


const PORT = 3000; // Change to desired port


📚 How It Works

Registration Flow

User Registration Form
        ↓
Client-side Validation
        ↓
Server Validation
        ↓
Hash Password (SHA-256)
        ↓
Store User (In-memory array)
        ↓
Success Response + Redirect to Login

Login Flow

User Login Form
        ↓
Server-side Validation
        ↓
Find User by Username/Email
        ↓
Hash Submitted Password
        ↓
Compare with Stored Hash
        ↓
Create Session
        ↓
Redirect to Dashboard

Protected Route Flow

User Accesses /dashboard
        ↓
Check Session Exists
        ↓
If Session Valid → Show Dashboard
If No Session → Redirect to /login


🐛 Troubleshooting

Problem: "Cannot find module 'express'"

Solution:


npm install

Problem: "EADDRINUSE: address already in use"

Solution: Change the PORT in server.js or stop the process using that port:


# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :3000
kill -9 <PID>

Problem: Session not persisting

Solution: Check that cookies are enabled in your browser and session secret is set.


Problem: Password validation failing

Solution: Ensure password has:



At least 8 characters

At least 1 number (0-9)



💡 Future Enhancements

For production deployment, consider:



Database Integration

Replace in-memory array with MongoDB or PostgreSQL
Implement proper ORM (Mongoose, Sequelize, Prisma)

Advanced Security

Use bcrypt or Argon2 instead of SHA-256
Implement CSRF tokens
Add rate limiting for login attempts
Implement email verification
Add "Forgot Password" functionality
Two-Factor Authentication (2FA)

Performance

Add caching (Redis)
Database indexing for users
Load balancing for multiple servers

Infrastructure

Docker containerization
Deploy to Heroku, AWS, or DigitalOcean
SSL/TLS certificate (HTTPS)
Environment variables (.env file)

Testing

Unit tests (Jest)
Integration tests
End-to-end tests (Cypress)



📖 Learning Outcomes

This project demonstrates:



✅ Full-stack web application development

✅ RESTful API design

✅ Session management and authentication

✅ Password hashing and security

✅ Form validation (client & server)

✅ Responsive web design

✅ Error handling and user feedback

✅ Separation of concerns (frontend/backend)



📄 License

This project is created for educational purposes as part of the OASIS INFOBYTE internship program.


