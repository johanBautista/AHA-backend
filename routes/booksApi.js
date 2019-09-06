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
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get('/:bookId', async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    if (book) {
      res.json(book);
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

router.post('/', async (req, res, next) => {
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
    res.json({ created: 'ok', book });
  } catch (error) {
    next(error);
  }
});

router.put('/:bookId', async (req, res, next) => {
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
    res.json({ updated: 'ok', book });
  } catch (error) {
    next(error);
  }
});

router.delete('/:bookId', async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findByIdAndDelete(bookId);
    res.json({
      deleted: 'ok',
      book,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
