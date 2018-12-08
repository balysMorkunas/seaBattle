function Fleet(id) {
    this.id = id;
    var fleetArray = [];
    this.fleetArray = fleetArray;

}
//Getter for a fleet object. Returns the Ships in an array
Fleet.prototype.getFleet = function () {
    return this.fleetArray;
}

//This function pushes a new ship to the fleet array
Fleet.prototype.addShip = function (shipObj) {
    this.fleetArray.push(shipObj);
}
//This function prints the fleet with all of its ships and their coordinates.
Fleet.prototype.printFleet = function () {
    console.log("FLEET id number " + this.id);
    for (var i = 0; i < this.fleetArray.length; i++) {
        this.fleetArray[i].printShip();
    }
}




var document;
var socket = new WebSocket("ws://localhost:3002");
console.log(fleet1);


function colorTable(fleet, id){

    var fleetArray = fleet.getFleet();

    for(var i=0; i<fleet.fleetArray.length; i++){




    }
    

}


socket.onopen = function (event) {
    socket.send("READY");
    console.log("I am ready");
    socket.onmessage = function (event) {
        if (event.data === "A_GAME") {
            console.log("I am player A");

            var url_string  = window.location.href;
            var url = new URL(url_string);
            var f = url.searchParams.get("fleet");
            var fleetString = atob(f);
            var fleetA = JSON.parse(fleetString);
            console.log(fleetA);
            
            


        }
        if (event.data === "B_GAME_START") {
            console.log("I am player B");

            var url_string  = window.location.href;
            var url = new URL(url_string);
            var f = url.searchParams.get("fleet");
            var fleetString = atob(f);
            var fleetB = JSON.parse(fleetString);
            console.log(fleetB);


        }
    }
};