var remy = false;
var eugine = false;
var mike = false;
var just = false;
var alex = false;

function al (){
	if(alex){
		remy = false;
		eugine = false;
		mike = false;
		just = false;
		alex = false;
	}
	else{
		alex = true;
		if(remy && alex && mike && eugine && just){
			godMode()
		}
	}
}
function eu (){

	if(eugine){
		remy = false;
		eugine = false;
		mike = false;
		just = false;
		alex = false;
	}
	else{
		eugine = true;
		if(remy && alex && mike && eugine && just){
			godMode()
		}
	}
}
function mi (){
	if(mike){
		remy = false;
		eugine = false;
		mike = false;
		just = false;
		alex = false;
	}
	else{
		mike = true;
		if(remy && alex && mike && eugine && just){
			godMode()
		}
	}
}
function re (){
	if(remy){
		remy = false;
		eugine = false;
		mike = false;
		just = false;
		alex = false;
	}
	else{
		remy = true;
		if(remy && alex && mike && eugine && just){
			godMode()
		}
	}
}
function ju (){
	if(just){
		remy = false;
		eugine = false;
		mike = false;
		just = false;
		alex = false;
	}
	else{
		just = true;
		if(remy && alex && mike && eugine && just){
			godMode()
		}
	}
}
function godMode(){
	var people = document.getElementsByClassName('img-circle');
	var i;
	for(i =0; i<people.length; i++){
		people[i].src = "http://i0.kym-cdn.com/entries/icons/original/000/013/564/aP2dv.gif";


	}
}
