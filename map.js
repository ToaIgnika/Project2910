	// Create a map variable
     var map;
     // Function to initialize the map within the map div
     function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 40.74135, lng: -73.99802},
         zoom: 14
       });
	    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(initialLocation);
         });
     }
       // Create a single latLng literal object.
       var singleLatLng = {lat: 49.248499, lng: -123.001375};
       // TODO: Create a single marker appearing on initialize -
       // Create it with the position of the singleLatLng,
       // on the map, and give it your own title!
	   var marker = new google.maps.Marker({
		position: singleLatLng,
		map: map,
		title: 'JustinMarker',
		draggable: true
		});

       // TODO: create a single infowindow, with your own content.
       // It must appear on the marker
	   var infowindow = new google.maps.InfoWindow({
		content: marker.getPosition().toString()
		});
		
		
       // TODO: create an EVENT LISTENER so that the infowindow opens when
       // the marker is clicked!
	   marker.addListener('click', function() {
			infowindow.setContent(marker.getPosition().toString());
			infowindow.open(map, marker);
		});
		
     }