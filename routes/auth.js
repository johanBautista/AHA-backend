const express = require('express');
const bcrypt = require('bcrypt');

const { checkUsernameAndPasswordNotEmpty } = require('../middlewares/index');
const { checkFields } = require('../middlewares/index');
const User = require('../models/User');

const bcryptSalt = 10;

const router = express.Router();

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
  } else {
    res.status(401).json({ code: 'unauthorized' });
  }
});

router.post('/signup', checkFields, checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
  const { username, password } = res.locals.auth;
  try {
    const user = await User.findOne({ username });
    if (user) {
      req.flash('error', `Sorry, this ${username} has an account on the site!!`);
      console.log('USUARIO EXISTE');
      return res.status({error}).json({ code: 'username-not-unique' });
      // console.log('USUARIO EXISTE2');

    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ username, hashedPassword });
    req.session.currentUser = newUser;    
    req.flash('success', `${username}, your account has been created.`);

    return res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post('/login', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
  const { username, password } = res.locals.auth;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ code: 'not-found' });
    }
    if (bcrypt.compareSync(password, user.hashedPassword)) {
      req.session.currentUser = user;
      req.flash('success', `${user.username}, nos encanta que vuelvas!!!`);
      return res.json(user);
    }
    return res.status(404).json({ code: 'not-found' });
  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    return res.status(204).send();
  });
});

module.exports = router;
