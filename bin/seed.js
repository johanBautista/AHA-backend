const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const Book = require('../models/Book');

mongoose.connect('mongodb://localhost/miBiblio', { useNewUrlParser: true });

const books = [];
for (let i = 0; i < 30; i++) {
  books.push({
    title: faker.hacker.phrase(),
    description: faker.lorem.sentences(3),
    author: faker.name.firstName(),
    rating: faker.random.number(1, 5),
  });
}

Book.insertMany(books)
  .then(() => {
    console.log('inserted fake data');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  });
