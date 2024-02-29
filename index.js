
// // const mongoose = require('mongoose');
// // const Models = require('./models.js');

// // const movies = Models.movie;
// // const users = Models.user;

// // //mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });

// // mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// // const express = require('express'),
// //     morgan = require('morgan'),
// //     fs = require('fs'), // import built in node modules fs and path 
// //     path = require('path');

// // const app = express();
// // const { check, validationResult } = require('express-validator');


// // const cors = require('cors');
// // let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

// // app.use(cors({
// //   origin: (origin, callback) => {
// //     if(!origin) return callback(null, true);
// //     if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
// //       let message = 'The CORS policy for this application does not allow access from origin ' + origin;
// //       return callback(new Error(message ), false);
// //     }
// //     return callback(null, true);
// //   }
// // }));

// // bodyParser = require('body-parser'),
// // uuid = require('uuid');

// // app.use(express.static('public'));
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // let auth = require('./auth')(app);
// // const passport = require('passport');
// // require('./passport');

// // // create a write stream (in append mode)
// // // a ‘log.txt’ file is created in root directory
// // const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

// // // setup the logger
// // app.use(morgan('combined', { stream: accessLogStream }));














// const express = require('express'),
//     mongoose = require('mongoose'),
//     Models = require('./models.js'),
//     {check, validationResult} = require('express-validator');

// const app = express(); //use this variable to route HTTP requests and responses
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// const movies = Models.movie;
// const users = Models.user;

// //connects to local database. swap with .connect function below if needed.
// // mongoose.connect('mongodb://localhost:27017/svDB', { useNewUrlParser: true, useUnifiedTopology: true });

// //connects to MongoDB Atlas database
// mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const cors = require('cors');
// app.use(cors());

// let auth = require('./auth.js')(app); //(app) ensures Express is available in the .auth.js file
// const passport = require('passport');
// require('./passport.js');

// app.use(express.static('public'));














// // serve the “documentation.html” and any other files from the public folder
// app.get("/", (req, res) => {
//   res.send("Welcome to myFlix!");
// });

// //Read all movies
// app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await movies.find()
//   .then((movies) => {
//     res.status(201).json(movies);
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).send('Error: ' + err);
//   })
// });

// //Read one movie
// app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
//  await movies.findOne({Title: req.params.title})
//  .then((movie) => {
//   res.json(movie);
//  })
//  .catch((err) => {
//   console.error(err);
//   res.status(500).send('Error: ' + err);
//  })
// });

// //Read genre description
// app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await movies.findOne({ 'Genre.Name': req.params.genreName})
//   .then((movies) => {
//     res.json(movies.Genre);
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).send('Error: ' + err);
//   })
// });


// //Read director description
// app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await movies.findOne({ 'Director.Name': req.params.directorName})
//   .then((movies) => {
//     res.json(movies.Director);
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).send('Error: ' + err);
//   })
// });

// //create new user
// app.post ('/users',
// // Validation logic here for request
// //you can either use a chain of methods like .not().isEmpty()
// //which means "opposite of isEmpty" in plain english "is not empty"
// //or use .isLength({min: 5}) which means
// //minimum value of 5 characters are only allowed
// [
//   check('username', 'Username is required').isLength({min: 5}),
//   check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//   check('password', 'Password is required').not().isEmpty(),
//   check('email', 'Email does not appear to be valid').isEmail()
// ], async (req, res) => {

// // check the validation object for errors
//   let errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

//   let hashedPassword = users.hashPassword(req.body.password);
//   await users.findOne({ username: req.body.username }) // Search to see if a user with the requested username already exists
//     .then((user) => {
//       if (user) {
//       //If the user is found, send a response that it already exists
//         return res.status(400).send(req.body.username + ' already exists');
//       } else {
//         users
//           .create({
//             username: req.body.username,
//             password: hashedPassword,
//             email: req.body.email,
//             birthday: req.body.birthday
//           })
//           .then((user) => { res.status(201).json(user) })
//           .catch((error) => {
//             console.error(error);
//             res.status(500).send('Error: ' + error);
//           });
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('Error: ' + error);
//     });
// });

// //Update User Information
// app.put('/users/:Username', passport.authenticate('jwt', { session: false }), 
// // Validation logic here for request
// //you can either use a chain of methods like .not().isEmpty()
// //which means "opposite of isEmpty" in plain english "is not empty"
// //or use .isLength({min: 5}) which means
// //minimum value of 5 characters are only allowed
// [
//   check('username', 'Username is required').isLength({min: 5}),
//   check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//   check('password', 'Password is required').not().isEmpty(),
//   check('email', 'Email does not appear to be valid').isEmail()
// ], async (req, res) => {

// // check the validation object for errors
//   let errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }
//   // CONDITION TO CHECK ADDED HERE
//   if(req.user.username !== req.params.Username){
//       return res.status(400).send('Permission denied');
//   }
//   // CONDITION ENDS
//   await users.findOneAndUpdate({ username: req.params.Username }, {
//       $set:
//       {
//           username: req.body.username,
//           password: req.body.password,
//           email: req.body.email,
//           birthday: req.body.birthday
//       }
//   },
//       { new: true }) // This line makes sure that the updated document is returned
//       .then((updatedUser) => {
//           res.json(updatedUser);
//       })
//       .catch((err) => {
//           console.log(err);
//           res.status(500).send('Error: ' + err);
//       })
// });

// //Update New favorite movie
//   app.post('/Users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     await users.findOneAndUpdate({username: req.params.Username},
//       {$push: { favoriteMovies: req.params.MovieID}},
//     { new: true})
//     .then((updatedUser) => {
//       res.json(updatedUser);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
//   });

// //delete FavoriteMovie
// app.delete('/Users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await users.findOneAndUpdate({username: req.params.Username},
//     {$pull: { favoriteMovies: req.params.MovieID}},
//   { new: true})
//   .then((updatedUser) => {
//     res.json(updatedUser);
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).send('Error: ' + err);
//   });
// });

//   //Delete User
// app.delete('/Users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await users.findOneAndDelete({ username: req.params.Username})
//     .then((user) => {
//       if (!user) {
//         res.status(400).send(req.params.Username + ' was not found');
//       } else {
//         res.status(200).send(req.params.Username + ' was deleted.');
//       }
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error; ' + err);
//       });
//     });

//     const port = process.env.PORT || 8080;
//     app.listen(port, '0.0.0.0',() => {
//      console.log('Listening on Port ' + port);
//     });













const express = require('express'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    {check, validationResult} = require('express-validator');

const app = express(); //use this variable to route HTTP requests and responses
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const Movies = Models.Movie;
const Users = Models.User;

//connects to local database. swap with .connect function below if needed.
// mongoose.connect('mongodb://localhost:27017/svDB', { useNewUrlParser: true, useUnifiedTopology: true });

//connects to MongoDB Atlas database
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const cors = require('cors');
app.use(cors());

let auth = require('./auth.js')(app); //(app) ensures Express is available in the .auth.js file
const passport = require('passport');
require('./passport.js');

app.get("/", (req, res) => {
  res.send("Welcome to SpookyVibes!");
});

// serve the “documentation.html” and any other files from the public folder
app.use(express.static('public'));

// CREATE/POST to set up a new user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', [
  //input validation here
  check('Username', 'Username is required').notEmpty(),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').notEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {
  
  //check validation object for errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({Username: req.body.Username})//Query Users model to check if username from client already exists. If so, alert them.
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      Users
        .create({//if user does not exist, use Mongoose .create command to set up new user matching schema from models.js file
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => {res.status(201).json(user)})//callback sends a response and the new user to the client
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {//catch-all error-handler
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// Update a user's info, by username
/* We will expect JSON in this format
{
  Username: String,(required)
  Password: String,(required)
  Email: String,(required)
  Birthday: Date
}*/
app.put('/users/:Username', [
  //input validation here
  check('Username', 'Username is required').notEmpty(),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').notEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], passport.authenticate ('jwt', {session: false}), async (req, res) => {

  //check validation object for errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  //Condition to check that username in request matches username in request params
  if(req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied.');
  }
  //Condition ends, finds user and updates their info
  await Users.findOneAndUpdate({Username: req.params.Username}, {$set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  {new: true}) //This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

// CREATE/POST to add a movie to user favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate ('jwt', {session: false}), async (req, res) => {
  await Users.findOneAndUpdate({Username: req.params.Username}, {
    $push: {FavoriteMovies: req.params.MovieID}
  },
  {new: true})//This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err),
    res.status(500).send('Error: ' + err);
  });
});

// DELETE to remove movie from list of user favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate ('jwt', {session: false}), async (req, res) => {
  await Users.findOneAndUpdate({Username: req.params.Username}, {
    $pull: {FavoriteMovies: req.params.MovieID}
  },
  {new: true})//This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err),
    res.status(500).send('Error: ' + err);
  });
})

// DELETE to let user deregister
app.delete('/users/:Username', passport.authenticate ('jwt', {session: false}), async (req, res) => {
  await Users.findOneAndDelete({Username: req.params.Username})
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ/GET to return the full list of movies
app.get('/movies', passport.authenticate('jwt', {session: false}), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ/GET to return the details for single movie by title
app.get('/movies/:movieTitle', passport.authenticate ('jwt', {session: false}), async (req, res) => {
  await Movies.findOne({"Title": req.params.movieTitle})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ/GET to return the details for movie genre
app.get('/movies/genre/:genreName', passport.authenticate ('jwt', {session: false}), async (req, res) => {
  await Movies.findOne({"Genre.Name": req.params.genreName})
    .then((genre) => {//genre here refers to the document that was just read
      res.json(genre.Genre);//adding .Genre at the end returns just the Genre part of the movie object
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ/GET to return the details for movie director
app.get('/movies/director/:directorName', passport.authenticate ('jwt', {session: false}), async (req, res) => {
  await Movies.findOne({"Director.Name": req.params.directorName})
  .then((director) => {//director here refers to the document that was just read
    res.json(director.Director);//adding .Director at the end returns just the Director part of the movie object
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
})


  // listen for requests
  const port = process.env.PORT || 8080;
  app.listen(port, "0.0.0.0", () => {
    console.log("Listening on port" + port);
  });