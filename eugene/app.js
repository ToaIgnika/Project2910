// Initialize Firebase
initFirebaseApp();


// Get elements
const btnFBLogin = document.getElementById('btnFBLogin');
const bodyDisplay = document.getElementById('container');
const loginPage = document.getElementById('loginPage');


// Get a reference to the database service

// realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
      signInFlowHandle();
    window.location = "main.html";
  } else {
    bodyDisplay.classList.remove('hide');
    console.log("not loged in");
  }
});


// fb flow auth
btnFBLogin.addEventListener('click', e => {
  //create and instance of facebook provider object
  signInFlow();
})
