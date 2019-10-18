/* eslint-disable no-underscore-dangle */
const express = require('express');
// const debug = require('debug')('biblio');
const Book = require('../models/Book');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');

/* GET books listing. */
router.get('/', checkIfLoggedIn, async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get('/:bookId', checkIfLoggedIn, async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    if (book) {
      res.json(book);
    } else {
      res.json({});
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
    res.json(book);
  } catch (error) {
    next(error);
  }
});

router.put('/:bookId', checkIfLoggedIn, async (req, res, next) => {
  const { bookId } = req.params;
  const {
    title, author, description, rating,
  } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(bookId, {
      title,
      author,
      description,
      rating,
    });
    res.json(book);
  } catch (error) {
    next(error);
  }
});

router.delete('/:bookId', checkIfLoggedIn, async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findByIdAndDelete(bookId);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
