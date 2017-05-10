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


// Get elements
const btnFBLogin = document.getElementById('btnFBLogin');
const bodyDisplay = document.getElementById('container');
const loginPage = document.getElementById('loginPage');


// realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {

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
            alert(JSON.stringify(response));
            document.getElementById("demo").innerHTML = response.data[1].name + " " + response.data[1].id;
          }
        );

      }
      // The signed-in user info.
      var user = result.user;
      console.log(user);
    })
    window.location = "main.html";
  } else {
    bodyDisplay.classList.remove('hide');
    console.log("not loged in");
  }
});


// fb flow auth
btnFBLogin.addEventListener('click', e => {
  //create and instance of facebook provider object
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_friends');
  provider.addScope('email');
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithRedirect(provider);
})
