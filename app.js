const express = require('express');

const movies = [
  {
    id: 1,
    name: 'Avengers',
    year: 2012,
    rating: 8.1,
  },
  {
    id: 2,
    name: 'The Dark Knight',
    year: 2008,
    rating: 9,
  },
  {
    id: 3,
    name: 'Inception',
    year: 2010,
    rating: 8.8,
  },
];

const server = express();
server.use(express.json());

server.get('/movies', (req, res) => {
  res.status(200);

  res.send({
    message: 'Here are your movies my friend 😉',
    data: movies,
  });
});

server.post('/movies', (req, res) => {
  movies.push(req.body);
  res.send('We have a new movie! ' + req.body.name);
});

server.delete('/movies', (req, res) => {
  const id = req.query.id;
  console.log(id);

  const index = movies.findIndex((movie) => movie.id === parseInt(id));

  movies.splice(index, 1);

  res.send('Movie deleted');
});

server.listen(4000);
