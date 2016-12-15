const mongoose = require('mongoose')

//album schema

const albumSchema = mongoose.Schema(
		{
		albumName: String,
		albumArt: String,
		albumArtist: String,
		albumUserName: String,
		albumGenre: String,
		albumId: String,
		albumArtistId: String,
		albumDateCreated: Date,
		albumDateAdded: Date,
		timeLength: Number,
		trackLength: Number
	}		
)

albumSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    albumName: this.albumName,
		albumArt: this.albumArt,
		albumArtist: this.albumArtist,
		albumUserName: this.albumUserName,
		albumGenre: this.albumGenre,
		albumId: this.albumId,
		albumArtistId: this.albumArtistId,
		albumDateCreated: this.albumDateCreated,
		albumDateAdded: this.albumDateAdded,
		timeLength: this.timeLength,
		trackLength: this.trackLength
  };
}


const Album = mongoose.model('Album', albumSchema);

module.exports = {Album};