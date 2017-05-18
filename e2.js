var secret = "717968";
var input = "";
var timer;
var mode = false;



$(document).keyup(function(e) {
  //alert(e.which);
  input += e.which;

  clearTimeout(timer);
  timer = setTimeout(function() {
    input = "";
  }, 200);

  check_input();
});

function check_input() {
  if (input == secret) {
    //the secret code

	var people = document.getElementsByClassName('img-circle');
		var i;
		for(i =0; i<people.length; i++){
			alert('got here');
			people[i].src = "http://i0.kym-cdn.com/entries/icons/original/000/013/564/aP2dv.gif";
		}

  }
}

$(document).ready(function() {
  setInterval(function() {
    $('#info').html('Keystroke: ' + input);
  }, 100);
});


