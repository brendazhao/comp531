var btn=document.getElementById("mybutton");
var info=document.getElementById("info");

window.onload=function(){
	btn.addEventListener('mouseover',changeposition,false);
	btn.addEventListener('click',winOrRestart,false);
}
function changeposition(){
	//the keycode of shift is 16
	if(!event.shiftKey){
		var rand_width=Math.floor(Math.random()*(window.innerWidth-btn.offsetWidth));
		var rand_height=Math.floor(Math.random()*(window.innerHeight-btn.offsetHeight));

		btn.setAttribute("style","position:absolute;");
		btn.style.left=rand_width+"px";
		btn.style.top=rand_height+"px";
	}
}
function winOrRestart(){
	if(btn.innerHTML=="Click Me"){
		btn.removeEventListener('mouseover',changeposition);
		info.style.display="";	
		btn.innerHTML="Play Again";
	}
	else if(btn.innerHTML=="Play Again"){
		btn.addEventListener('mouseover',changeposition,false);
		info.style.display="none";
		changeposition();
		btn.innerHTML="Click Me";
	}
}