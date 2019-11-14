const bcrypt = require('bcrypt');
const User = require('../models/User');


const checkFields = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username === '' || email === '' || password === '') {
    req.flash('error', 'Sorry: Username, Email or password are empty.!!');
    res.redirect('auth/signup');
  } else {
    next();
  }
};

const notifications = () => (req, res, next) => {
  // We extract the messages separately cause we call req.flash() we'll clean the object flash.
  res.locals.errorMessages = req.flash('error');
  res.locals.infoMessages = req.flash('info');
  res.locals.dangerMessages = req.flash('danger');
  res.locals.successMessages = req.flash('success');
  res.locals.warningMessages = req.flash('warning');
  next();
};

const checkIfLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({ code: 'unauthorized' });
  }
};

const checkUsernameAndPasswordNotEmpty = (req, res, next) => {
  const { username, password } = req.body;

  if (username !== '' && password !== '') {
    res.locals.auth = req.body;
    next();
  } else {
    res.status(422).json({ code: 'validation' });
  }
};

module.exports = {
  checkFields,
  notifications,
  checkIfLoggedIn,
  checkUsernameAndPasswordNotEmpty,
};
