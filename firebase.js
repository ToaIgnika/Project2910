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
