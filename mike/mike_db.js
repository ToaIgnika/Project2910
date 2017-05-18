// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCgzdNYYtJPwX6GpeG64VWiCKRVlneYBk",
  authDomain: "mytestproject-b1a4e.firebaseapp.com",
  databaseURL: "https://mytestproject-b1a4e.firebaseio.com",
  projectId: "mytestproject-b1a4e",
  storageBucket: "mytestproject-b1a4e.appspot.com",
  messagingSenderId: "697969833462"
};
firebase.initializeApp(config);

// create reference to DB
const db = firebase.database();

// get user key
var userKey;

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    userKey = firebaseUser.uid;
	} else {
		console.log("not logged in");
		window.location = "index.html";
	}
});

// log user in using facebook
var fbToken;

function facebookLogin(){
	// get FB credentials
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.addScope('user_friends');
	provider.addScope('email');
	provider.setCustomParameters({
		'display': 'popup'
	});
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
		var fbToken = result.credential.accessToken;
    }
	
    // The signed-in user info.
    var user = result.user;
	
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
    // ...
	});
	
	// return the new user object
	return user;
}

// add user info to our DB
function updateUserInfo(fbToken){
	db.ref('/').set({
		//email: fbToken.get emailz,
		//profile_picture: fbToken.get picturz
	})


	FB.api('me/friends', function(response) {
		if(response.error == null){
			var friends = response.data;
			var len = friends.length;
			
			for(i = 0; i < len; i++){
				var friend = FB.api(friends[i].id, function(response) {
					
				}
				db.ref('friends/').set({
						
				})
			}
		}			
	})
}























