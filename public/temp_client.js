var WebSocket = require("ws");

var socket = new WebSocket("ws://localhost:3002");
socket.onmessage = function (event) {
    //document.getElementById("table1").innerHTML = event.data;
}

socket.onopen = function () {
    socket.send("The server is now open!");
   // document.getElementById("table1").innerHTML = "Sending a first message to the server ...";
};