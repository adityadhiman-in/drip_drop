// middleware/auth.js

// Middleware to ensure user is authenticated
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'You need to log in to view this page');
  res.redirect('/users/login');
};

// Middleware to set user data in all views
export const setUser = (req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null;
  next();
};
