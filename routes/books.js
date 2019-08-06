const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

/* GET books listing. */
router.get('/', (req, res, next) => {
  Book.find()
    .then((books) => {
      console.log('books', books);
      res.render('books', { books });
    })
    .catch(next);
});

router.get('/:bookId', (req, res, next) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then((book) => {
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
    })
    .catch(next);
});

module.exports = router;
