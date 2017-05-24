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

/*
window.onload = function () {
    var url = document.location.href,
        itemval = url.substring(url.indexOf('=') + 1);
    //document.getElementById('searchItemHTML').value = decodeURIComponent(itemval);
    document.getElementById(decodeURIComponent(itemval) + 'btn').click();
}*/

function displayText() {
  var user = firebase.auth().currentUser.uid;
  const chatList = getNodeAt('/chat/');
  chatList.off();
  const chatWindow = document.getElementById('chatWindowHTML');
  chatWindow.innerHTML = '';
  var url = document.location.href,
      itemval = url.substring(url.indexOf('=') + 1);
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
        chatButton.id = otherU + 'btn';

        getNodeAt('/users/' + otherU).once('value', function(snip) {
          chatButton.innerHTML = snip.val().user_name;
        })

        // create ul/input field block

        const chatBlock = document.createElement('div');
        chatBlock.classList.add('collapse');
        if (itemval == otherU) {
          chatBlock.classList.add('show');
        }
        chatBlock.id = otherU;

        // create ul window
        const chatUl = document.createElement('ul');
        chatUl.classList.add('ulChatText');

        // create div wrap
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        // create coll button
        const hideButton = document.createElement('button');
        hideButton.className = 'btn btn-outline-success';
        hideButton.value = otherU + 'btn';
        hideButton.setAttribute('onclick', '(document.getElementById(this.value)).click()');
        hideButton.innerHTML = 'Close';

        // span for coll button
        const spanEl = document.createElement('span');
        spanEl.className = 'input-group-btn';

        // create input field
        const chatInputField = document.createElement('input');
        chatInputField.setAttribute('type', 'text');
        chatInputField.setAttribute('onchange','sendText(this.id)');
        chatInputField.classList.add('form-control');
        chatInputField.id = snap.key;

        spanEl.appendChild(hideButton);
        inputGroup.appendChild(chatInputField);
        inputGroup.appendChild(spanEl);

        chatBlock.appendChild(chatUl);
        chatBlock.appendChild(inputGroup);

        divPanel.appendChild(chatButton);
        divPanel.appendChild(chatBlock);
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
