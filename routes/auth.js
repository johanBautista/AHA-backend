const express = require('express');
const bcrypt = require('bcrypt');

const { checkUsernameAndPasswordNotEmpty } = require('../middlewares');

const User = require('../models/User');

const bcryptSalt = 10;

const router = express.Router();

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// create a user
router.post('/signup', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
  const { username, password } = res.locals.auth;
  try {
    const user = await User.findOne({ username });
    if (user) {
      req.flash('error', 'Usuario ya existe');
      res.redirect('/signup');
    } else {
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await User.create({ username, hashedPassword });
      req.flash('info', 'user created');
      res.redirect('/books');
    }
  } catch (error) {
    req.flash('error', 'try again');
    res.redirect('/signup');
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
  const { username, password } = res.locals.auth;
  try {
    const user = await User.findOne({ username });
    if (user) {
      if (bcrypt.compareSync(password, user.hashedPassword)) {
        req.session.currentUser = user;
        res.redirect('/books');
      } else {
        res.render('login', { error: 'usuario o contraseña incorrectos' });
      }
    } else {
      res.redirect('/signup');
    }
  } catch (error) {
    res.render('login', { error: 'error vuelve a intentarlo' });
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
