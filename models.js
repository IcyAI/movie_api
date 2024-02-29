
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// let movieSchema = mongoose.Schema({
//     Title: {type: String, required: true},
//     Description: {type: String, required: true},
//     Genre: {
//         Name: String,
//         Description: String
//     },
//     Director: {
//         Name: String,
//         Bio: String,
//         Birth: String,
//         Death: String
//     },
//     ImagePath: String,
//     Featured: Boolean
// });

// let userSchema = mongoose.Schema({
//     username: {type: String, required: true},
//     password: {type: String, required: true},
//     email: {type: String, required: true},
//     birthday: Date,
//     favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'movies'}]
// });

// userSchema.statics.hashPassword = (password) => {
//     return bcrypt.hashSync(password, 10);
//   };
  
//   userSchema.methods.validatePassword = function(password) {
//     return bcrypt.compareSync(password, this.Password);
//   };


// let movie = mongoose.model('movie', movieSchema);
// let user = mongoose.model('user', userSchema);

// module.exports.movie = movie;
// module.exports.user = user;




const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    Title: {type: String, required:true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Bio: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: Date,
    },
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//Hash the submitted passwords
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

//Compare submitted hashed passwords to hashed passwords stored in the DB
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

//Create the models (will create collections for movies and users)
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

//Export the modules (used in index.js)
module.exports.Movie = Movie;
module.exports.User = User;