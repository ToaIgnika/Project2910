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
})
;

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
    listNode.on('child_added', function (snap) {
        const friendNode = getNodeAt('users/' + user + '/friends');
        friendNode.once('value', function (snapp) {
            if (snapp.hasChild(snap.val().poster_id) && searchAlg(searchItem.value, snap.val().item_name)) {

                const row1 = document.createElement('div');
                row1.className = "row";
                const firstCol = document.createElement('div');
                firstCol.className = "firstColfloat";
                const secondCol = document.createElement('div');
                secondCol.className = "secondColfloat";
                row1.className += " entrycontent";

                const li = document.createElement('li');
                const pItemPoster = document.createElement('p');
                const pItemName = document.createElement('p');
                const pItemCount = document.createElement('p');
                const pItemCondition = document.createElement('p');
                const pItemComment = document.createElement('p');

                pItemPoster.innerText = "Poster: " + snap.val().poster_name;
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
                textButton(secondCol, snap.val().poster_id);

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
                itemsShown++;
                //bigList.insertBefore(li, bigList.childNodes[0]);
            }
        });
    });
}

function textButton(place, btnVal) {
    var span = document.createElement('button');
    span.className = "badge badge-pill badge-success";
    span.innerHTML = "<h6><small>Send message</small></h6>";
//btn.setAttribute("id", "btnRemove");
    span.setAttribute("value", btnVal);
    span.setAttribute("onclick", "goToChat(this)");
    //var t = document.createTextNode('<img src ="images/icon.png">');    // Create a text node
    //btn.appendChild(t);                                // Append the text to <button>
    place.appendChild(span);                    // Append <button> to <body>
}

function remList() {
    const listNode = getNodeAt('active_posts/');
    listNode.on('child_removed', function (snap) {
        const liDel = document.getElementById(snap.key);
    });
}

function searchAlg(sItem, cItem) {
    if (cItem.toUpperCase().indexOf(sItem.toUpperCase()) == -1) {
        return false;
    } else {
        return true;
    }

}

function goToChat(posterUidVal) {
    var user = firebase.auth().currentUser.uid;
    var chatCatch = uidBond(posterUidVal.value, user);
    const chatNodeCatch = getNodeAt('/chat/');
    chatNodeCatch.once('value', function (snap) {
        if (snap.hasChild(chatCatch)) {
            //TODO redirect to chat with posttemp message and chat opened (ffs)
            getNodeAt('/chat/' + chatCatch).push().set({
                'msg': 'Hi, sup with this item?',
                'user': user
            });
        } else {
            getNodeAt('/chat/' + chatCatch).push().set({
                'msg': 'Welcome to the chat!',
                'user': 'system'
            });
        }
        chatWith(posterUidVal.value);
    });
}

function uidBond(uidOne, uidTwo) {
    if (uidOne > uidTwo) {
        return uidTwo + uidOne;
    } else {
        return uidOne + uidTwo;
    }
}