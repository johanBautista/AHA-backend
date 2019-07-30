const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('middleware 1 🤯!!!');
  next();
});
//
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));

app.use((req, res, next) => {
  console.log('middleware 2 🤯!!!');
  next();
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});
// http://domain/courses
app.get('/courses', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const query = req.query;
  // console.log('query', query);
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// http://domain/courses/1
// http://domain/courses/2
// http://domain/courses/4554
// http://domain/courses/hola
// http://domain/courses/adios
// http://domain/courses/ghj/algo NO
app.get('/courses/:id', (req, res) => {
  const { id } = req.params;
  // console.log('curso con id ', id);
  res.send(`el curso con id ${id}`);
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/form.html'));
});

app.post('/process-form', (req, res) => {
  const form = req.body;
  console.log('form', form);
  res.redirect('/courses');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
