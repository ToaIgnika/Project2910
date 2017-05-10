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
// Get elements
const btnLogout = document.getElementById('btnLogout');
const bodyDisplay = document.getElementById('container');
const listOL = document.getElementById('listOL');
var itemCount = 0;


var userKey;
// realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    userKey = firebaseUser.uid;
    onAdder(userKey); // tracks the list of current user (on add checker)
    onDelete(userKey); // tracks the list of current user (on delete checker)

    bodyDisplay.classList.remove('hide');
    //window.location = "main.html";
  } else {
    console.log("not loged in");
    window.location = "index.html";
  }
});

// logout button action
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

// db tryouts
const btnSubmit = document.getElementById('subButton');
const nameTxt = document.getElementById('nameTxt');
const numTxt = document.getElementById('numTxt');
const desTxt = document.getElementById('desTxt');

// listener for added items
function onAdder(userKeyVal) {
  const readObj = db.ref().child(userKeyVal);
  readObj.on('child_added', snap => {
    itemCount ++;
    // check the itemlist
    const liB = document.createElement('li');
    liB.id = snap.key;
    delButton(liB, snap.key);
    const ul = document.createElement('ol');
    liB.appendChild(ul);
    const objSec = readObj.child(snap.key);
    objSec.on('child_added', snapT => {
      const li = document.createElement('li');
      li.innerText = snapT.val();
      ul.appendChild(li);
    })

    listOL.appendChild(liB);
  })
}

// listener for deleted items
function onDelete(userKeyVal) {
  const readObj = db.ref().child(userKeyVal);
  readObj.on('child_removed', snap => {
    itemCount--;
    // check the itemlist
    const liDel = document.getElementById(snap.key);
    liDel.remove();
  })
}

// submit button listener
btnSubmit.addEventListener('click', e => {
  // create reference to a child of DB
  const foodList = db.ref().child(userKey);
  // create keyValue for the object
  const keyVal = foodList.push();
  // add new(old object to the given key value)
  keyVal.set({
    "1_itemName" : nameTxt.value,
    "2_itemNum" : numTxt.value,
    "3_itemDes" : desTxt.value
  });
})

// delete function
function delListItem(eventH) {
  const btnValue = eventH.value;
  const removePlace = db.ref().child(userKey);
  const removeItem = removePlace.child(btnValue);
  removeItem.remove();
  eventH.remove();
}

// create button to delete item
function delButton (place, btnVal) {
  var btn = document.createElement("BUTTON");        // Create a <button> element
  btn.setAttribute("id", "btnRemove");
  btn.setAttribute("value", btnVal);
  btn.setAttribute("onclick", "delListItem(this)");
  var t = document.createTextNode("Delete item");    // Create a text node
  btn.appendChild(t);                                // Append the text to <button>
  place.appendChild(btn);                    // Append <button> to <body>
}

// show user/all items
const btnShowUser = document.getElementById('showUser');
const btnShowOther = document.getElementById('showOther');
const userList = document.getElementById('userList');
const otherList = document.getElementById('otherList');
btnShowUser.addEventListener('click', e => {
  if(btnShowUser.value == "0") {
  userList.classList.remove('hide');
  btnShowUser.value = "1";
} else {
  userList.classList.add('hide');
  btnShowUser.value = "0";
}
});

btnShowOther.addEventListener('click', e => {
  otherList.classList.remove('hide');
});
