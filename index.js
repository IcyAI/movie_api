
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'), // import built in node modules fs and path 
    path = require('path');

const app = express();

app.use(express.static('public'));

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

let topMovies = [
    {
        title: 'A space Odyssey',
    },
    {
        title: 'The Godfather',
    },
    {
        title: 'Raiders of the Lost Ark',
    },
    {
        title: 'There Will Be Blood',
    },
      {
        title: 'Pulp Fiction',
    },
      {
        title: 'Forrest Gump',
    },
      {
        title: 'Fight Club',
    },
      {
        title: 'Inception',
    },
      {
        title: 'The Matrix',
    },
      {
        title: 'Back to the Future',
    }
];

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/', (req, res) => {
    res.send('testing my code');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});