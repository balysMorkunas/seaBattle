
var document;
let socket = new WebSocket("ws://localhost:3002");
var nextTurn = "B";

function makeColor(id, color) {
	//  console.log(id);
	document.getElementById(id).style.backgroundColor = color;
}


//console.log(fleet1);


function colorTable(fleet) {

	//var fleetArray = fleet.getFleet();

	for (var i = 0; i < fleet.fleetArray.length; i++) {

		var ship = fleet.fleetArray[i];

		for (var j = 0; j < ship.shipCoordinates.length; j++) {

			var x = ship.shipCoordinates[j];

			document.getElementById(x).classList.add("ship");
			makeColor(x, "blue");
		}
	}
}
//player A or B as string
//enabled as boolean: 1 for enable, 0 for disable selecting interface
function selectingInterface(player) {

	document.getElementById("table2").onmouseover = function (event) {

		var target = event.target;
		if (!(target.classList.contains("col0")) && !(target.classList.contains("rowTop"))) {
			if (!(target.classList.contains("targeted"))) {
				makeColor(target.id, "green");
			}
		}
	};

	document.getElementById("table2").onmouseout = function (event) {

		var target = event.target;
		if (!(target.classList.contains("col0")) && !(target.classList.contains("rowTop"))) {
			if (!(target.classList.contains("targeted"))) {
				makeColor(target.id, "white");
			}
		}
	};

	document.getElementById("table2").onclick = function (event) {

		var target = event.target;
		if (!(target.classList.contains("col0")) && !(target.classList.contains("rowTop"))) {
			if (!(target.classList.contains("targeted"))) {
				var x = target.id.slice(0, -2);
				socket.send(player + "_TARGET_" + x);
				makeColor(target.id, "gray");
				target.classList.add("targeted");

			}
		}
	};



}


socket.onopen = function () {
	document.getElementById("table2").style.opacity = "0";
	var OwnPlayer;
	socket.send("READY");
	socket.onmessage = function (event) {
		document.getElementById("table2").style.opacity = "1";
		if (event.data.includes("A_WIN") && OwnPlayer == "A") {
			alert("YOU WON");

		}
		if (event.data.includes("A_WIN") && OwnPlayer == "B") {
			alert("YOU LOST");

		}
		if (event.data.includes("B_WIN") && OwnPlayer == "B") {
			alert("YOU WON");

		}
		if (event.data.includes("B_WIN") && OwnPlayer == "A") {
			alert("YOU LOST");

		}
		if (event.data.includes("WIN"))
			window.location = "/";


		if (event.data === "A_GAME") {

			let url_string = window.location.href;
			let url = new URL(url_string);
			let f = url.searchParams.get("fleet");
			let fleetString = atob(f);
			let fleetA = JSON.parse(fleetString);

			//get fleet from url and send it to server

			socket.send("**A**" + fleetString);



			colorTable(fleetA); //only colors first table
			document.getElementById("rowTop0").innerHTML = "pA";
			OwnPlayer = "A";
			

			//selectingInterface("A");
		}


		if (event.data === "B_GAME_START") {

			let url_string = window.location.href;
			let url = new URL(url_string);
			let f = url.searchParams.get("fleet");
			let fleetString = atob(f);
			let fleetB = JSON.parse(fleetString);


			socket.send("**B**" + fleetString);

			colorTable(fleetB);
			document.getElementById("rowTop0").innerHTML = "pB";
			OwnPlayer = "B";
			document.getElementById("rowTop0.2").innerHTML = "pA";



			//if(event.data === "B_GAME_START")

			selectingInterface("A");
			selectingInterface("B");
			if (OwnPlayer === "A") {
				document.getElementById("table2").style.pointerEvents = "none";
				
			}
			


		}

		if (event.data.includes("A_HIT") && OwnPlayer === "A") {

			let x = event.data.slice(6);
			makeColor(x + ".2", "red");
			//selectingInterface("A");

		}

		if (event.data.includes("A_HIT") && OwnPlayer === "B") {

			let x = event.data.slice(6);
			makeColor(x, "red");
			//selectingInterface("A");

		}

		if (event.data.includes("A_MISS") && OwnPlayer === "A") {

			nextTurn = "B";
			document.getElementById("table2").style.pointerEvents = "none";
			//selectingInterface("B");
		}

		if (event.data.includes("A_MISS") && OwnPlayer === "B") {

			let x = event.data.slice(7);
			makeColor(x, "gray");
			nextTurn = "B";
			//selectingInterface("A");
		}

		if (event.data.includes("B_HIT") && OwnPlayer === "B") {

			let x = event.data.slice(6);

			makeColor(x + ".2", "red");
			//selectingInterface("B");

		}

		if (event.data.includes("B_HIT") && OwnPlayer === "A") {

			let x = event.data.slice(6);
			makeColor(x, "red");
			//selectingInterface("A");

		}
		if (event.data.includes("B_MISS") && OwnPlayer === "B") {


			nextTurn = "A";
			document.getElementById("table2").style.pointerEvents = "none";

			//selectingInterface("A");
			//selectingInterface(OwnPlayer, 0);
			//selectingInterface(OpponentPlayer, 1);
		}

		if (event.data.includes("B_MISS") && OwnPlayer === "A") {
			let x = event.data.slice(7);
			makeColor(x, "gray");
			nextTurn = "A";
			//selectingInterface("A");
		}




		if (OwnPlayer == "A" || OwnPlayer == "B") {
			if (nextTurn === "B" && OwnPlayer === "B") {
				document.getElementById("table2").style.pointerEvents = "all";
				selectingInterface("B");

			}
			if (nextTurn === "A" && OwnPlayer === "A") {
				document.getElementById("table2").style.pointerEvents = "all";
				selectingInterface("A");

			}
		}



	};

};
