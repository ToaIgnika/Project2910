// Initialize firebase. Requires the config from the firebase
// CHANGE THE CONFIG CONTENT
function initFirebaseApp() {
  var config = {
    apiKey: "AIzaSyCCgzdNYYtJPwX6GpeG64VWiCKRVlneYBk",
    authDomain: "mytestproject-b1a4e.firebaseapp.com",
    databaseURL: "https://mytestproject-b1a4e.firebaseio.com",
    projectId: "mytestproject-b1a4e",
    storageBucket: "mytestproject-b1a4e.appspot.com",
    messagingSenderId: "697969833462"
  };
  firebase.initializeApp(config);
}

// node getter. returns as an reference object.
function getNodeAt(nLocation) {
  return firebase.database().ref().child(nLocation);
}

// displays user data from database from a given user ID
function displayUserInfo(user) {
	const profile = getNodeAt('users/' + user);

	// for debug/testing
	//window.alert(user + " | " + profile);

	profile.once("value")
		.then(function(snapshot) {

			// for debug/testing
			//window.alert(snapshot.key);

			snapshot.forEach(function(field) {
				var key = field.key;
				var val = field.val();

				// for debug/testing
				//window.alert(key + " : " + field.val());

				// put the output somewhere useful here
				var insert = document.getElementById(key);
				if (insert != null) {
					if (insert.tagName.toLowerCase() == "img") {
						insert.setAttribute("src", val);
					} else {
						insert.innerText = val;
					}
				}
			});
		});
}

function post() {
  var post_item = document.getElementById('ps_bar').value,
        url = 'http://f2e.ca/post.html?=' + encodeURIComponent(post_item);
    document.location.href = url;
  window.location = url;
}

function search() {
  var post_item = document.getElementById('ps_bar').value,
        url = 'http://f2e.ca/search.html?=' + encodeURIComponent(post_item);
    document.location.href = url;
  window.location = url;
}

function uidBond(uidOne, uidTwo) {
  if (uidOne > uidTwo) {
    return uidTwo + uidOne;
  } else {
    return uidOne + uidTwo;
  }
}
