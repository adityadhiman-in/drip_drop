import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { ensureAuthenticated, setUser } from '../middleware/auth.js';

const router = express.Router();

// Apply setUser middleware to pass user info to all routes
router.use(setUser);

// @route   GET /users/login
router.get('/login', (req, res) => res.render('login', { error_msg: req.flash('error_msg') }));

// @route   POST /users/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/play',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// @route   GET /users/signup
router.get('/signup', (req, res) => res.render('signup', { error_msg: req.flash('error_msg') }));

// @route   POST /users/signup
router.post('/signup', async (req, res) => {
  const { username, email, password, password2 } = req.body;
  if (password !== password2) {
    req.flash('error_msg', 'Passwords do not match');
    return res.redirect('/users/signup');
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/users/signup');
    } else {
      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      req.flash('success_msg', 'You are now registered and can log in');
      res.redirect('/users/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route   GET /users/profile
// Profile page, protected route
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile', { user: req.user }); // Pass user data to the profile view
});

// @route   GET /users/logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You have logged out');
    res.redirect('/users/login');
  });
});

// @route   GET /users/edit-profile
router.get('/edit-profile', ensureAuthenticated, (req, res) => {
  res.render('editProfile', { user: req.user });
});

// @route   POST /users/edit-profile
router.post('/edit-profile', ensureAuthenticated, async (req, res) => {
  const { username, email, password, password2 } = req.body;

  if (password !== password2) {
    req.flash('error_msg', 'Passwords do not match');
    return res.redirect('/users/edit-profile');
  }

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/users/edit-profile');
    }

    // Update user details
    user.username = username;
    user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    req.flash('success_msg', 'Profile updated successfully');
    res.redirect('/users/profile'); // Redirect to the profile page
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Something went wrong, please try again.');
    res.redirect('/users/edit-profile');
  }
});

// @route   GET /about
// @desc    About the brand
router.get('/about', (req, res) => {
  res.render('about'); // Renders the about page
});

// @route   GET /play
router.get('/play', ensureAuthenticated, (req, res) => {
  res.render('play', { user: req.user });
});

// @route   GET /playgame
router.get('/playgame', ensureAuthenticated, (req, res) => {
  res.render('mainGame');
});

// @route   GET /story
router.get('/story', (req, res) => {
  res.render('story');
});

// @route   GET /rewards
router.get('/rewards', ensureAuthenticated, (req, res) => {
  const rewards = ''; // Replace with actual rewards fetching logic
  res.render('rewards', { user: req.user, rewards });
});
// POST route to build the town (protected route)
router.get('/build', ensureAuthenticated, (req, res) => {
  res.render("build")
});

// @route   GET /memoryMatch
router.get('/memorymatch', ensureAuthenticated, (req, res) => {
  res.render('memoryMatch'); 
});

export default router;