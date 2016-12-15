const mongoose = require('mongoose')

//artist schema

const artistSchema = mongoose.Schema({
	artistName: {type: String, required: true},
	userName: {type: String, required: true},
	artistBio: String,
	artistImage: String,
	artistGenre: {type: String, required: true},
	artistId: {type: String, required: true},
	albums: [
		{
		albumName: String,
		albumArt: String,
		albumArtist: String,
		albumUserName: String,
		albumGenre: String,
		albumId: String,
		dateCreated: Date,
		dateAdded: Date,
		timeLength: Number,
		tracks: [
			{
			trackName: String,
			trackNumber: Number,
			trackArtist: String,
			trackArt: String,
			trackId: String,
			trackUserName: String,
			trackAlbum: String,
			trackGenre: String,
			trackWavSource: String,
			trackMp3Source: String
			}
		]
		}
	]
})

artistSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    artistName: this.artistName,
    artistGenre: this.artistGenre,
    userName: this.userName,
    artistImage: this.artistImage,
    albums: this.albums
  };
}


const Artist = mongoose.model('Artist', artistSchema);

module.exports = {Artist};