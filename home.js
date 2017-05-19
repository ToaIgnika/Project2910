// Initialize Firebase
initFirebaseApp();

// declaring this here for testing purposes more than anything
var tempUserKey;
var testPost;

// get elemets from the html dom
//TODO
const testBtn = document.getElementById("testButton");
const testBtn2 = document.getElementById("testButton2");

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // TODO control the DB interaction functions
	
	const userKey = firebaseUser.uid;
	tempUserKey = userKey;
	
	onAdd(userKey);
	onDelete(userKey);
	
    const wrap = document.getElementById('body_wrap');
    wrap.classList.remove('hide');
  } else {
    window.location = "index.html";
  }
});

// onadd my list
function onAdd(user, nPost) {
	// watch the list of posts by the user for changes
	const userList = getNodeAt('users/' + user + '/active_posts/');
	userList.on('child_added', post => {
		// call function to display the active post
		displayActivePost(post.key);
	
	})
}

// listener for deleted items
function onDelete(user) {
	// watch the list of posts by the user for changes
	const readObj = getNodeAt('users/' + user + '/active_posts/');
	readObj.on('child_removed', post => {
		var dPost = document.getElementById(post.key);
		dPost.remove();
	})
}

// onchange my list
// onadd fr list
// onchange fr list

testBtn.addEventListener('click', e => {
	window.alert("test button clicked");

	var post = createPost("Testing", "the", "World", tempUserKey);
	
	//displayActivePost(post);
	
	testPost = post;
})  

testBtn2.addEventListener('click', e => {
	window.alert("test button 2 clicked");
	window.alert(testPost);
	
	
	deletePost(testPost);
})  
