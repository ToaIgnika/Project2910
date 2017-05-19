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

		map.data.loadGeoJson('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson');
 
		
     }