var Direction = new function () { 
	this.UP = 38; 
	this.RIGHT = 39; 
	this.DOWN = 40; 
	this.LEFT = 37; 
}; 

var Common = new function () { 
	this.width = 40; 
	this.height = 40; 
	this.speed = 150; /*the smaller the faster*/ 
	this.workThread = null; 
};

/*init some field*/
var score;
var foodtype;
var lastfoodtype=0;
var turnshorter=-1; 
var changeDir=0;

var bestscore=0;
var operationtime=0;

var username;

function startgame(control){
	document.getElementById("winnername").innerHTML=getCookie("username");
		document.getElementById("bestscore").innerHTML=getCookie("bestscore");
	document.getElementById("besttime").innerHTML=getCookie("operationtime");
	/*init some field*/
	score=0;
	operationtime=0;
	document.getElementById("operationtime").innerHTML=operationtime;
	lastfoodtype=0;
	turnshorter=-1;
	//changeDir=0;
	/*init panel*/	
	document.getElementById("hid").innerHTML="Your score is: ";
	document.getElementById("score").innerHTML="---";
	document.getElementById("username").disabled=false;
	document.getElementById("selSize").disabled=false;
	document.getElementById("startBtn").disabled=true;
	document.getElementById("upBtn").disabled=true;
	document.getElementById("downBtn").disabled=true;
	document.getElementById("leftBtn").disabled=true;
	document.getElementById("rightBtn").disabled=true;
	document.getElementById("selSize").onchange = function () { 
		Common.width = this.value; 
		Common.height = this.value; 
		control.Init("pannel");	
	}
	document.getElementById("username").oninput=function(){
		document.getElementById("startBtn").disabled=false;
	}
	username=document.getElementById.innerHTML;
	control.Init("pannel");

	/*start the game again*/ 	
	document.getElementById("startBtn").onclick = function () {
		document.getElementById("selSize").disabled=true; 
		document.getElementById("username").disabled=true;
		document.getElementById("res").style.display="none";
		document.getElementById("score").innerHTML=score;
		
		document.getElementById("startBtn").disabled=true;	
		document.getElementById("upBtn").disabled=false;
		document.getElementById("downBtn").disabled=false;
		document.getElementById("leftBtn").disabled=false;
		document.getElementById("rightBtn").disabled=false;
		control.Start(); 
		this.disabled = true; 
	}; 
}
var Main = new function () { 
	var control = new Control(); 
	window.onload = function () { 
		startgame(control);
	};
};

/*central controller*/ 
function Control() { 
	
	this.snake = new Snake(); 
	this.food = new Food(); 
	/*init, build a table*/ 
	this.Init = function (pid) { 
		var html = []; 
		html.push('<table class="main">'); 
		for (var y = 0; y < Common.height; y++) { 
			html.push("<tr>"); 
			for (var x = 0; x < Common.width; x++) { 
				html.push('<td id="box_' + x + "_" + y + '"> </td>'); 
			} 
			html.push("</tr>"); 
		} 
		html.push("</table>"); 
		this.pannel = document.getElementById(pid); 
		this.pannel.innerHTML = html.join(""); 
	}; 
	/*start the game listen to the keyboard, build foods, refresh thread*/ 
	this.Start = function () { 
		var me = this; 
		var addfood=0;
		this.MoveSnake = function (ev) { 
			var evt = window.event || ev; 
			me.snake.SetDir(evt.keyCode); 
			if(evt.keyCode==37||evt.keyCode==38||evt.keyCode==39||evt.keyCode==40){
			changeDir++;
			document.getElementById("operationtime").innerHTML=changeDir;
}
		}; 
		this.MoveSnake2=function(ev){
			var evt=window.event|| ev;
			//up
			if(evt.srcElement.value=="UP"){
				me.snake.SetDir(Direction.UP)
				changeDir++;
				document.getElementById("operationtime").innerHTML=changeDir;
			}
			//down
			else if(evt.srcElement.value=="DOWN"){
				me.snake.SetDir(Direction.DOWN)
				changeDir++;
				document.getElementById("operationtime").innerHTML=changeDir;
			}
			else if(evt.srcElement.value=="LEFT"){
				me.snake.SetDir(Direction.LEFT)
				changeDir++;
				document.getElementById("operationtime").innerHTML=changeDir;
			}
			else if(evt.srcElement.value=="RIGHT"){
				me.snake.SetDir(Direction.RIGHT)
				changeDir++;
				document.getElementById("operationtime").innerHTML=changeDir;
			}
		}
		try { 
			document.attachEvent("onkeydown", this.MoveSnake); 
		} catch (e) { 
			document.addEventListener("keydown", this.MoveSnake, false); 
		} 
		try { 
			document.attachEvent("onmousedown",this.MoveSnake2);
		} catch (e) { 
			document.addEventListener("click", this.MoveSnake2, false); 
		} 
		me.food.Create();
		
		Common.workThread = setInterval(function () { 
			if(addfood%50==49){
				me.food.Create();
			}
			me.snake.Eat(me.food); 
			me.snake.Move(); 
			addfood++;
		},Common.speed); 
	}; 
} 
/*snake*/ 
function Snake() {

	this.isDone = false; 
	this.dir = Direction.RIGHT; 
	this.pos = new Array(new Position()); 
	/*move the snake forword and judge if it is the end of the game*/ 
	this.Move = function () { 
		document.getElementById("box_" + this.pos[0].X + "_" + this.pos[0].Y).className = ""; 
		
		//move one step forward
		for (var i = 0; i < this.pos.length - 1; i++) { 
			this.pos[i].X = this.pos[i + 1].X; 
			this.pos[i].Y = this.pos[i + 1].Y; 
		} 
		//set the head's position
		var head = this.pos[this.pos.length - 1]; 
		switch (this.dir) { 
			case Direction.UP: 
				head.Y--; 
				break; 
			case Direction.RIGHT: 
				head.X++; 
				break; 
			case Direction.DOWN: 
				head.Y++; 
				break; 
			case Direction.LEFT: 
				head.X--; 
				break; 
		} 
		this.pos[this.pos.length - 1] = head; 
		//draw the snake and judge if it is the end of the game
		var len=this.pos.length;
		
		if(turnshorter==1) {//keep
			len=len-1;
		}
		for (var i = 0; i < len; i++) { 
			var isExits = false; 
			for (var j = i +1; j < len; j++) 
				if (this.pos[j].X == this.pos[i].X && this.pos[j].Y == this.pos[i].Y) { 
					isExits = true; 
					break; 
				} 
				if (isExits) { 
					this.Over();/*bit himself*/ 
					break; 
				} 
				var obj = document.getElementById("box_" + this.pos[i].X + "_" + this.pos[i].Y); 
				if (obj) 
					obj.className = "snake"+lastfoodtype; 
				else { 
					this.Over();/*out of boundrary*/ 
					break; 
				} 
		} 
		this.isDone = true; 
	}; 
	/*game is over*/ 
	this.Over = function () { 
		clearInterval(Common.workThread); 

		username=document.getElementById("username").value;
		operationtime=document.getElementById("operationtime").innerHTML;

		document.getElementById("score").innerHTML="---";
		document.getElementById("res").style.display="block";
		document.getElementById("endgame").innerHTML="Game Over!";
		document.getElementById("scoreshow").innerHTML="Your final score is "+score+"!";
		document.getElementById("msg").innerHTML="Press start to restart the game!"
		if(getCookie("username") == "" ||(parseInt(getCookie("bestscore"))<score)){
		setCookie("username",username,30);
		setCookie("bestscore", score, 30);
		setCookie("operationtime",operationtime,30);
}
		
		document.getElementById("winnername").innerHTML=getCookie("username");
		document.getElementById("bestscore").innerHTML=getCookie("bestscore");
		document.getElementById("besttime").innerHTML=getCookie("operationtime");
		//prepare for restarting the game
		control = new Control(); 
		startgame(control);
	} 
	/*eat food*/ 
	this.Eat = function (food) {
		var head = this.pos[this.pos.length - 1]; 
		var isEat = false; 
		var flag=false;
		switch (this.dir) { 
			case Direction.UP: 
				if (head.X == food.pos.X && head.Y == food.pos.Y + 1) isEat = true; 
				break; 
			case Direction.RIGHT: 
				if (head.Y == food.pos.Y && head.X == food.pos.X - 1) isEat = true; 
				break; 
			case Direction.DOWN: 
				if (head.X == food.pos.X && head.Y == food.pos.Y - 1) isEat = true; 
				break; 
			case Direction.LEFT: 
				if (head.Y == food.pos.Y && head.X == food.pos.X + 1) isEat = true; 
				break; 
		} 
		if (isEat) {
			if(foodtype==1){
				turnshorter=1;//keep the size
			}
			else{
				turnshorter=2; // will become longer
			}
			ScoreJudge(foodtype); 
			lastfoodtype=foodtype;
			this.pos[this.pos.length] = new Position(food.pos.X, food.pos.Y); 
			food.Create(this.pos);	
		} 
	}; 
	/*control the direction*/ 
	this.SetDir = function (dir) { 
		switch (dir) { 
		case Direction.UP: 
			if (this.isDone && this.dir != Direction.DOWN) { this.dir = dir; this.isDone = false; } 
			break; 
		case Direction.RIGHT: 
			if (this.isDone && this.dir != Direction.LEFT) { this.dir = dir; this.isDone = false; } 
			break; 
		case Direction.DOWN: 
			if (this.isDone && this.dir != Direction.UP) { this.dir = dir; this.isDone = false; } 
			break; 
		case Direction.LEFT: 
			if (this.isDone && this.dir != Direction.RIGHT) { this.dir = dir; this.isDone = false; } 
			break; 
		} 
	}; 
} 
/*food*/ 
function Food() { 
	this.pos = new Position(); 
	/*build the food randomly*/ 
	this.Create = function (pos) { 
		document.getElementById("box_" + this.pos.X + "_" + this.pos.Y).className = ""; 
		var x = 0, y = 0, isCover = false; 
		/*you can not build a food in the snake's place*/ 
		do { 
			x = parseInt(Math.random() * (Common.width - 1)); 
			y = parseInt(Math.random() * (Common.height - 1)); 
			isCover = false; 
			if (pos instanceof Array) { 
				for (var i = 0; i < pos.length; i++) { 
					if (x == pos[i].X && y == pos[i].Y) { 
						isCover = true; 
						break; 
					} 
				} 
			} 
		} while (isCover); 
		this.pos = new Position(x, y); 
		foodtype = Math.floor(Math.random()*3+1);
		if(lastfoodtype==foodtype){
			foodtype=foodtype%3+1;
		}
		document.getElementById("box_" + x + "_" + y).className = "food"+foodtype; 
	}; 
} 
function ScoreJudge(type){
	if(type==1){//red
		score=score+5;
	}
	else if(type==2){//black
		score=score-1;
	}
	document.getElementById("score").innerHTML=score;
}

function Position(x, y) { 
	this.X = 0; 
	this.Y = 0; 
	if (arguments.length >= 1) this.X = x; 
	if (arguments.length >= 2) this.Y = y; 
} 

// Function to set the cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get the cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
    return "";
}
