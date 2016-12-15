const fs = require('fs')
const path = require('path')

uploadController = function() {};

uploadController.prototype.uploadFile = function(req, res) {
  // We are able to access req.files.file thanks to 
  // the multiparty middleware which parses http
  var file = req.files.file;
  console.log('INSIDE UPLOAD')
  console.log('logging data')
  console.log(req.body)

  //work with the file system here... check if artist folder exists
  //check if the album folder exists and then create
  //move the files from the artist temporary store upon PUBLISH and sort/convert then add those to the mp3 version
  

  var tmp_path = file.path;

  var target_path = path.join(__dirname, '/file-system/artists/' + file.name)

  var src = fs.createReadStream(tmp_path);

  var dest = fs.createWriteStream(target_path);
  
  src.pipe(dest);
  src.on('end', function() { res.end(); });
  src.on('error', function(err) { res.end(); });

}

module.exports = new uploadController();