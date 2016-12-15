angular.module('albumDetail',[])
.directive('mxAlbumDetail', ['ngAudio', 'browseTestData', '$routeParams', '$location', 'nowPlayingList', function(ngAudio, browseTestData, $routeParams, $location, nowPlayingList){
	return {
		restrict: 'E',
	  templateUrl: 'albumDetail/albumDetail.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "adc",
	  link: function(scope, element, attrs){
	  	window.scrollTo(0, 0)
	  },
	  controller: function(ngAudio){
	  	var adc = this

	  	//artist list
	  	adc.artists = browseTestData.artists
	  	//get artist and album name from routeparams
	  	browseTestData.currentArtistName = $routeParams.artist;
	  	browseTestData.currentAlbumName = $routeParams.album
	  	adc.currentArtistName = browseTestData.currentArtistName
	  	adc.currentAlbumName = browseTestData.currentAlbumName
	  	//search data for artist object
	  	
	  	browseTestData.currentArtist = adc.artists.filter(function(obj) {
    		return obj.artist.replace(/\s+/g, '-').toLowerCase() === adc.currentArtistName;
			})[0];
			adc.currentArtist = browseTestData.currentArtist;
			//search currentArtist for album object from url
			browseTestData.currentAlbum = adc.currentArtist.albums.filter(function(obj) {
    		return obj.albumTitle.replace(/\s+/g, '-').toLowerCase() === adc.currentAlbumName;
			})[0];
			adc.currentAlbum = browseTestData.currentAlbum

			console.log(nowPlayingList.nowPlayingChange)

			//for play button without clicking track
			nowPlayingList.queuedAlbum = adc.currentAlbum
			nowPlayingList.queuedArtist = adc.currentArtist
			nowPlayingList.queuedTrack = adc.currentAlbum.tracks[0]


			adc.playTrack = function(track, album, artist){
				nowPlayingList.nowPlayingTrack = track
				nowPlayingList.nowPlayingAlbum = album
				nowPlayingList.nowPlayingArtist = artist
				nowPlayingList.nowPlayingAlbumLength = album.tracks.length
				nowPlayingList.nowPlayingTrackNumber = track.trackNumber
				// tracknumber system needs improvemen
				//registers change
				nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange
			}







	  }
	}
}])

.filter('removeSpacesThenLowercase', function () {
  return function (text) {
  	console.log(text)
  	if (text){
	    var str = text.replace(/\s+/g, '-')
	    return str.toLowerCase()
	    }
	  }
})