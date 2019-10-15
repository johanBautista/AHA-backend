/* eslint-disable no-param-reassign */
const checkIfLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
};

const checkUsernameAndPasswordNotEmpty = (req, res, next) => {
  const { username, password } = req.body;

  if (username !== '' && password !== '') {
    res.locals.auth = req.body;
    next();
  } else {
    req.flash('error', 'campos no pueden estar vacios');
    res.redirect('/signup');
  }
};

module.exports = {
  checkIfLoggedIn,
  notifications,
  checkUsernameAndPasswordNotEmpty,
};
