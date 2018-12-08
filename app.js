var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");
var websocket = require("ws");
var Game = require("./public/game");


var port = process.argv[2];
var app = express();

app.get("/", indexRouter);
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
var websockets = {};//property: websocket, value: game


var currentGame = new Game(id++);
var connectionID = 0; //each websocket recieves unique ID.

wss.on("connection", function connection(ws) {


  // setInterval(function () {
  //   console.log("Connection state: " + ws.readyState);
  //   ws.send("Thanks for the message. -- Server.");
  //   ws.close();
  //   console.log("Connection state: " + ws.readyState);
  // }, 2000);
  // ws.on("message", function incoming(message) {
  //   console.log("[LOG]" + message);

  // });
  
  let con = ws;
  con.id = connectionID++;
  ws.onmessage = function (event) {
    var flag = 0;
    //console.log(event.data);
    if (event.data === "READY") {
      let playerType = currentGame.addPlayer(con);
      if (playerType === "A") {

        ws.send("A_GAME");

      }
      if (playerType === "B") {
        ws.send("B_GAME_START");
      }
      if (playerType === "N") {

        currentGame = new Game(id++);
        playerType = currentGame.addPlayer(con);
      }
      websockets[con.id] = currentGame;
      //console.log(playerType);
      console.log("Player %s placed in game %s as %s", con.id, currentGame.id, playerType);
    }
  }


});

server.listen(port);