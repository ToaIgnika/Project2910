// Initialize Firebase
initFirebaseApp();

// get elemets from the html dom
//TODO

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        // TODO control the DB interaction functions

        const wrap = document.getElementById('body_wrap');
        showUserName();
        wrap.classList.remove('hide');
    } else {
        window.location = "index.html";
}
});

window.onload = function () {
    var url = document.location.href,
        itemval = url.substring(url.indexOf('=') + 1);
    document.getElementById('foodname').value = decodeURIComponent(itemval);
}



function addPost() {
  var foodItemName = document.getElementById('foodname');
  var foodItemCount = document.getElementById('numfood');
  var foodCondition = document.getElementById('sel1');
  var foodComment = document.getElementById('comment');
  
  // validate foodItemName
  if ((foodItemName == null) || (foodItemName.length > 25) || (/[^a-z0-9\s]+/i.test(foodItemName))) {
	window.alert("Please enter the name of your food. (Max. 25 alphanumeric characters)");
	return;
  } 
  
  // validate foodItemCount
  if ((foodItemCount == null) || (foodItemCount.length > 25)) {
	window.alert("Please describe the quantity of food you're offering with 25 characters or less.");
	return;
  } 
  
  // validate foodComment
  if (foodComment.length > 400) {
	window.alert("Please limit comments to 400 characters or less.");
	return;
  } 

  console.log("wtf");
  var user = firebase.auth().currentUser;
  if (user) {
    const textNode = getNodeAt('active_posts/').push().set({
      'item_name' : foodItemName.value,
      'item_count' : foodItemCount.value,
      'item_condition' : foodCondition.value,
      'item_comment' : foodComment.value,
      'poster_id' : user.uid,
      'poster_name' : user.displayName
    });
	$('#myModal').modal('show');
    clearPost();
  }
}

function clearPost() {
  document.getElementById('foodname').value = "";
  document.getElementById('numfood').value = "";
  document.getElementById('sel1').selectedIndex = 2;
  document.getElementById('comment').value = "";
}
