// Initialize Firebase
initFirebaseApp();

// get elemets from the html dom
//TODO

// login status checker
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // TODO control the DB interaction functions
    displayText();
    const wrap = document.getElementById('body_wrap');
    wrap.classList.remove('hide');
  } else {
    window.location = "index.html";
  }
});


function displayText() {
  var user = firebase.auth().currentUser.uid;
  const chatList = getNodeAt('/chat/');
  chatList.off();
  const chatWindow = document.getElementById('chatWindowHTML');

  chatList.on('child_added', function(snap) {
      var otherU = snap.key.replace(user, '');
      if (otherU.length != snap.key) {
        // create button for collapse
        const chatButton = document.createElement('button');
        chatButton.style.width = "100%";
        chatButton.setAttribute('data-toggle','collapse');
        chatButton.setAttribute('data-target', '#' + otherU);
        chatButton.className = 'btn btn-outline-success';
        chatButton.innerHTML = otherU;

        // create ul/input field block
        const chatBlock = document.createElement('div');
        chatBlock.classList.add('collapse');
        chatBlock.id = otherU;

        // create ul window
        const chatUl = document.createElement('ul');
        chatUl.classList.add('ulChatText');

        // create input field
        const chatInputField = document.createElement('input');
        chatInputField.setAttribute('type', 'text');
        chatInputField.setAttribute('onchange','sendText(this.id)');
        chatInputField.classList.add('form-control');
        chatInputField.id = snap.key;


        chatWindow.appendChild(chatButton);
        chatWindow.appendChild(chatBlock);
        chatBlock.appendChild(chatUl);
        chatBlock.appendChild(chatInputField);

        const chatNode = getNodeAt('/chat/' + snap.key);
        chatNode.limitToLast(10).on('child_added', function(snapT) {
          const li = document.createElement('li');
          if (snapT.val().user == user) {
            li.classList.add('myLi');
          } if (snapT.val().user == "system") {
            li.classList.add("systemLi")
          } else {
            li.classList.add('otherLi');
          }
          li.innerHTML = snapT.val().msg;
          chatUl.appendChild(li);
        });
      }
    });
}

function sendText(textItemVal) {
  console.log(textItemVal);
  var user = firebase.auth().currentUser;
  var textVal = document.getElementById(textItemVal).value;
  console.log(user.uid + document.getElementById(textItemVal).value);
  if (user && textVal != '') {
    console.log('called twice');
    const chatTxt = getNodeAt('chat/' + textItemVal).push().set({
      'msg' : textVal,
      'user' : user.uid
    });
  document.getElementById(textItemVal).value = '';
  } else {
    //textMsg.value = 'you are not logged in. Please, reload the page!';
  }
}



  // textButton(newLiPlace, snap.val().poster_id);
