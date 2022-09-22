const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // middleware to parse body

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://sanjay:1234@cluster0.p2zwvyo.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// create collection movies
const moviesSchema = new mongoose.Schema({
  name: String,
  year: Number,
  rating: Number,
}); // set of rules that defines the structure of the document
const movieModel = mongoose.model('movies', moviesSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});
const usersModel = mongoose.model('users', userSchema);

app.post('/users', (req, res) => {
  const body = req.body;

  usersModel.create(body);

  res.status(201);
  res.send('User created');
});

app.post('/movies', (req, res) => {
  const body = req.body;

  movieModel.create(body);

  res.status(201);
  res.send({
    message: 'Movie created' + body.name,
  });
});

app.get('/movies', async (req, res) => {
  const body = req.body;

  const movies = await movieModel.find(body);

  res.status(200);
  res.send({
    message: 'Movies fetched',
    data: movies,
  });
});

app.delete('/movies', async (req, res) => {
  const body = req.body;

  await movieModel.findByIdAndDelete(body.id);

  res.status(200);
  res.send({
    message: 'Movie deleted',
  });
});

app.patch('/movie', () => {});

app.listen(4000, () => console.log('Server started on port 4000'));
