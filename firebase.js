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

// node getter. returns as an reference object.
function getNodeAt(nLocation) {
	return firebase.database().ref().child(nLocation);
}

// displays user data from database from a given user ID
function displayUserInfo(user) {
	const profile = getNodeAt('users/' + user);
	
	// for debug/testing
	//window.alert(user + " | " + profile);
	
	profile.once("value")
		.then(function(snapshot) {
			
			// for debug/testing
			//window.alert(snapshot.key);
			
			snapshot.forEach(function(field) {
				var key = field.key;
				var val = field.val();
				
				// for debug/testing
				//window.alert(key + " : " + field.val());
				
				// put the output somewhere useful here
				var insert = document.getElementById(key);
				if (insert != null) {
					if (insert.tagName.toLowerCase() == "img") {
						insert.setAttribute("src", val);
					} else {
						insert.innerText = val;
					}
				}
			});	
		});	
}

// creates a post and adds it to active posts
function createPost(input1, input2, input3, userKey) {
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
	
	// for debug/tessting
	//window.alert("post should be id'd as " + post.key + " under user: " + userKey);
	
	var userNode = getNodeAt("users/" + userKey + "/active_posts/" + post.key);
	
	// edit this to make tStamp a useful data point
	var tStamp = "true";
	
	userNode.set({
		timestamp : tStamp
	});
	
	// testing purposes
	//window.alert("got here "); 
	//window.alert("post should have been created with id " + post);
	
	return post.key;
}

// deletes a post from active_posts and also from the user's subsection
function deletePost(post_id) {
	// get post location node
	const postLoc = getNodeAt("active_posts/" + post_id);
	
	postLoc.once("value")
		.then(function (snapshot) {
			// get user ID of the poster
			const user = snapshot.child("poster_id").val();
			
			// get location of post ID within user's node tree
			const userLoc = getNodeAt("users/" + user + "/active_posts/" + post_id);
			
			// remove the post from the user's node tree
			userLoc.remove();
			window.alert("removed from user's tree");
			
			// remove the post from the active posts listing
			postLoc.remove();
			window.alert("removed from active posts node");
		});	
}

// displays post details when given the post ID
function displayActivePost(post_id) {
	const post = getNodeAt("active_posts/" + post_id);
	
	// for debug/testing
	//window.alert(post_id + " | " + post);
	
	post.once("value")
		.then(function(snapshot) {
			
			// create li element to wrap the new post
			const nPost = document.createElement('li');
			nPost.id = snapshot.key;
			
			// for debug/testing
			//window.alert(key + " : " + field.val());
			
			// create row class div element
			var row = document.createElement('div');
			row.setAttribute("class", "row");
			nPost.appendChild(row);
			
			// create column element for data to be stored in
			var col1 = document.createElement('div');
			col1.setAttribute("class", "col-xs-3");
			row.appendChild(col1);
			
			// create column element for data to be stored in
			var col2 = document.createElement('div');
			col2.setAttribute("class", "col-xs-9");
			row.appendChild(col2);
			
			snapshot.forEach(function(field) {
				var key = field.key;
				var val = field.val();
				
				// for debug/testing
				//window.alert(key + " : " + field.val());
				
				var span = document.createElement('span');
				span.setAttribute("class", key);
				span.innerText = val;
				
				// determine which column to put it in here
				
				
				
				// for now just doing col1
				col1.appendChild(span);
			});
			
			// specify the list to add the items to, hardcoding to frndlstng for testing
			var list = document.getElementById("frndlstng");
			list.appendChild(nPost);
		});	
}


