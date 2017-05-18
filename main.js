// Initialize Firebase
initFirebaseApp();

// get elemets from the html dom
//TODO

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // TODO control the DB interaction functions

    $('body_wrap').classList.remove('hide');
  } else {
    window.location = "index.html";
  }
});

// onadd my list

// onchange my list

// onadd fr list
// onchange fr list
