'use strict'
//the start position of the sun and the car
var sun_x=30
var sun_y=60
var car_x=30
var car_y=380
var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	//button's space
	var button_space=48
	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	
	//store the bilding info
	var bdInfo=[]

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var blgColor = blgColors[ Math.floor(Math.random()*blgColors.length)]

		c.fillStyle= blgColor
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"

		bdInfo.push({blgHeight:blgHeight,blgWidth:blgWidth,blgColor:blgColor,x0:x0})
	}
	//update Building's light
	var updateBd=function(){
		bdInfo.forEach(function(building){
			c.fillStyle= building.blgColor
			c.fillRect(building.x0, floor - building.blgHeight, building.blgWidth, building.blgHeight)
			for (var y = floor - floorSpacing; y > floor - building.blgHeight; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < building.blgWidth - windowWidth; x += windowSpacing + windowWidth) {
					if(Math.random()>0.5)
						c.fillStyle = building.blgColor;
					else
						c.fillStyle = "yellow";
					c.fillRect(building.x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		})
	}
	//update Sun
	var updateSun=function(){
		//update position
		sun_x=(sun_x + canvas.width/10)%canvas.width
		sun_y=60+Math.sin(sun_x)*30
		//draw sun
		c.fillStyle="red";
		c.beginPath()
		c.arc(sun_x,sun_y,30,0,2*Math.PI,false)
		c.closePath()
		c.fill()
	}
	//update Car
	var updateCar=function(){
		//update position
		car_x=(car_x+10)%canvas.width
		//draw car
		c.fillStyle="purple";
		c.fillRect(car_x-20,car_y-50,120,50)

		c.fillStyle="black";
		c.beginPath()
		c.arc(car_x+10,car_y+10,15,0,2*Math.PI,false)
		c.closePath()
		c.fill()

		c.fillStyle="black";
		c.beginPath()
		c.arc(car_x+65,car_y+10,15,0,2*Math.PI,false)
		c.closePath()
		c.fill()

	}
	//update the building's height
	canvas.addEventListener('click',function(e){
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		bdInfo.forEach(function(building){
			//3em is about 48 pixel
			if (y>floor-building.blgHeight+button_space && y < floor+button_space && x >building.x0 && x < building.x0 + building.blgWidth){
				building.blgHeight += 20
			}
		})
	})
	//clear the canvas
	c.clearRect(0,0,canvas.width,canvas.height/2);

	return {
		build: build,
		updateBd: updateBd,
		updateSun:updateSun,
		updateCar:updateCar
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	setInterval(runrun,200);
	function runrun(){
		createApp(document.querySelector("canvas"))
		app.updateBd();
		app.updateSun();
		app.updateCar();
		document.getElementById("build").onclick = app.build
	}
}