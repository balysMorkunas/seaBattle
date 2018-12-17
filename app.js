var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");
//var messages = require("./public/javascripts/messages");
var gameStatus = require("./stats.js");
var websocket = require("ws");
var Game = require("./public/game");

var cookies = require("cookie-parser");
var fleetA, fleetB;
var port = process.argv[2];
var app = express();
app.use(cookies());
app.set("view engine", "ejs");
app.get("/", (req, res) => {
	let cnt = 0; //in case of no cookie
	if(req.signedCookies){
		cnt = parseInt(req.cookies.nr_visited);
	}
	if(isNaN(cnt))
		cnt=0;
	cnt++;
	res.cookie("nr_visited", cnt);
	res.render("splash.ejs", { shipPartsSunk: gameStatus.shipPartsSunk, gamesStarted: gameStatus.gamesStarted, gamesCompleted: gameStatus.gamesCompleted, visitCnt: cnt });
});

app.get("/play", indexRouter);
var id = 0;

/*CLAUDIA'S WAY*/
// app.get("/", (req, res) => {
//   res.render("splash.ejs", { gamesInitialized: gameStatus.gamesInitialized, gamesCompleted: gameStatus.gamesCompleted });
// });

app.use(express.static(__dirname + "/public"));
// var server = http.createServer(app).listen(port, function () {
//   console.log("Listening on port: " + port);
// })

var server = http.createServer(app);

const wss = new websocket.Server({ server });
var websockets = [];//property: websocket, value: game


var currentGame = new Game(id++);
var connectionID = 0; //each websocket recieves unique ID.

//This function is used to check whether an accurate shot was made.
function checkShot(fleet1, coordinate) {

	fleet1 = JSON.stringify(fleet1);

	if (fleet1.includes(coordinate)) return true;
	else return false;
}




wss.on("connection", function connection(ws) {

	let con = ws;
	con.id = connectionID++;

	ws.onmessage = function (event) {


		//console.log(event.data);
		if (event.data === "READY") {
			let playerType = currentGame.addPlayer(con);

			if (playerType === "A") {

				ws.send("A_GAME");

			}
			if (playerType === "B") {
				ws.send("B_GAME_START");
				gameStatus.gamesStarted++;
			}
			if (playerType === "N") {

				currentGame = new Game(id++);
				playerType = currentGame.addPlayer(con);
				ws.send("A_GAME");
			}
			websockets[con.id] = currentGame;
			//console.log(playerType);
			//console.log(websockets[con.id]);
			//console.log(con.id);
			//console.log("Player %s placed in game %s as %s", con.id, currentGame.id, playerType);
		}

		// This waits for the fleet objects and converts them to Fleet objects.
		if (event.data.includes("**A**")) {
			// var fleetA = new Fleet(con.id);
			fleetA = event.data;
			fleetA = fleetA.slice(5);
			fleetA = JSON.parse(fleetA);

			//console.log(fleetA);

		}
		if (event.data.includes("**B**")) {
			// var fleetB = new Fleet(con.id);
			fleetB = event.data;
			fleetB = fleetB.slice(5);
			fleetB = JSON.parse(fleetB);

			//console.log(fleetB);

		}

		//This waits for a coordinate, checks if its hit or miss and responds back to the shooter 
		if (event.data.includes("A_TARGET")) {

			let gameObj = websockets[con.id];

			//console.log(gameObj);
			var coordinate = event.data.slice(9);
			if (checkShot(fleetB, coordinate)) {
				gameObj.playerA.send("A_HIT_" + coordinate);
				gameObj.playerB.send("A_HIT_" + coordinate);
				gameStatus.shipPartsSunk++;
				gameObj.countA++;
				if (gameObj.countA == 17){
					gameObj.playerA.send("A_WIN");
					gameObj.playerB.send("A_WIN");
					gameStatus.gamesCompleted++;
				}

			}
			else {
				gameObj.playerA.send("A_MISS_" + coordinate);
				gameObj.playerB.send("A_MISS_" + coordinate);

			}

		}
		if (event.data.includes("B_TARGET")) {
			let gameObj = websockets[con.id];
			let coordinate = event.data.slice(9);
			if (checkShot(fleetA, coordinate)) {
				gameObj.playerA.send("B_HIT_" + coordinate);
				gameObj.playerB.send("B_HIT_" + coordinate);
				gameStatus.shipPartsSunk++;

				gameObj.countB++;
				if (gameObj.countB == 17) {
					gameObj.playerB.send("B_WIN");
					gameObj.playerA.send("A_WIN");
					gameStatus.gamesCompleted++;
				}


			}
			else {
				gameObj.playerA.send("B_MISS_" + coordinate);
				gameObj.playerB.send("B_MISS_" + coordinate);

			}
		}
	};

});


server.listen(port);