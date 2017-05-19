// Initialize Firebase
initFirebaseApp();

// get elemets from the html dom
//TODO

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // TODO control the DB interaction functions
	userKey = firebaseUser.uid;

	// user info function for profile details
	displayUserInfo(userKey);

    const wrap = document.getElementById('body_wrap');
    wrap.classList.remove('hide');
  } else {
    window.location = "index.html";
  }
});

function userLogOut() {
  firebase.auth().signOut();
}
