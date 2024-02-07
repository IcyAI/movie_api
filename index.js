
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'), // import built in node modules fs and path 
    path = require('path');

const app = express();

bodyParser = require('body-parser'),
uuid = require('uuid');

app.use(express.static('public'));
app.use(bodyParser.json());

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

let users = [
  {
    id:1,
    name:"Kim",
    favoriteMovies: ["Test"]
  },
  {
    id:2,
    name:"Kelly",
    favoriteMovies: ["movieName"]
  }
]

let movies = [
  {
    "title": "example",
    "description": "example of a description",
    "genre": {
      "name": "Drama",
      "description": "example of a descirption"
    },
    "director": {
      "name":"Smith",
      "bio":"Smith example Bio",
      "dateOfBirth": "January, 1st, 1956"
    }
  }
]
//Read
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
  });

//Read
  app.get('/movies/:title', (req, res) => {
    const title = req.params.title;
    const movie = movies.find(movie => movie.title === title);

    if(movie) {
        res.status(200).json(movie);
    }
    else {
        res.status(400).send("no such movie")
    }

  });


//Read
app.get('/movies/genre/:genreName', (req, res) => {
    const genreName = req.params.genreName;
    const genre = movies.find(movie => movie.genre.name === genreName).genre;

    if(genre) {
        res.status(200).json(genre);
    }
    else {
        res.status(400).send("no such genre")
    }

  });


//Read
  app.get('/movies/directors/:directorName', (req, res) => {
    const directorName = req.params.directorName;
    const director = movies.find(movie => movie.director.name === directorName).director;

    if(director) {
        res.status(200).json(director);
    }
    else {
        res.status(400).send("no such director")
    }

  });

//create
  app.post('/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    }
    else {
        res.status(400).send('Users need names');
    }

  });

//update
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    
    let user = users.find( user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    }
    else{
        res.status(400).send("no such user");
    }
  });

  //create/update
  app.post('/users/:id/:movieTitle', (req, res) => {
    const id = req.params.id;
    const movieTitle = req.params.movieTitle;
    
    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send("Movie has been added to users favoite movies");
    }
    else{
        res.status(400).send("no such user");
    }
  });

//Detele
app.delete('/users/:id/:movieTitle', (req, res) => {
    const id = req.params.id;
    const movieTitle = req.params.movieTitle;
    
    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send("Movie has been removed from the users favoite movies");
    }
    else{
        res.status(400).send("no such user");
    }
  });

//Delete
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    
    let user = users.find( user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send("user ID has been deleted");
    }
    else{
        res.status(400).send("no such user");
    }
  });

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});