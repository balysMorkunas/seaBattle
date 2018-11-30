var document;
var x;
var e;
var id = 0;
var shipSizesCnt = 0;
var shipSizes = [5,4,3,3,2];

function Ship(id) {
    this.id = id;
    var shipArray = [];
    this.shipArray = shipArray;

}

function Fleet(id){
    this.id = id;
    var fleetArray = [];
    this.fleetArray = fleetArray;
    
}
Ship.prototype.addCoordinates = function (xyString) {
    this.shipArray.push(xyString);
}

Ship.prototype.printShip = function () {
    console.log("SHIP id number " + this.id);
    for (var i = 0; i < this.shipArray.length; i++) {
        console.log(this.shipArray[i]);
    }
}

Fleet.prototype.addShip = function(shipObj){
    this.fleetArray.push(shipObj);
}

Fleet.prototype.printFleet = function(){
    console.log("FLEET id number " + this.id);
    for (var i = 0; i < this.fleetArray.length; i++) {
        this.fleetArray[i].printShip();
    }
}


var fleet1 = new Fleet(1);



function makeGreen(id) {
    document.getElementById(id).style.backgroundColor = "green";
}
function makeBlue(id) {
    document.getElementById(id).style.backgroundColor = "blue";
}
function makeWhite(id) {
    document.getElementById(id).style.backgroundColor = "white";
}

function getX(e) {
    x = e.target.id;
}

document.onmouseover = function (e) {
    x = e.target.id;
}

document.getElementById("table1").onmouseover = function (event) {
    let target = event.target;
    if (target.className != "rowTop" && !target.className.includes("col0")) {

        let k = parseInt(target.id.charAt(1));
        for (let i = parseInt(target.id.charAt(1)); i < shipSizes[shipSizesCnt] + k; i++) {
            let x = target.id;
            x = x.slice(0, -1);

            if(!(document.getElementById(x+i).className.includes("ship"))){
            makeGreen(x + i);
            }
        }
    }
}

document.getElementById("table1").onmouseout = function (event) {
    let target = event.target;
    if (target.className != "rowTop" && !target.className.includes("col0")) {
        let k = parseInt(target.id.charAt(1));
        for (let i = parseInt(target.id.charAt(1)); i < shipSizes[shipSizesCnt] + k; i++) {
            let x = target.id;
            x = x.slice(0, -1);

            if(!(document.getElementById(x+i).className.includes("ship"))){
                makeWhite(x + i);
            }
            



        }
    }
}

document.getElementById("table1").onclick = function (event) {
    let target = event.target;
    id++;
    var ship1 = new Ship(id);
    if (target.className != "rowTop" && !target.className.includes("col0")) {

        let k = parseInt(target.id.charAt(1));
        for (let i = parseInt(target.id.charAt(1)); i < shipSizes[shipSizesCnt] + k; i++) {
            let x = target.id;
            x = x.slice(0, -1);


            ship1.addCoordinates(x + i);

            document.getElementById(x+i).classList.add("ship");
            
            makeBlue(x + i);

        }
    }
    //ship1.printShip();
    fleet1.addShip(ship1);
    shipSizesCnt++;
    fleet1.printFleet();
}

document.getElementById("reset").onclick = function (event){
    //document.getElementById("table1").style.backgroundColor="";
}



