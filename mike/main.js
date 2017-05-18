// Initialize Firebase
initFirebaseApp();
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
    userCheckHandle(userKey, firebaseUser);
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
  FB.logout(function(response) {
  });
  firebase.auth().signOut();
});

// db tryouts
const btnSubmit = document.getElementById('subButton');
const nameTxt = document.getElementById('nameTxt');
const numTxt = document.getElementById('numTxt');
const desTxt = document.getElementById('desTxt');

// listener for added items
function onAdder(userKeyVal) {
  const readObj = getNodeAt('users/' + userKeyVal + '/active_posts/');
  readObj.on('child_added', snap => {
    itemCount ++;
    
	// check the itemlist
    const liB = document.createElement('li');
    liB.id = snap.key;
    delButton(liB, snap.key);
    const ul = document.createElement('ol');
    liB.appendChild(ul);
    const objSec = readObj.child(snap.key);
	const id = document.createElement('li');
	id.innerText = snap.key;
	ul.appendChild(id);
	
    objSec.once('value').then(function(snapT) {
      const li = document.createElement('li');
      li.innerText = 'Item name: ' + snapT.child("item_name").val();
      const li2 = document.createElement('li');
      li2.innerText = 'Quantity: ' + snapT.val().item_quantity;
      const li3 = document.createElement('li');
      li3.innerText = 'Description: ' + snapT.val().item_description;
      ul.appendChild(li);
      ul.appendChild(li2);
      ul.appendChild(li3);
	  
    })
	
	
    listOL.appendChild(liB);
  })
}

// creates a post and adds it to active posts
function createPost(input1, input2, input3) {
	// for debug/testing
	//window.alert("got into the create function");
	
	const posts = getNodeAt("active_posts/");
	const post = posts.push();
	post.set({
		name : input1,
		desc : input2,
		post_time : input3,
		poster_id : userKey
	});
	
	
	
	window.alert("post should be id'd as " + post.key + " under user: " + userKey);
	//window.alert("post should have been created with id " + post);
	
	// testing purposes
	return post.key;
}

// displays post details when given the post ID
function displayActivePost(post_id, el) {
	const post = getNodeAt('active_posts/' + post_id);
	
	// for debug/testing
	//window.alert(post_id + " | " + post);
	
	post.once("value")
		.then(function(snapshot) {
			const dPost = document.createElement('p');
			dPost.id = snapshot.key;
			
			// for debug/testing
			//window.alert(snapshot.key);
			
			snapshot.forEach(function(field) {
				var key = field.key;
				
				// for debug/testing
				window.alert(key + " : " + field.val());
				
				// put the output somewhere useful here
				var output = document.createElement('span');
				output.innerText = key + ": " + field.val() + "\n";
				dPost.appendChild(output);
			});
			el.appendChild(dPost);
		});	
}

// listener for deleted items
function onDelete(userKeyVal) {
  const readObj = getNodeAt('users/' + userKey + '/active_posts/');
  readObj.on('child_removed', snap => {
    itemCount--;
    // check the itemlist
    const liDel = document.getElementById(snap.key);
    liDel.remove();
  })
}

// submit button listener
btnSubmit.addEventListener('click', e => {
	
	// testing generalized post function
	var newPostId = createPost("testing", "the", "world");
	
	// testing post display function
	displayActivePost(newPostId);
  
  // create reference to a child of DB
  const foodList = getNodeAt('users/' + userKey + '/active_posts/');
  // create keyValue for the object
  const keyVal = foodList.push();
  // add new(old object to the given key value)
  keyVal.set({
    "1_itemName" : nameTxt.value,
    "2_itemNum" : numTxt.value,
    "3_itemDes" : desTxt.value
  });
  nameTxt.value = '';
  numTxt.value = '';
  desTxt.value = '';
})  

// delete function
function delListItem(eventH) {
  const btnValue = eventH.value;
  const removePlace = getNodeAt('users/' + userKey + '/active_posts/');
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
