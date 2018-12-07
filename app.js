
var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");
var websocket = require("ws");
var Game = require("./game");

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
var server = http.createServer(app).listen(port, function () {
  console.log("Listening on port: " + port);
})

const wss = new websocket.Server({ server });
var websockets = {};//property: websocket, value: game

//var currentGame = new Game(id++);
var connectionID = 0; //each websocket recieves unique ID.

wss.on("connection", function connection(ws) {


  setTimeout(function () {
    console.log("Connection state: " + ws.readyState);
    ws.send("Thanks for the message. -- Server.");
    ws.close();
    console.log("Connection state: " + ws.readyState);
  }, 2000);
  ws.on("message", function incoming(message) {
    console.log("[LOG]" + message);
  });
});
