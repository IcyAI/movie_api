
// const passport = require('passport'),
//  LocalStrategy = require('passport-local').Strategy,

//  Models = require('./models.js'),
//  passportJWT = require('passport-jwt');

//  let users = Models.user,
//     JWTStrategy = passportJWT.Strategy,
//     ExtractJWT = passportJWT.ExtractJwt;

//     //checks username when logging in
// passport.use(
//     new LocalStrategy(
//         {
//             usernameField: 'username',
//             passwordField: 'password',
//         },
//     async  (username, password, callback) => {
//         console.log(`${username} ${password}`);
//         await users.findOne({username: username})
//         .then((user) => {
//             if(!user) {
//                 console.log('incorrect username');
//                 return callback(null, false, {
//                     message: 'Incorrect username or password.',
//                 });
//             }
//             if (!user.validatePassword(password)) {
//                 console.log('incorrect password');
//                 return callback(null, false, { message: 'Incorrect password.' });
//               }
//             console.log('finished');
//             return callback(null, user);
//         })
//         .catch((error) => {
//             if (error) {
//                 console.log(error);
//                 return callback(error);
//             }
//         })
//     }
//     )
// );

// //checks JWT on each server request
// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.secretKey},
//     async (jwtPayload, callback) => {
//         return await users.findById(jwtPayload._id)
//         .then((user) => {
//             return callback(null, user);
//         })
//         .catch((error) => {
//             return callback (error)
//         });
//     }));







const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    //passport-jwt.Strategy implements a JWT authentication strategy for Passport. It requires a secret key to verify the JWT and checks for the JWT in the header
    ExtractJWT = passportJWT.ExtractJwt;
    //passport-jwt.ExtractJwt is a utility that extracts the JWT from incoming requests. Specifies where and how Passport should look for the JWT.

//Takes username and password from request body and use Mongoose findOne to determine if user exists
passport.use(
    new LocalStrategy(
        {
            usernameField: 'Username',
            passwordField: 'Password',
        },
        async (username, password, callback) => {
            console.log(`${username} ${password}`);
            await Users.findOne({Username: username})
            .then((user) => {
                if (!user) {
                    console.log('incorrect username');
                    return callback(null, false, {//comes back false if user does not exist
                        message: 'Incorrect username or password.',
                    });
                }
                if (!user.validatePassword(password)) {//if hashed password does not match the one stored in the DB
                    console.log('incorrect password');
                    return callback(null, false, {message: 'Incorrect password.'});
                }
                console.log('finished');
                return callback(null, user);//returns user if they exist
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                    return callback(error);
                }
            })
        }
    )
);

//Authenticate users based on JWT submitted with their request.
passport.use(new JWTStrategy ({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),//JWT is extracted from HTTP request header
    secretOrKey: process.env.secretKey//use secret key to verify signature of the JWT (ensure client is who it says it is and JWT has not been altered)
}, async (jwtPayload, callback) => {//take the object literal of the decoded JWT payload as a parameter
    return await Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));