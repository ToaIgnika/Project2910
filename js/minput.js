// failed.", it means you probably did not give permission for the browser to
// locate you.
initFirebaseApp();

var map, infoWindow, marker, dicks;

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // TODO control the DB interaction functions
    userKey = firebaseUser.uid;
    //const wrap = document.getElementById('body_wrap');
    //wrap.classList.remove('hide');
  } else {
    window.location = "index.html";
  }
});


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;


  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      marker = new google.maps.Marker({
        map:map,
        draggable: true,
        position: pos
      });
      dicks = marker.getPosition();
      google.maps.event.addListener(marker, 'dragend', function (event) {
        dicks = this.getPosition();

      });
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
  function pushMarker(){
    var user = firebase.auth().currentUser.uid;
    var updateLoc = {};
    updateLoc['/users/' + user.uid + '/location/'] = dicks;
    firebase.database().ref().update(updateLoc);
  }
