const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const mv = require('mv')
const mkdirp = require('mkdirp-promise')
const {Artist} = require('../artistModel');

createAlbum = function() {};




createAlbum.prototype.uploadFile = function(req, res) {
  var file = req.files.file;
  //id for storage
  const albumId = uuid.v4()

  console.log('received request')

  console.log(Artist.findOne({artistName: req.body.albumArtist}))


  //function to add album folders
  makeDirs = function(artistId ,callback){
    //create directories using artistId
    const albumDirectory = '/Users/maxfrecka/Desktop/PROJECTS/doga-forum/backend/file-system/artists/'+artistId+'/albums/'+albumId
    const albumImages = albumDirectory + '/images/'
    const albumWav = albumDirectory + '/wav/'
    const albumMp3 = albumDirectory + '/mp3/'
    console.log('make directory:')
    console.log(albumImages)
    //create folders then use callback
    mkdirp(albumDirectory, function (err) {
      if (err) console.error(err)
      else mkdirp(albumImages, function (err) {
        if (err) console.error(err)
        else mkdirp(albumWav, function (err) {
          if (err) console.error(err)
          else mkdirp(albumMp3, function (err) {
            if (err) console.error(err)
            //pass artistId into callback for addFile function!
            else callback(artistId)
          })
        })
      })    
    })
  }

  addFile = function(artistId){
    var tmp_path = file.path;
    //adds image to new folder
    var target_path = path.join(__dirname, '/../file-system/artists/'+artistId+'/albums/'+ albumId + '/images/' + file.name)
    
    console.log('SAVING THE IMAGE:')
    console.log(target_path)
    
    var src = fs.createReadStream(tmp_path);
    console.log('attempting file write')
    console.log(src)
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
  }

  //need to get the artist Id to insert into files
  //callbackA should be to insert the album into the database with results of the query
  //callbackB should add the folders, save the album cover image, and then save the tracks/convert using more future callbacks
  
  var artistId = undefined
  getArtistId = function(callbackA, callbackB) {
    var query = Artist.findOne({ 'artistName': req.body.albumArtist })
    query.exec(function(err, Artist) {
      if (err) {
        console.log('asdf')
      } else {
        artistId = Artist.artistId
        //adds to database using addalbumtodatabase and artistId
        callbackA(artistId)
        //makes folders using artistId, then inserts file using addFile
        callbackB(artistId, addFile)
      }
    })
  }

  addAlbumToDatabase = function(artistId){
    console.log('inside add to database')
    console.log(artistId)
    const dateAdded = new Date()
    //defines path for the album art
    const albumArt = artistId + '/albums/' + albumId + '/images/' + file.name
    Artist
      .findOneAndUpdate({artistName: req.body.albumArtist}, 
        {$push: 
        {albums:
          {albumName:req.body.albumName, 
          albumUserName: req.body.albumUserName, 
          albumArtist: req.body.albumArtist,
          albumArt: albumArt,
          albumId: albumId,
          dateAdded: dateAdded
          }
        }
      })
      .then(artist => res.status(204).end())
      .catch(err => res.status(500).json({message: 'Internal server error'}))
  }

  //arguments are placed in functions within getArtistId definition! this triggers everything!
  getArtistId(addAlbumToDatabase, makeDirs)







  

}

module.exports = new createAlbum();