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

// facebook signin through the redirect
function signInFlow() {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_friends');
  provider.addScope('email');
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithRedirect(provider);
}

//TODO getRedirectResult function handler
function signInFlowHandle() {
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      var friendPath = ('/me/friends?access_token=').concat(token);
      FB.api(
        friendPath,
        'GET',
        {},
        function(response) {
          console.log("hello");
          fbObject = response;
        }
      );
      console.log("world");
      for (var i = 0; i < respons.data.length; i++) {
        alert(response.data[i].name + " " + response.data[i].id);
    }
    }
    // The signed-in user info.
    var user = result.user;
  })
}

// onAuthStateChanged
// return null if the user is not logged in
// return user UID if user is logged in
// TODO rethink the model
function loginPageHandler() {
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      //TODO render the needed page here
        return firebaseUser.uid;
    } else {
      //TODO render the login page
        return null;
    }
  })
}

// node getter. returns as an reference object.
function getNodeAt(nLocation) {
  return db.ref().child(nLocation);
}


/* Checks if the user exist or not in the db.
If not, create a user in the db.
if yes, no changes made.
TODO: update info, i.e. photo/friendlist/location/
*/
function userCheckHandle(uidUserVal, firebaseUser) {
  const cUserList = getNodeAt('cUsers/');
  cUserList.once('value', function(snapshot) {
    if (snapshot.hasChild(uidUserVal)) {
      console.log("user exist");
    } else {
      const userNode = getNodeAt('users');
      const newUserNode = userNode.child(uidUserVal);
      getNodeAt('cUsers').child(uidUserVal).set({'stat':'true'});
      newUserNode.set({
        'userName' : firebaseUser.displayName,
        'profileURL' : firebaseUser.photoURL,
        'postArchive' : '0',
        'postActive' : '0',
        'location' : '0',
        'fbID' : '0',
        'friendList' : '0'
      })
      console.log("user created");
    }
  })
}

// function to create/update signed user info
function userHandler(uidUserVal, firebaseUser) {
  const userNode = getNodeAt('users/' + uidUserVal);
  //TODO pull fb friendlist
  var updates = {};
  updates['/userName'] = firebaseUser.displayName;
  updates['/profileURL'] = firebaseUser.photoURL;
  userNode.update(updates);
}



//TODO GETTERS/ SETTERS FOR USER INFO
