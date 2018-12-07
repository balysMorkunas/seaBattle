/* every game has two players, identified by their WebSocket */
var game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
};

var socket = new WebSocket("ws://localhost:3002");
socket.onmessage = function (event) {
    document.getElementById("table1").innerHTML = event.data;
}

socket.onopen = function () {
    socket.send("Hello from the client!");
    document.getElementById("table1").innerHTML = "Sending a first message to the server ...";
};