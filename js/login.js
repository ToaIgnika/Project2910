// Initialize Firebase
initFirebaseApp();



// Login state control. If logged in, redirect. if not, stay on page.
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    //TODO get redirect results, pull the FB list
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        FB.api(
          'https://graph.facebook.com/me?access_token=' + token,
          'GET',
          {"fields":"id,name,friends"},
          function(response) {
            var updates = {};
            updates['/fb_fb/' + response.id] = firebaseUser.uid;
            updates['/users/' + firebaseUser.uid + '/user_name'] = firebaseUser.displayName;
            updates['/users/' + firebaseUser.uid + '/profile_url'] = firebaseUser.photoURL;
            updates['/users/' + firebaseUser.uid + '/fb_id'] = response.id;
            for (i = 0; i < response.friends.data.length; i++) {
              firebase.database().ref('/fb_fb/' + response.friends.data[i].id).once('value').then(function(snapshot) {
                console.log(snapshot.val());
                var up2 = {};
                up2['/users/' + firebaseUser.uid + '/friends/' + snapshot.val()] = '1';
                up2['/users/' + snap.val() + '/friends/' + firebaseUser.uid] = '1';
                return firebase.database().ref().update(up2);
              });
            }
            return firebase.database().ref().update(updates).then(function() {
            window.location = "../home.html";
          });
        });
        } else {
          window.location = "../home.html";
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
    } else {
      const wrap = document.getElementById('body_wrap');
      wrap.classList.remove('hide');
    }
  });

  // call this function on login onclick button
  function signInFlow() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_friends');
    provider.addScope('email');
    provider.setCustomParameters({
      'display': 'popup'
    });
    firebase.auth().signInWithRedirect(provider);
  }
