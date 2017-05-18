// Initialize Firebase
initFirebaseApp();

// Login state control. If logged in, redirect. if not, stay on page.
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    //TODO get redirect results, pull the FB list
    window.location = "home.html";
  } else {
    $('body_wrap').classList.remove('hide');
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
