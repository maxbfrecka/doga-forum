'use strict';
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: __dirname+'/backend/file-system/artists'})
const fs = require('fs')
const multiparty = require('multiparty')

//set up database
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./backend/config');
const {Artist} = require('./backend/artistModel');

//file upload
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart(),
// file upload
uploadController = require('./backend/uploadController');
createArtist = require('./backend/createArtist');
createAlbum = require('./backend/uploaders/createAlbum');
const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json());






//experiments with POSTMAN primarily
app.get('/artists/:artistName', (req, res) => {
  Artist
    .findOne({artistName: req.params.artistName})
    .exec()
    .then(artist =>res.json(artist.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

//[{albumName: "Groadus", albumArtist: req.params.artistName, albumGenre: "hardcorebreaks"}]
app.put('/artists/:artistName', (req, res) => {
  Artist
    .findOneAndUpdate({artistName: req.params.artistName}, {$push:   {albums:{albumName:"okokok"} }       })
    .then(artist => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});





//following above experiment, implement here
app.post('/api/createAlbum', multipartyMiddleware, createAlbum.uploadFile)















app.put('/api/createTracks', (req, res) => {
  Artist
    .findOneAndUpdate({artistName: req.body.artistName}, {$push:   {albums:{albumName:"okokok"} }       })
    .then(artist => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});





app.get('/', (req, res) => res.sendFile(path.join(__dirname, './app', 'index.html')))
//uploads image file, create folders
app.post('/api/createArtist', multipartyMiddleware, createArtist.uploadFile)
//get artists for page
app.get('/api/getArtists', (req, res) => {
  Artist
    .find()
    //can limit
    .limit(40)
    // `exec` returns a promise
    .exec()
    // success callback: for each restaurant we got back, we'll
    // call the `.apiRepr` instance method we've created in
    // models.js in order to only expose the data we want the API return.
    .then(artists => {
      res.json({
        artists: artists.map(
          (artist) => artist.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});









mongoose.connect('mongodb://maxbfrecka:Shug1234@ds133398.mlab.com:33398/mxforum')

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`))