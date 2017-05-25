// Initialize Firebase
initFirebaseApp();

var itemsShown = 0;
// get elemets from the html dom
//TODO

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        // TODO control the DB interaction functions
        searchList(5);
        remList();
        const wrap = document.getElementById('body_wrap');
        wrap.classList.remove('hide');
    } else {
        window.location = "index.html";
}
});

window.onload = function () {
    var url = document.location.href,
        itemval = url.substring(url.indexOf('=') + 1);
    document.getElementById('searchItemHTML').value = decodeURIComponent(itemval);
}

function clearList() {
  const bigList = document.getElementById('searchListHTML');
  bigList.innerHTML = "";
  const listNode = getNodeAt('active_posts/');
  listNode.off();
  searchList(5);
}

// search function
// tag- name. reuse alg for going through the friends
function searchList(displayCount) {
  const searchItem = document.getElementById('searchItemHTML');
  const listNode = getNodeAt('active_posts/');
  listNode.off();
  var user = firebase.auth().currentUser.uid;
  const bigList = document.getElementById('searchListHTML');
  bigList.innerHTML = "";
  listNode.on('child_added', function(snap) {
    const friendNode = getNodeAt('users/'+ user + '/friends');
    friendNode.once('value', function(snapp) {
      if (snapp.hasChild(snap.val().poster_id) && searchAlg(searchItem.value, snap.val().item_name)) {
        const li = document.createElement('li');
        const pItemPoster = document.createElement('p');
        const pItemName = document.createElement('p');
        const pItemCount = document.createElement('p');
        const pItemCondition = document.createElement('p');
        const pItemComment = document.createElement('p');

        pItemPoster.innerText = snap.val().poster_name;
        pItemName.innerText = "Item: " + snap.val().item_name;
        pItemCount.innerText = "Quantity: " + snap.val().item_count;
        pItemCondition.innerText = "Condition: " + snap.val().item_condition;
        pItemComment.innerText = "Comment: " + snap.val().item_comment;

        li.setAttribute("id", snap.key);
        li.appendChild(pItemPoster);
        li.appendChild(pItemName);
        li.appendChild(pItemCount);
        li.appendChild(pItemCondition);
        li.appendChild(pItemComment);

        bigList.appendChild(li);
        itemsShown++;
        //bigList.insertBefore(li, bigList.childNodes[0]);
      }
    });
  });
}

function remList() {
  const listNode = getNodeAt('active_posts/');
  listNode.on('child_removed', function(snap) {
    const liDel = document.getElementById(snap.key);
  });
}

function searchAlg (sItem, cItem) {
  if (cItem.toUpperCase().indexOf(sItem.toUpperCase()) == -1) {
    return false;
  } else {
    return true;
  }

}
