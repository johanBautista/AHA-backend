const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('middleware 1 🤯!!!');
  console.log('url ', req.url);
  next();
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));

app.use((req, res, next) => {
  console.log('middleware 2 🤯!!!');
  console.log('url ', req.url);
  next();
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
