

//These methods are for changing color of specific objects (specified in the argument)
// function makeBlue(id) {
//         document.getElementById(id).style.backgroundColor = "blue";
// }
// function makeGreen(id) {
//         document.getElementById(id).style.backgroundColor = "green";
// }
// function makeWhite(id) {
//         document.getElementById(id).style.backgroundColor = "white";
// }
var document;

function makeColor(id, color) {
    //console.log(id);
    document.getElementById(id).style.backgroundColor = color;
}



var socket = new WebSocket("ws://localhost:3002");
var nextTurn = "B";
//console.log(fleet1);


function colorTable(fleet, id) {

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

function selectingInterface(player) {
    document.getElementById("table2").onmouseover = function (event) {
        let target = event.target;
        if (!(target.classList.contains("col0")) && !(target.classList.contains("rowTop"))) {
            if (!(target.classList.contains("targeted"))) {
                makeColor(target.id, "green");
            }
        }
    };

    document.getElementById("table2").onmouseout = function (event) {
        let target = event.target;
        if (!(target.classList.contains("col0")) && !(target.classList.contains("rowTop"))) {
            if (!(target.classList.contains("targeted"))) {
                makeColor(target.id, "white");
            }
        }
    };

    document.getElementById("table2").onclick = function (event) {

        let target = event.target;
        if (!(target.classList.contains("col0")) && !(target.classList.contains("rowTop"))) {
            if (!(target.classList.contains("targeted"))) {
                var x = target.id.slice(0, -2);
                console.log("TARGETING " + x);
                socket.send(player + "_TARGET_" + x);
                makeColor(target.id, "gray");
                target.classList.add("targeted");
                
                return;
            }
        }
    };
    
    return;
}


socket.onopen = function (event) {
    var OwnPlayer;
    var OpponentPlayer;
    socket.send("READY");
    console.log("I am ready");
    socket.onmessage = function (event) {
        if (event.data === "A_GAME" ) {
            console.log("I am player A");

            var url_string = window.location.href;
            var url = new URL(url_string);
            var f = url.searchParams.get("fleet");
            var fleetString = atob(f);
            var fleetA = JSON.parse(fleetString);

            //get fleet from url and send it to server

            socket.send("**A**" + fleetString);



            colorTable(fleetA); //only colors first table
            document.getElementById("rowTop0").innerHTML = "pA";
            OwnPlayer="A";
            document.getElementById("rowTop0.2").innerHTML = "pB";
            OpponentPlayer= "B";

            //selectingInterface("A");
        }


        if (event.data === "B_GAME_START") {
            console.log("I am player B");

            var url_string = window.location.href;
            var url = new URL(url_string);
            var f = url.searchParams.get("fleet");
            var fleetString = atob(f);
            var fleetB = JSON.parse(fleetString);


            socket.send("**B**" + fleetString);

            colorTable(fleetB);
            document.getElementById("rowTop0").innerHTML = "pB";
            OwnPlayer= "B";
            document.getElementById("rowTop0.2").innerHTML = "pA";
            OpponentPlayer = "A";


            selectingInterface("B");


        }

        if (event.data.includes("A_HIT") && OwnPlayer==="A") {
            console.log("I hit something,yay ");
            var x = event.data.slice(7);
            makeColor(x+".2","red");
            //selectingInterface("A");

        }

        if (event.data.includes("A_HIT") && OwnPlayer==="B") {
            console.log("I was hit, oh no ");
            var x = event.data.slice(7);
            makeColor(x,"red");
            //selectingInterface("A");

        }

        if (event.data.includes("A_MISS") && OwnPlayer==="A") {
            console.log("I missed, oh no ");
            nextTurn="B";
            //selectingInterface("B");
        }

        if (event.data.includes("A_MISS") && OwnPlayer==="B") {
            console.log("I dodged, yay ");
            var x = event.data.slice(7);
            makeColor(x,"gray");
            nextTurn="B";
            //selectingInterface("A");
        }

        if (event.data.includes("B_HIT") && OwnPlayer==="B") {
            console.log("I hit something,yay ");
            var x = event.data.slice(7);
            makeColor(x+".2","red");
            //selectingInterface("B");

        }

        if (event.data.includes("B_HIT") && OwnPlayer==="A") {
            console.log("I was hit, oh no ");
            var x = event.data.slice(7);
            makeColor(x,"red");
            //selectingInterface("A");

        }
        if (event.data.includes("B_MISS") && OwnPlayer==="B") {
            console.log("I missed, oh no ");
            nextTurn = "A";
            //selectingInterface("A");
        }

        if (event.data.includes("B_MISS") && OwnPlayer==="A") {
            console.log("I dodged, yay. I am player " + OwnPlayer);
            var x = event.data.slice(7);
            console.log(x);
            makeColor(x,"gray");
            nextTurn="B";
            //selectingInterface("A");
        }
    }

};
