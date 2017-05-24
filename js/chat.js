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
      if (otherU.length != snap.key.length) {
        // create panel div
        const divPanel = document.createElement('div');
        divPanel.className = 'panel';

        // create button for collapse
        const chatButton = document.createElement('button');
        chatButton.style.width = "100%";
        chatButton.setAttribute('data-toggle','collapse');
        chatButton.setAttribute('data-target', '#' + otherU);
        chatButton.setAttribute('data-parent', '#accordion');
        chatButton.className = 'btn btn-outline-success';

        getNodeAt('/users/' + otherU).once('value', function(snip) {
          chatButton.innerHTML = snip.val().user_name;
        })

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

        divPanel.appendChild(chatButton);
        divPanel.appendChild(chatBlock);
        chatWindow.appendChild(chatButton);
        chatWindow.appendChild(chatBlock);
        chatBlock.appendChild(chatUl);
        chatBlock.appendChild(chatInputField);
        chatWindow.appendChild(divPanel);

        const chatNode = getNodeAt('/chat/' + snap.key);
        chatNode.limitToLast(10).on('child_added', function(snapT) {
          const li = document.createElement('li');
          if (snapT.val().user == user) {
            li.className = ('myLi');
          } else if (snapT.val().user == "system") {
            li.className = ("systemLi");
          } else {
            li.className = ('otherLi');
          }
          li.innerHTML = snapT.val().msg;
          chatUl.appendChild(li);
          var element = chatUl;
          element.scrollTop = element.scrollHeight;
        });
      }
    });
}

function sendText(textItemVal) {
  var user = firebase.auth().currentUser;
  var textVal = document.getElementById(textItemVal).value;
  if (user && textVal != '') {
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
