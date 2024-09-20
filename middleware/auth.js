// middleware/auth.js

export const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'You need to log in to view this page');
    res.redirect('/users/login');
  };
  