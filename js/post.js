// Initialize Firebase
initFirebaseApp();

// get elemets from the html dom
//TODO

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        // TODO control the DB interaction functions

        const wrap = document.getElementById('body_wrap');
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
  const foodItemName = document.getElementById('foodname');
  const foodItemCount = document.getElementById('numfood');
  const foodCondition = document.getElementById('sel1');
  const foodComment = document.getElementById('comment');
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
  }
  clearPost();
  afterPost();
}

function clearPost() {
  document.getElementById('foodname').value = "";
  document.getElementById('numfood').value = "";
  document.getElementById('sel1').selectedIndex = 2;
  document.getElementById('comment').value = "";
}

function afterPost() {
  var url = 'http://f2e.ca/home.html?=' + encodeURIComponent('true');
  document.location.href = url;
  window.location = url;
}
