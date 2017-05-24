// Initialize Firebase
initFirebaseApp();

// get elemets from the html dom
//TODO

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    const userUid = firebaseUser.uid;
    //userCheckHandle(userUid, firebaseUser);
    // TODO control the DB interaction functions
    userList();
    friendList();
    listDel();
    const wrap = document.getElementById('body_wrap');
    wrap.classList.remove('hide');
  } else {
    window.location = "index.html";
  }
})
;

// onadd my list
function userList() {
  const listNode = getNodeAt('active_posts/');
  const bigList = document.getElementById('userListHTML');
  var user = firebase.auth().currentUser.uid;
  listNode.on('child_added', function (snap) {
    if (user == snap.val().poster_id) {

      /* Remy's Stuff here */
      const row = document.createElement('div');
      row.className = "row";
      const firstCol = document.createElement('div');
      firstCol.className = "col-xs-3";
      const secondCol = document.createElement('div');
      secondCol.className = "col-xs-9";
      row.className += " entrycontent";

      const li = document.createElement('li');
      delButton(li, snap.key);
      const pItemName = document.createElement('p');
      const pItemCount = document.createElement('p');
      const pItemCondition = document.createElement('p');
      const pItemComment = document.createElement('p');

      pItemName.innerText = "Item: " + snap.val().item_name;
      pItemCount.innerText = "Quantity: " + snap.val().item_count;
      pItemCondition.innerText = "Condition: " + snap.val().item_condition;
      pItemComment.innerText = "Comment: " + snap.val().item_comment;

      /* Remy's Stuff here */
      firstCol.appendChild(pItemName);
      firstCol.appendChild(pItemCount);
      secondCol.appendChild(pItemCondition);
      secondCol.appendChild(pItemComment)
      delButton(secondCol,snap.key);

      /* Remy's Stuff here */
      row.setAttribute("id", snap.key);
      row.appendChild(firstCol);
      row.appendChild(secondCol);

      /*
      li.setAttribute("id", snap.key);
      li.appendChild(pItemName);
      li.appendChild(pItemCount);
      li.appendChild(pItemCondition);
      li.appendChild(pItemComment);
      */

      bigList.appendChild(row);
    }
  });
}

function listDel() {
  const listNode = getNodeAt('active_posts/');
  listNode.on('child_removed', function (snap) {
    const liDel = document.getElementById(snap.key);
    liDel.remove();
  });
}


function friendList() {
  const listNode = getNodeAt('active_posts/');
  var user = firebase.auth().currentUser.uid;
  const bigList = document.getElementById('otherListHTML');
  listNode.on('child_added', function (snap) {
    const friendNode = getNodeAt('users/' + user + '/friends');
    friendNode.once('value', function (snapp) {
      if (snapp.hasChild(snap.val().poster_id)) {

        /* Remy's Stuff here */
        const row1 = document.createElement('div');
        row1.className = "row";
        const firstCol = document.createElement('div');
        firstCol.className = "col-xs-3";
        const secondCol = document.createElement('div');
        secondCol.className = "col-xs-8";
        row1.className += " entrycontent";

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

        /* Remy's Stuff here */
        firstCol.appendChild(pItemPoster);
        firstCol.appendChild(pItemName);
        firstCol.appendChild(pItemCount);
        secondCol.appendChild(pItemCondition);
        secondCol.appendChild(pItemComment);

        /* Remy's Stuff here */
        row1.setAttribute("id", snap.key);
        row1.appendChild(firstCol);
        row1.appendChild(secondCol);

        /*
        li.setAttribute("id", snap.key);
        li.appendChild(pItemPoster);
        li.appendChild(pItemName);
        li.appendChild(pItemCount);
        li.appendChild(pItemCondition);
        li.appendChild(pItemComment);
        */
        bigList.appendChild(row1);
        //bigList.insertBefore(li, bigList.childNodes[0]);
      }
    });
  });
}


// create button to delete item
function delButton(place, btnVal) {
  var btn = document.createElement("BUTTON");        // Create a <button> element
  btn.setAttribute("id", "btnRemove");
  btn.setAttribute("value", btnVal);
  btn.setAttribute("onclick", "delListItem(this)");
  var s = document.createElement("input");
  s.src = "images/del_icon.png";
  s.type = "image";
  btn.appendChild(s);
  //var t = document.createTextNode('<img src ="images/icon.png">');    // Create a text node
  //btn.appendChild(t);                                // Append the text to <button>
  place.appendChild(btn);                    // Append <button> to <body>
}

function delListItem(eventH) {
  const btnValue = eventH.value;
  const removePlace = getNodeAt('/active_posts/');
  const removeItem = removePlace.child(btnValue);
  removeItem.remove();
  eventH.remove();
}

function goToChat(posterUidVal) {
  var user = firebase.auth().currentUser.uid;
  var chatCatch = uidBond(posterUidVal.value, user);
  const chatNodeCatch = getNodeAt('/chat/');
  chatNodeCatch.once('value', function(snap) {
    if (snap.hasChild(chatCatch)) {
      //TODO redirect to chat with posttemp message and chat opened (ffs)
      getNodeAt('/chat/' + chatCatch).push().set({
        'msg' : 'Hi, sup with this item?',
        'user' : user
      });
    } else {
      getNodeAt('/chat/' + chatCatch).push().set({
        'msg' : 'Welcome to the chat!',
        'user' : 'system'
      });
    }
  });
}

// create button to delete item
function textButton (place, btnVal) {
  var btn = document.createElement("BUTTON");        // Create a <button> element
  //btn.setAttribute("id", "btnRemove");
  btn.setAttribute("value", btnVal);
  btn.setAttribute("onclick", "(this)");
  var s = document.createElement("input");
  s.src = "images/del_icon.png";
  s.type = "image";
  btn.appendChild(s);
  //var t = document.createTextNode('<img src ="images/icon.png">');    // Create a text node
  //btn.appendChild(t);                                // Append the text to <button>
  place.appendChild(btn);                    // Append <button> to <body>
}

function uidBond(uidOne, uidTwo) {
  if (uidOne > uidTwo) {
    return uidTwo + uidOne;
  } else {
    return uidOne + uidTwo;
  }
}

$('.nav-tabs').on('shown.bs.tab', 'a', function (e) {
    if (e.relatedTarget) {
        $(e.relatedTarget).removeClass('active');
    }
})
