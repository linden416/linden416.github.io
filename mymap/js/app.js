//Predefined list of 10 locations in the neighborhood.
//Each location specifies name, address, and the Google Places PlaceId.
//The PlaceId was established searching Google Places API using each 
//location in list. It's the equivalent to longitude and latitude.
var predefinedlocations = [ 	
	{
		place: 'Atlantic Station',
		PlaceId: 'ChIJVbS_XvcE9YgRBnYS_RrLgHg',
		address: 'Atlantic Station, Atlanta, GA, USA',
		visibleStatus: true
	},
	{
		place: 'CNN Center',
		PlaceId: 'ChIJd_c_Y4AD9YgRHw-SJKG4z4k',
		address: '190 Marietta Street Northwest, Atlanta, GA 30303, United States',
		visibleStatus: true
	},
	{
		place: 'Fox Theatre',
		PlaceId: 'ChIJ28DQdm8E9YgRnsZ4YZ94nRo',
		address: '660 Peachtree Street Northeast, Atlanta, GA 30308, United States',
		visibleStatus: true
	},
	{
		place: 'Georgia Aquarium',
		PlaceId: 'ChIJGQT0RX4E9YgR3EqvqXZw1_4',
		address: '225 Baker Street Northwest, Atlanta, GA 30313, United States',
		visibleStatus: true
	},
	{
		place: 'Georgia Tech',
		PlaceId: 'ChIJ40_D64oE9YgRD8XYOj7QKrU',
		address: 'North Ave NW, Atlanta, GA 30332, United States',
		visibleStatus: true
	},
	{
		place: 'Georgia World Congress Center',
		PlaceId: 'ChIJiadaA4AD9YgRd4ebM1r2cgA',
		address: '285 Andrew Young International Blvd NW, Atlanta, GA 30303',
		visibleStatus: true
	},
	{
		place: 'High Museum of Art',
		PlaceId: 'ChIJf8bUMEUE9YgR8nttKmmxaPc',
		address: '1280 Peachtree Street Northeast, Atlanta, GA 30309, United States',
		visibleStatus: true
	},
	{
		place: 'Piedmont Park',
		PlaceId: 'ChIJlxti7TgE9YgRSjhV1kb_mbY',
		address: '1342 Worchester Drive Northeast, Atlanta, GA 30306, United States',
		visibleStatus: true
	},
	{
		place: 'Woodruff Arts Center',
		PlaceId: 'ChIJf8bUMEUE9YgRI5s3hH594AY',
		address: '1280 Peachtree Street Northeast, Atlanta, GA 30309, United States',
		visibleStatus: true
	},
	{
		place: 'World of Coca-Cola',
		PlaceId: 'ChIJ8yjI7H4E9YgRyacfAZqyAUQ',
		address: '121 Baker St NW, Atlanta, GA 30313',
		visibleStatus: true
	}
];

//Defined neighborhood location
var Atlanta = {
	latitude: 33.780423,
	longitude: -84.3908896,
	zoom: 14
};

//Hash Tables with key equating to LocationList.place
var markersHash = {};
var wikiHash = {};
var flickrHash = {};
var locationHash = {};

//Google objects supporting map, markers, and infowindows
var map = {};
var infowindow = {};

//=View Model Data and Operations on UI=======================================
var ViewModel = function() {
	var self = this; //self represents the ViewModel do this when you want to access the outer ViewModel
	
	//Search Input UI
	self.searchPattern = ko.observable();

	//Key Locations List UI
	self.keyLocationsList = ko.observableArray([]);

	//Load predefined neighborhood locations to Key Location List
	predefinedlocations.forEach(function(location){
		self.keyLocationsList.push( new Location(location));
	});

	//-Key Locations Click and Mouseover Events-------------------------
	self.displayLocationInfoWindow = function(clickedLocation) {
    	//Produce the html markup for the InfoWindow to display
    	//information about the Location as found from Wikipedia and Flickr
    	infowindow.setContent( buildInfoWindowContent( clickedLocation.place() ) );
     	infowindow.open(map, markersHash[clickedLocation.place()]);
	};
	self.displayLocationTitle = function(clickedLocation) {
	   	//Produce the html markup for the InfoWindow to display
    	//information about the Location as found from Wikipedia and Flickr
    	infowindow.setContent( clickedLocation.place() );
     	infowindow.open(map, markersHash[clickedLocation.place()]);
	};
	
	//-Search UI Events-------------------------------------------------
	self.searchLocations = function() {
		if (self.searchPattern() === undefined) {
			return;
		}

		//Traverse the list of locations and match to search pattern
		//Set the observablearray property 'visibleStatus' to true on 
		//matches, false on mismatch
		for (var i = 0, len = self.keyLocationsList().length; i < len; i++) {
        	var location = self.keyLocationsList()[i];

			if(self.searchPattern().length === 0) {		//Pattern matches location
				location.visibleStatus(true);
				markersHash[location.place()].setVisible(true);
			}
			else{
				var lowcasePattern = self.searchPattern().toLowerCase();
				var lowcasePlace = location.place().toLowerCase();
				if (lowcasePlace.indexOf(lowcasePattern) === 0) {
					location.visibleStatus(true);
					markersHash[location.place()].setVisible(true);
				}
				else {
					location.visibleStatus(false);
					markersHash[location.place()].setVisible(false);
				}
			}
		}
	};

	try {
		//-Call Third Party APIs--------------------------------------------
		getGoogleMap_n_Markers();	//Get Google Map for neighborhood and markers for each location
		getFlickrPhotos();			//Get Flickr photos for each picture in location
		getWikiInformation();		//Wiki each location
	}
	catch (e) {
		console.log( "Exception processing APIs! " + e );
		$('#statusLine').append("<span>Page exception occurred accessing APIs!&nbsp;&nbsp;</span>");
	}

	$('#searchId').focus(); 	//Set focus
};

//=Data Model Object==========================================================
var Location = function(data) {
	this.place = ko.observable(data.place);
	this.visibleStatus = ko.observable(data.visibleStatus);
};

//============================================================================
ko.applyBindings(new ViewModel());


//============================================================================
//=Access external resources==================================================
//============================================================================

//=Google Map and Markers=====================================================
//This function is called after the Window 'Load' has been completed.
//Using the predefined LocationsList which identifies 10 locations,
//Get the overall Google Map, Google Marker for each location, and 
//call the Wikipedia and Flickr APIs to access information and photos
//for each location.
function getGoogleMap_n_Markers() {
	console.log("getGoogleMap_n_Markers");
	var zoomLevel = Atlanta.zoom;

	var maxWidth = $('#DummyDivId').css('max-width');
	if (maxWidth === '320px') {
		zoomLevel = 13; //Lower the zoom for small devices
	}

	//Retreive the main map of the Atlanta 'neighborhood' from Google Maps API
    map = new google.maps.Map(document.getElementById('map-canvas'), {
    	center: new google.maps.LatLng(Atlanta.latitude, Atlanta.longitude),
    	zoom: zoomLevel
	});

    infowindow = new google.maps.InfoWindow();
	
	//Assign a 'CloseClick' event to the InfoWindow
	google.maps.event.addListener(infowindow, 'closeclick', function() {
		//Recenter the map after closing the info window
	  	map.setCenter(new google.maps.LatLng(Atlanta.latitude, Atlanta.longitude));
	  	map.setZoom(zoomLevel);
	});

	var service = new google.maps.places.PlacesService(map);

	for(var i=0; i < predefinedlocations.length; i++)
	{
		//Create InfoWindow Content for each place
 		var markUp = "<div id='locationId'><h3>" + predefinedlocations[i].place + "</h3>";
 		markUp += "<p id='address'>" + predefinedlocations[i].address + "</p></div>";
 		locationHash[predefinedlocations[i].place] = markUp;

		var request = {
	    	placeId: predefinedlocations[i].PlaceId
	  	};

	  	//Call the Google Places API to get the Marker for each LocationList place
	  	//This call is asynchronous defining the callback to manipulate response.
		service.getDetails(request, getMarkerDetailsCallback);
	}

	//Google Places callback function
	//Process the response which is a Map Marker if successful
	//Store marker in hash table
	function getMarkerDetailsCallback(place, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
	    	//Create the Marker for the given location
	    	var marker = new google.maps.Marker({
	        	map: map,
	        	position: place.geometry.location
	    	});
	    	//Massage the location name produced by Google Places API to match up to the
	    	//predefined locations list. The following three locations are different
	    	//when searching in Wiki and Flickr. This data massage keeps it consistent.
	    	var markerName = place.name;
	    	if (place.name.indexOf('CNN') > -1){
	    		markerName = 'CNN Center';
	    	}
	    	else if (place.name.indexOf('Fox') > -1){
	    		markerName = 'Fox Theatre';
	    	}
	    	else if (place.name.indexOf('Georgia Institute of Technology') > -1){
	    		markerName = 'Georgia Tech';
	    	}
	    	//Save marker to hashtable
        	markersHash[markerName] = marker;
	    
		    //Assign a 'Click' event to the Marker which will display a complete detailed InfoWindow
		    google.maps.event.addListener(marker, 'click', function() {
		    	//Produce the html markup for the InfoWindow to display
		    	//information about the Location as found from Wikipedia and Flickr
		    	infowindow.setContent( buildInfoWindowContent(markerName) );
	         	infowindow.open(map, marker);
	      	});

		    //Assign a 'Click' event to the Marker which will display a brief location title in InfoWindow
		    google.maps.event.addListener(marker, 'mouseover', function() {
		    	//Just display the location name ONLY
				infowindow.setContent(markerName);
		    	infowindow.open(map, marker);
	      	});

	    }
	    else{
    		console.log( "Failed to access Google Place Marker!" );
    		$('#statusLine').append("<span>Failed to access a Google Map Place Marker;&nbsp;&nbsp;</span>");
	    }
	}
}

//=Flickr Search==============================================================
//Using student's (me) registered Flickr api key and gallery of selected images
//of each location from the predetermined location list. Retrieve from Flickr
//the information for each photo in the gallery and build the URL to bring in
//the image for the Map Marker's content infowindow.
function getFlickrPhotos(){
	console.log("getFlickrPhotos");
	//Invoke Flicker API Method Galleries.getPhotos
	var flickerGetPhotosURL = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos";
	//Use students' api key, and Gallery Id
	var parms = {
		api_key: '77b04d2ba00b81ecf907fb0c3c7498b0',
		gallery_id: '131654409-72157649533974933',
		format: 'json',
		nojsoncallback: '1'
	};
	//Get all the meta information about the photos from the gallery
	var jresult = $.getJSON(flickerGetPhotosURL, parms )
  		.done(function(data) {
  			if (data.stat === "ok"){
	    		for(var i=0; i < data.photos.total; i++){
	    			var farmId = data.photos.photo[i].farm;
	    			var serverId = data.photos.photo[i].server;
	    			var photoId = data.photos.photo[i].id;
	    			var secretId = data.photos.photo[i].secret;
	    			var title = data.photos.photo[i].title;

	    			//Flicker Static Photo URL Format:
	    			//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
	    			var photoURL = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + photoId + "_" + secretId + ".jpg";

	    			//Using the title for each photo, match to the predefined locations list
	    			//comparing to each place. For each match, add the Flicker URL nestled
	    			//in html markup to the Flicker hash table.
	    			title = title.toLowerCase();
					for(var j=0; j < predefinedlocations.length; j++)
					{
						var tempPlace = predefinedlocations[j].place;
						tempPlace = tempPlace.toLowerCase();
						if (title.indexOf(tempPlace) > -1)
						{
							//Create markup with the img tag using the URL
							var tempURL = "<div id='flickrDiv'><hr><p id='flickrTagname'>Flickr</p>";
							tempURL += "<img id='flickrImg' src='" + photoURL + "' alt='Flickr Image'></img>";
							tempURL += "</div>";

							//Add to Flicker hash table
							flickrHash[predefinedlocations[j].place] = tempURL;

							j = predefinedlocations.length; //trip for loop
						}
					}
	    		}
    		}
  		})
  		.fail(function() {
    		console.log( "Failed to access flickr.galleries.getPhotos!" );
    		$('#statusLine').append("<span>Page failed to access Flickr Services;&nbsp;&nbsp;</span>");
  		});	
}

//=Wikipedia Search===========================================================
//Using the predefined LocationsList, query Wikipedia for the top most popular
//link found for each location. Save the title, summary, and link to a hash table.
function getWikiInformation() {
	console.log("getWikiInformation");
	//Establish a timeout for Wikipedia calls
	var wikiRequestTimeout = setTimeout(function(){
    	console.log("Failed to access Wikipedia");
   		$('#statusLine').append("<span>Page timed out accessing Wikipedia Services;&nbsp;&nbsp;</span>");
	}, 8000); //Issue this statement after 8 seconds

	//For every predefined location, search Wikipedia
	for(var i=0; i < predefinedlocations.length; i++)
	{
		var searchLocationStr = predefinedlocations[i].place;

		//Massage the 'Fox Theatre' location by appending the map's city for successful Wiki search
		//To be more specific, there are a number of Fox Theatres in Wiki, to get the one in Atlanta,
		//The suffix was required.
		if (searchLocationStr === 'Fox Theatre'){
			searchLocationStr = predefinedlocations[i].place + " (Atlanta)";
		}

		//Asynchronous call to Wikipedia
		$.ajax({
		    url: 'http://en.wikipedia.org/w/api.php',
		    data: {
		        action: 'opensearch',
		        format: 'json',
		        redirects: 'resolve',
		        search: searchLocationStr
		    },
		    dataType: 'jsonp',
		    jsoncallback: ''
		})
			//When call is successful do this function which extracts the Title, Summary, and Link
			//to the Wiki page found. Save this information to a hash table.
			.done(function( jsondata ) {
		    	var locName = jsondata[0];
	            var title = jsondata[1][0];
	            var url = jsondata[3][0];
	            var summary = jsondata[2][0];
		        var wikiLink = "<div id='wikiId'><hr><p id='wikiTagname'>Wikipedia</p>";
		        wikiLink += "<a id='wikiLink' href='" + url + "'>" + title + "</a><p id='wikiSummary'>" + summary + "</p></div>";

				//Set back 'Fox Theatre' to original location place value (ie remove '(Atlanta)' suffix)
				if (locName.indexOf('(Atlanta)') > 1) {
					locName = locName.substring(0, locName.indexOf(' (Atlanta)') );
				}

				//Add to hash table
				wikiHash[locName] = wikiLink;

		        //Turn off the setTimeout timer, the request was successful
		        clearTimeout(wikiRequestTimeout);
		    })
		    .fail(function(){
				console.log("An exception occurred accessing Wikipedia");
    			$('#statusLine').append("<span>Page failed to access Wikipedia Services;&nbsp;&nbsp;</span>");
			})
			.always(function(){
				//console.log("");
			});
	}
}

//Build Google Marker InfoWindow Content=====================================
//Using all the hash tables for Flickr, Wiki, and defined locations, assemble
//the markup used for displaying an informative Google Marker InfoWindow.
function buildInfoWindowContent(locationName){
	console.log("buildInfoWindowContent");
	var markUp = "<div id='contentInfo'>";
	markUp += locationHash[locationName];
	//If hash table does not contain an entry for the given location, then indicate it was not found.
	if (flickrHash[locationName] === undefined) {
		markUp += "<div id='flickrDiv'><hr><p id='flickrTagname'>Flickr</p><p>Photo not found</p></div>";
	}
	else
	{
		markUp += flickrHash[locationName];
	}
	//If hash table does not contain an entry for the given location, then indicate it was not found.
	if (wikiHash[locationName] === undefined) {
		markUp += "<div id='wikiLink'><hr><p id='wikiTagname'>Wikipedia</p><p>Location not found</p></div>";
	}
	else
	{
		markUp += wikiHash[locationName];
	}	
	markUp += "</div>";
	return markUp;
}

//Window 'ReSize' Event======================================================
$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 10;
    $('#map-canvas').css('height', (h - offsetTop));
}).resize();
