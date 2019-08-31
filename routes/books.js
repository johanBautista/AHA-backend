/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('biblio');
const Book = require('../models/Book');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');

/* GET books listing. */
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.render('books', { books });
  } catch (error) {
    next(error);
  }
});

router.get('/new', checkIfLoggedIn, (req, res) => {
  // debug('get endpoint /books/new ');
  res.render('new');
});

router.get('/:bookId', checkIfLoggedIn, async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    if (book) {
      const rating = [];
      for (let i = 0; i < book.rating; i++) {
        rating.push('⭐️');
      }
      res.render('bookDetail', { book, rating });
    } else {
      const error = new Error('nada por aqui');
      Error.status = 404;
      // next(error);
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', checkIfLoggedIn, async (req, res, next) => {
  const {
    title, author, description, rating,
  } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      description,
      rating,
    });
    res.redirect(`/books/${book._id}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:bookId/update', checkIfLoggedIn, async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    res.render('edit', book);
  } catch (error) {
    next(error);
  }
});

router.post('/:bookId', checkIfLoggedIn, async (req, res, next) => {
  const { bookId } = req.params;
  const {
    title, author, description, rating,
  } = req.body;
  try {
    await Book.findByIdAndUpdate(bookId, {
      title,
      author,
      description,
      rating,
    });
    res.redirect(`/books/${bookId}`);
  } catch (error) {
    next(error);
  }
});

router.post('/:bookId/delete', checkIfLoggedIn, async (req, res, next) => {
  const { bookId } = req.params;
  try {
    await Book.findByIdAndDelete(bookId);
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
