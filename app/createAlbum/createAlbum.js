angular.module('createAlbum',['ngFileUpload'])
.directive('mxCreateAlbum', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', 'addAlbumData', '$location', '$window', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload, addAlbumData, $location, $window){
	return {
		restrict: 'E',
	  templateUrl: 'createAlbum/createAlbum.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "calbc",
	  
	  link: function(scope, element, attrs){
	  	//artist name that album is for
	  	scope.artistEditName = addAlbumData.currentAlbumArtistEdit
	  	scope.albumName = ''

	  	//need array of track information
	  	scope.tracks = new Array()
	  	//funtion to add new information to ng-repeat
	  	scope.addNewTrack = function(){
	  		trackNumber = scope.tracks.length+1
	  		scope.tracks.push({trackNumber: trackNumber, trackName: '', trackFile: trackFile})
	  		console.log(scope.tracks)

	  	}







		  scope.submitAlbum = function() {
	  		console.log(scope.albumImageFile)
	      if (scope.form.albumImage.$valid && scope.albumImageFile) {
	        scope.uploadAlbumArt(scope.albumImageFile)
	      }
   	 	}
   	 	//starter function for adding album
   	 	//will hit that API
   	 	//adds album name folder, wav/mp3, and images folder
   	 	//adds album to artist in database
   	 	//should RETURN A CALLBACK afterward, by taking a callback!
	  	scope.username = 'TEST USERNAME'

	  	//file is inserted above into the function in submitAlbum()
	  	scope.uploadAlbumArt = function (file) {
	  		const url = '/../api/createAlbum'
        Upload.upload({
            url: '/../api/createAlbum',
            data: {file: file, albumUserName: scope.username, albumArtist: scope.artistEditName, albumName: scope.albumName},
            file: file
        }).then(function (res) {
            console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data)
            //CALL BACK FUNCTION SHOULD BE FIRED HERE, TO UPLOAD TRACKS!
        }, function (res) {
            console.log('Error status: ' + res.status)
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name)
        })
	    }

	    /*scope.uploadAlbumTrack = function(file) {
	    	const url = '/../api/createTracks'
        Upload.upload({
            url: '/../api/createTracks',
            data: {file: file, albumUserName: scope.username, albumArtist: scope.artistName, albumName: scope.albumName},
            file: file
        }).then(function (res) {
            console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data)
        }, function (res) {
            console.log('Error status: ' + res.status)
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name)
        })
	    }

	    }
*/



	  },

	  controller: function(){
	  }
	}
}])



.factory('addAlbumData', function(){
	addAlbumData = {}

	//stores current albumArtist being edited
	addAlbumData.currentAlbumArtistEdit = undefined

	addAlbumData.setAlbumArtistEdit = function(artist){
		addAlbumData.currentAlbumArtistEdit = artist
		console.log('inside add album data funct')
		console.log(addAlbumData.currentAlbumArtistEdit)

	}


	return addAlbumData
})
