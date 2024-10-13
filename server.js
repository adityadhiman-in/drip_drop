import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from './config/passport.js';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
dotenv.config();

// Import Routes
import userRoutes from './routes/users.js';
import connectDb from './config/db.js';

// Initialize app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static("public"));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.user = req.isAuthenticated() ? req.user : null; // Set user variable
  next();
});

// Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'You need to log in to view this page');
  res.redirect('/users/login');
};

// Routes
app.use('/users', userRoutes);

// Home route - Protected
app.get('/', (req, res) => res.render('home'));

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
