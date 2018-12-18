var document;
var id = 0;
var shipSizesCnt = 0;
var shipSizes = [5, 4, 3, 3, 2];
var fleet1 = new Fleet(1);
var vertical = 0;

document.getElementById("startButton").disabled = true;

//Constructor for the class Ship (takes an ID as an argument to count how many ships we have)
function Ship(id) {
	this.id = id;
	var shipCoordinates = [];
	this.shipCoordinates = shipCoordinates;

}
//Constructor for the class Fleet (takes and ID as an argument to count how many fleets we have)
function Fleet(id) {
	this.id = id;
	var fleetArray = [];
	this.fleetArray = fleetArray;

}


//Getter for a fleet object. Returns the Ships in an array
Fleet.prototype.getFleet = function () {
	return this.fleetArray;
};
//Getter for the ship object, which contains ships coordinates. (returns coordinates at ships position)
Ship.prototype.getShip = function (x) {
	return this.shipCoordinates[x];
};
//This function adds a new coordinate to a ship object. (only used when creating new ships)
Ship.prototype.addCoordinates = function (xyString) {
	this.shipCoordinates.push(xyString);
};
//This function prints out ship coordinates at all of its positions
//  Ship.prototype.printShip = function () {
//  	console.log("SHIP id number " + this.id);
//  	for (var i = 0; i < this.shipCoordinates.length; i++) {
//  		console.log(this.shipCoordinates[i]);
//  	}
//  };
//This function pushes a new ship to the fleet array
Fleet.prototype.addShip = function (shipObj) {
	this.fleetArray.push(shipObj);
};
//This function prints the fleet with all of its ships and their coordinates.

// Fleet.prototype.printFleet = function () {
// 	console.log("FLEET id number " + this.id);
// 	for (var i = 0; i < this.fleetArray.length; i++) {
// 		this.fleetArray[i].printShip();
// 	}
// }

//These methods are for changing color of specific objects (specified in the argument)
function makeGreen(id) {
	if (!(id.includes("rowTop0"))) {
		document.getElementById(id).style.backgroundColor = "#FF6347";
	}
}
function makeBlue(id) {
	document.getElementById(id).style.backgroundColor = "#444444";
}
function makeWhite(id) {
	document.getElementById(id).style.backgroundColor = "#e7e3e3";
}

function makeRed(id) {
	document.getElementById(id).style.backgroundColor = "red";
}




// takes an id, amount of spaces to check to the right or to down
// vertical is true for vertical, false for horizontal
//returns false if overlap, true if ok
function overlapCheck(id, numberRight, vertical) {
	var flag = 1;

	if (vertical == false) {
		let k = parseInt(id.charAt(1));
		if (id.includes("10")) {
			k = 10;
		}
		if (k + numberRight > 11) {
			k = 11 - numberRight;
		}
		if (document.getElementById(id).className.includes("col0"))
			k = 1;

		for (let i = k; i < numberRight + k; i++) {
			let x = id;
			x = x.slice(0, 1);

			if ((document.getElementById(x + i).className.includes("ship"))) {
				flag = 0;
			}

		}
	}
	// k here is in ASCII code. Converted by charCodeAt(); and later converted back to a string
	// to get the coordinate back.
	if (vertical == true) {
		let k = id.charCodeAt(0);
		if (k + numberRight > "K".charCodeAt(0)) {
			k = "K".charCodeAt(0) - numberRight;
		}
		for (let i = k; i < numberRight + k; i++) {
			let x = id;
			x = x.slice(1);
			if ((document.getElementById(String.fromCharCode(i) + x).className.includes("ship"))) {
				flag = 0;
			}
		}
	}

	if (flag == 1) {

		return true;
	}
	// console.log("overlap");
	return false;
}

document.getElementById("rotate").onclick = function () {
	vertical = !vertical;
	//console.log(vertical);
};

document.getElementById("fullbutton").onclick = function () {
	var doc = document.documentElement;

	if (doc.requestFullscreen) {
		doc.requestFullscreen();
	} else if (doc.webkitRequestFullscreen) {
		doc.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	} else if (doc.mozRequestFullScreen) {
		doc.mozRequestFullScreen();
	}

	return false;

};

//This function colors the appropriate amount of ship cells when hovored over
document.getElementById("table1").onmouseover = function (event) {


	let target = event.target;
	//THis part excludes the cells that contain letters and numbers to NOT be colored
	if (target.className != "rowTop") {
		let k = parseInt(target.id.charAt(1));

		//This if guard takes care of the situation when our coordinate number becomes double digit.. 

		if (target.id.includes("10")) {
			k = 10;
		}

		if (target.className.includes("col0"))
			k = 1;
		//Here we make sure that the ship position does not go out of bounds of the grid

		if (k + shipSizes[shipSizesCnt] > 11) {
			k = k = 11 - shipSizes[shipSizesCnt];
			//console.log(k);
		}
		//if there is enough space on the board, start checking for overlap, if all good, print to the right

		var overlapBoolean = overlapCheck(target.id, shipSizes[shipSizesCnt], vertical);
		//Finally coloring the needed cells.

		if (vertical == false) {
			for (let i = k; i < shipSizes[shipSizesCnt] + k; i++) {
				let x = target.id;
				x = x.slice(0, 1);
				if (overlapBoolean == true) {
					makeGreen(x + i);
				}
				else {

					makeRed(x + i);
				}
			}
		}
		if (vertical == true && !(target.className.includes("col0"))) {
			let k = target.id.charCodeAt(0);
			if (k + shipSizes[shipSizesCnt] > "K".charCodeAt(0)) {
				k = "K".charCodeAt(0) - shipSizes[shipSizesCnt];
			}

			for (let i = k; i < shipSizes[shipSizesCnt] + k; i++) {
				let x = target.id;
				x = x.slice(1);
				if (overlapBoolean == true) {
					makeGreen((String.fromCharCode(i) + x));
				}
				else {
					makeRed((String.fromCharCode(i) + x));
				}
				//console.log(String.fromCharCode(i) + x);
			}
		}
	}
};
//This function does mainly the opposite of the onhover function. But the cells marked with class
//ship must stay blue so we exclude them with an if statement

document.getElementById("table1").onmouseout = function (event) {

	if (shipSizesCnt >= shipSizes.length) {
		document.getElementById("startButton").disabled = false;
	}
	let target = event.target;
	if (target.className != "rowTop") {
		var k = parseInt(target.id.charAt(1));
		if (target.id.includes("10")) {
			k = 10;
		}
		// Checking for out of bounds, then selecting appropriate cells with Slice(), coloring.

		if (k + shipSizes[shipSizesCnt] > 11) {
			k = 11 - shipSizes[shipSizesCnt];
			//console.log(k);
		}

		if (target.className.includes("col0"))
			k = 1;

		if (k + shipSizes[shipSizesCnt] <= 11) {
			if (vertical == false) {
				for (var i = k; i < shipSizes[shipSizesCnt] + k; i++) {
					let x = target.id;
					x = x.slice(0, 1);

					if (!(document.getElementById(x + i).className.includes("ship"))) {
						makeWhite(x + i);
					}
					if ((document.getElementById(x + i).className.includes("ship"))) {
						makeBlue(x + i);
					}

				}
			}
			if (vertical == true) {
				let k = target.id.charCodeAt(0);
				if (k + shipSizes[shipSizesCnt] > "K".charCodeAt(0)) {
					k = "K".charCodeAt(0) - shipSizes[shipSizesCnt];
				}
				for (let i = k; i < shipSizes[shipSizesCnt] + k; i++) {
					let x = target.id;
					x = x.slice(1);

					if (!(document.getElementById(String.fromCharCode(i) + x).className.includes("ship"))) {
						makeWhite(String.fromCharCode(i) + x);
					}
					if ((document.getElementById(String.fromCharCode(i) + x).className.includes("ship"))) {
						makeBlue(String.fromCharCode(i) + x);
					}
				}
			}
		}

	}
};

//
document.getElementById("table1").onclick = function (event) {

	let target = event.target;
	id++;
	var ship1 = new Ship(id);
	var k = parseInt(target.id.charAt(1));
	if (target.id.includes("10")) {
		k = 10;
	}
	if (k + shipSizes[shipSizesCnt] > 11) {
		k = 11 - shipSizes[shipSizesCnt];
		//console.log(k);
	}
	if (target.className.includes("col0"))
		k = 1;
	if (target.className != "rowTop" && !target.className.includes("col0") && (k + shipSizes[shipSizesCnt] <= 11)) {

		var flag = overlapCheck(target.id, shipSizes[shipSizesCnt], vertical);
		if (flag == true && vertical == false) {
			for (var i = k; i < shipSizes[shipSizesCnt] + k; i++) {
				let x = target.id;
				x = x.slice(0, 1);
				ship1.addCoordinates(x + i);
				document.getElementById(x + i).classList.add("ship");
				makeBlue(x + i);
			}


			fleet1.addShip(ship1);
			shipSizesCnt++;
			fleet1.printFleet();
		}
		if (flag == true && vertical == true) {
			let k = target.id.charCodeAt(0);
			if (k + shipSizes[shipSizesCnt] > "K".charCodeAt(0)) {
				k = "K".charCodeAt(0) - shipSizes[shipSizesCnt];
			}
			for (let i = k; i < shipSizes[shipSizesCnt] + k; i++) {

				let x = target.id;
				x = x.slice(1);
				ship1.addCoordinates(String.fromCharCode(i) + x);
				document.getElementById(String.fromCharCode(i) + x).classList.add("ship");
				makeBlue(String.fromCharCode(i) + x);
			}
			fleet1.addShip(ship1);
			shipSizesCnt++;
			fleet1.printFleet();
		}

	}

};

//This function resets the grid by deleting all the placed ships and their objects/
document.getElementById("reset").onclick = function () {
	//iterate through all objects and make them white, remove ship class.

	for (let i = 0; i < fleet1.fleetArray.length; i++) {
		for (let j = 0; j < fleet1.fleetArray[i].shipCoordinates.length; j++) {
			makeWhite(fleet1.fleetArray[i].getShip(j));
			document.getElementById(fleet1.fleetArray[i].getShip(j)).classList.remove("ship");
		}
	}
	shipSizesCnt = 0;
	id = 0;
	fleet1 = new Fleet(1);
	document.getElementById("startButton").disabled = true;
};

document.getElementById("startButton").onclick = function () {

	var myFleet = JSON.stringify(fleet1);
	var encodedFleet = btoa(myFleet);
	window.location.href = "/play?fleet=" + encodedFleet;

};



