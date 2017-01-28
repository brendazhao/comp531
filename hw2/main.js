//we have five set of image from the website
var imggroup=[["http://www.rice.edu/imagelibrary/originals/15320.JPG",
			"http://www.rice.edu/imagelibrary/originals/15321.JPG",
			"http://www.rice.edu/imagelibrary/originals/15324.JPG",
			"http://www.rice.edu/imagelibrary/originals/15326.JPG"],
			["http://www.rice.edu/imagelibrary/originals/15327.JPG",
			"http://www.rice.edu/imagelibrary/originals/15328.JPG",
			"http://www.rice.edu/imagelibrary/originals/15330.JPG",
			"http://www.rice.edu/imagelibrary/originals/15331.JPG"],
			["http://www.rice.edu/imagelibrary/originals/15333.JPG",
			"http://www.rice.edu/imagelibrary/originals/15334.JPG",
			"http://www.rice.edu/imagelibrary/originals/15335.JPG",
			"http://www.rice.edu/imagelibrary/originals/15338.JPG"],
			["http://www.rice.edu/imagelibrary/originals/15341.JPG",
			"http://www.rice.edu/imagelibrary/originals/15343.JPG",
			"http://www.rice.edu/imagelibrary/originals/15344.JPG",
			"http://www.rice.edu/imagelibrary/originals/15318.JPG"],
			["http://www.rice.edu/imagelibrary/originals/15312.JPG",
			"http://www.rice.edu/imagelibrary/originals/15314.JPG",
			"http://www.rice.edu/imagelibrary/originals/15315.JPG",
			"http://www.rice.edu/imagelibrary/originals/15317.JPG"]];
//counter for the interval
var counter=[0,0,0,0,0];
//set the interval to update image
var interval=[setInterval(function(){updateImg(0)},getRandom1to5(0)*1000),
				setInterval(function(){updateImg(1)},getRandom1to5(1)*1000),
				setInterval(function(){updateImg(2)},getRandom1to5(2)*1000),
				setInterval(function(){updateImg(3)},getRandom1to5(3)*1000),
				setInterval(function(){updateImg(4)},getRandom1to5(4)*1000)];
//update image 
function updateImg(index){
	document.getElementById("img"+index).src= imggroup[index][counter[index]++ % imggroup[index].length]
}
//get a random number from one to five
function getRandom1to5(index){
	var rand=Math.floor(Math.random()*5+1);
	document.getElementById("indictor"+index).innerHTML=rand;
	return rand;
}
function btnAction(btnid){
	var index=btnid.charAt(btnid.length-1);
	if(document.getElementById(btnid).innerHTML=="STOP"){
		clearTheInterval(index);
	}
	else{
		restartTheInterval(index);
	}
}
//clear the interval
function clearTheInterval(index){
	clearInterval(interval[index]);
	document.getElementById("btn"+index).innerHTML="START";
	document.getElementById("indictor"+index).innerHTML="∞";
}
//restart the interval
function restartTheInterval(index){
	clearInterval(interval[index]);
	interval[index]=setInterval(function(){updateImg(index)},getRandom1to5(index)*1000)
	document.getElementById("btn"+index).innerHTML="STOP";
}