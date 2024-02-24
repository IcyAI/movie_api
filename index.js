
const mongoose = require('mongoose');
const Models = require('./models.js');

const movies = Models.movie;
const users = Models.user;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'), // import built in node modules fs and path 
    path = require('path');

const app = express();

bodyParser = require('body-parser'),
uuid = require('uuid');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

//Read all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

//Read one movie
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
 await movies.findOne({Title: req.params.title})
 .then((movie) => {
  res.json(movie);
 })
 .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
 })
});

//Read genre description
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await movies.findOne({ 'Genre.Name': req.params.genreName})
  .then((movies) => {
    res.json(movies.Genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});


//Read director description
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await movies.findOne({ 'Director.Name': req.params.directorName})
  .then((movies) => {
    res.json(movies.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

//create new user
  app.post('/users', async (req, res) => {
    await users.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.username + 'already exists');
        } else {
          users
            .create({
              username: req.body.username,
              password: req.body.password,
              email: req.body.email,
              birthday: req.body.birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//Update User Information
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if(req.user.username !== req.params.Username){
      return res.status(400).send('Permission denied');
  }
  // CONDITION ENDS
  await users.findOneAndUpdate({ username: req.params.Username }, {
      $set:
      {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthday: req.body.birthday
      }
  },
      { new: true }) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
          res.json(updatedUser);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send('Error: ' + err);
      })
});

//Update New favorite movie
  app.post('/Users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await users.findOneAndUpdate({username: req.params.Username},
      {$push: { favoriteMovies: req.params.MovieID}},
    { new: true})
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

//delete FavoriteMovie
app.delete('/Users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await users.findOneAndUpdate({username: req.params.Username},
    {$pull: { favoriteMovies: req.params.MovieID}},
  { new: true})
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

  //Delete User
app.delete('/Users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await users.findOneAndDelete({ username: req.params.Username})
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error; ' + err);
      });
    });

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});