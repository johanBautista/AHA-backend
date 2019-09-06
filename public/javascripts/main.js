// eslint-disable-next-line no-undef
console.log('estoy en public');
const button = document.getElementById('pokeButton');
button.addEventListener('click', () => {
  // axios
  //   .get('https://pokeapi.co/api/v2/pokemon')
  //   .then(({ data: { results } }) => {
  //     console.log(results);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  axios
    .post('/api/books', {
      title: 'desdel browser',
      description: 'blablabla',
      author: 'spiderJorge',
      rating: 5,
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
axios
  .get('/api/books')
  .then((response) => {
    // handle success
    console.log('response', response.data);
    const { data } = response;
    data.forEach((element) => {
      const li = document.createElement('li');
      li.innerText = element.title;
      document.getElementById('list').appendChild(li);
    });
  })
  .catch((error) => {
    // handle error
    console.log('error', error);
  });
