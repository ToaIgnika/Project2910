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
      var friendPath = ('https://graph.facebook.com/me/friends?access_token=').concat(token);
      console.log(friendPath);
      FB.api(
        friendPath,
        'GET',
        {},
        function(response) {
          for (var i = 0; i < response.data.length; i++) {
            alert(response.data[i].name + " " + response.data[i].id);
          }
        }
      );
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
  return firebase.database().ref().child(nLocation);
}


/* Checks if the user exist or not in the db.
If not, create a user in the db.
if yes, no changes made.
TODO: update info, i.e. photo/friendlist/location/
*/
function userCheckHandle(uidUserVal, firebaseUser) {
  const userNode = getNodeAt('users/');
  userNode.once('value', function(snapshot) {
    if (snapshot.hasChild(uidUserVal)) {
      console.log("user exist");
    } else {
      const newUserNode = userNode.child(uidUserVal);
      newUserNode.set({
        'user_name' : firebaseUser.displayName,
        'profile_url' : firebaseUser.photoURL,
        'active_posts' : '0',
        'location' : '0',
        'fb_id' : '0',
        'friends' : '0' // placeholder value, this will become a list
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
  updates['/user_name'] = firebaseUser.displayName;
  updates['/profile_url'] = firebaseUser.photoURL;
  userNode.update(updates);
}



//TODO GETTERS/ SETTERS FOR USER INFO

// mike is working on getters yo

// returns user node as an object
function getUser(uid) {
  return getNodeAt('users/' + uid);
}

// returns the reputation score of the specified user
function getRep(uid) {
  getNodeAt('users/' + uid + '/rep_score/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns the facebook user name of the user
function getUserName(uid) {
  getNodeAt('users/' + uid + '/user_name/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns the url of the facebook profile picture of the user
function callback(shit){
  return(shit);
}


function getPic(uid, callback){
  getNodeAt('users/' + uid).once('value')
  .then(function(snapshot) {
    var shit = snapshot.val().profile_url;
    console.log(shit);
  });
}// Code goes here

// returns the url of the facebook profile picture of the user
function getPic(uid){
  getNodeAt('users/' + uid).once('value')
  .then(function(snapshot) {
    var shit = snapshot.val().profile_url;
    console.log(shit);
  });
}

// returns the number of active posts by the given user
function getActivePosts(uid) {
  getNodeAt('users/' + uid + '/active_posts/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns the specified user's facebook id (for data retrieval)
function getFbId(uid) {
  // TBD after FB stuff
}

// returns the user's location data, if set
function getLocation(uid) {
  // TBD after map stuff
}

// returns the user's facebook friends as a list? <- TBD
function getFriends(uid) {
  // TBD after FB stuff
}

// returns the user's allergy profile, if set
function getAllergies(uid) {
  // TBD
}

// returns a posting object identified by its post_id
function getPost(pid) {
  return getNodeAt('posts/' + pid);
}

// returns the name of a post as a string snapshot
function getPostName(pid) {
  getNodeAt('posts/' + pid + '/name/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns the description of a post as a string snapshot
function getPostDesc(pid) {
  getNodeAt('posts/' + pid + '/desc/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns the post date of a post as a string/date? snapshot
function getPostDate(pid) {
  getNodeAt('posts/' + pid + '/post_date/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns the lifespan of a post as a string/int? snapshot
function getPostLifespan(pid) {
  getNodeAt('posts/' + pid + '/post_lifespan/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns the poster id of a post as a string snapshot
function getPosterId(pid) {
  getNodeAt('posts/' + pid + '/poster_id/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns the recipient's id of a post as a string snapshot
function getRecipientId(pid) {
  getNodeAt('posts/' + pid + '/recipient_id/').once('value')
  .then(function(snapshot) {
    return snapshot.val();
  })
}

// returns true if the post is a meal, false otherwise
function isMeal(pid) {
  getNodeAt('posts/' + pid + '/meal/').once('value')
  .then(function(snapshot) {
    return snapshot.exists();
  })
}

// returns true if the post was successful, false otherwise
function isSuccess(pid) {
  getNodeAt('posts/' + pid + '/success/').once('value')
  .then(function(snapshot) {
    return snapshot.exists();
  })
}
