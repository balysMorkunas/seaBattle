var document;
// var x;
// var e;
var id = 0;
var shipSizesCnt = 0;
var shipSizes = [5, 4, 3, 3, 2];

function Ship(id) {
    this.id = id;
    var shipCoordinates = [];
    this.shipCoordinates = shipCoordinates;

}

function Fleet(id) {
    this.id = id;
    var fleetArray = [];
    this.fleetArray = fleetArray;

}

Fleet.prototype.getFleet = function () {
    return this.fleetArray;
}

Ship.prototype.getShip = function (x) {
    return this.shipCoordinates[x];
}

Ship.prototype.addCoordinates = function (xyString) {
    this.shipCoordinates.push(xyString);
}

Ship.prototype.printShip = function () {
    console.log("SHIP id number " + this.id);
    for (var i = 0; i < this.shipCoordinates.length; i++) {
        console.log(this.shipCoordinates[i]);
    }
}

Fleet.prototype.addShip = function (shipObj) {
    this.fleetArray.push(shipObj);
}

Fleet.prototype.printFleet = function () {
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

function makeRed(id) {
    document.getElementById(id).style.backgroundColor = "red";
}

// function getX(e) {
//     x = e.target.id;
// }

// document.onmouseover = function (e) {
//     x = e.target.id;
// }


document.getElementById("table1").onmouseover = function (event) {
    let target = event.target;
    var flag = 1;
    if (target.className != "rowTop" && !target.className.includes("col0")) {

        let k = parseInt(target.id.charAt(1));
        if (target.id.includes("10")) {
            k = 10;
        }
        let i = k;
        if (k + shipSizes[shipSizesCnt] <= 11) {


            //*********************************************************** */
            //pls refactor this to overlapCHECK


            for (i = k; i < shipSizes[shipSizesCnt] + k; i++) {
                let x = target.id;
                x = x.slice(0, -1);
                if ((document.getElementById(x + i).className.includes("ship"))) {
                    flag = 0;
                }
            }


            for (i = k; i < shipSizes[shipSizesCnt] + k; i++) {
                let x = target.id;
                x = x.slice(0, -1);
                if (flag == 1) {
                    makeGreen(x + i);
                }
                else {

                    makeRed(x + i);
                }
            }


        }
    }
}

document.getElementById("table1").onmouseout = function (event) {
    let target = event.target;
    if (target.className != "rowTop" && !target.className.includes("col0")) {
        let k = parseInt(target.id.charAt(1));
        if (target.id.includes("10")) {
            k = 10;
        }
        if (k + shipSizes[shipSizesCnt] <= 11) {
            for (let i = parseInt(target.id.charAt(1)); i < shipSizes[shipSizesCnt] + k; i++) {
                let x = target.id;
                x = x.slice(0, -1);
                if (!(document.getElementById(x + i).className.includes("ship"))) {
                    makeWhite(x + i);
                }
                if ((document.getElementById(x + i).className.includes("ship"))) {
                    makeBlue(x + i);
                }
            }
        }
    }
}

//returns false if block noted by id is already used by another ship in our fleet; true else
function overlapCheck(id, ) {
    for (var i = 0; i < fleet.length; i++) {
        var ship1 = (fleet.getFleet).getShip;
        for (var j = 0; j < ship1.length; j++) {
            var coordString = ship1[j];
            if (id == coordString)
                console.log("overlap");
        }
    }
}

document.getElementById("table1").onclick = function (event) {
    let target = event.target;
    id++;
    var ship1 = new Ship(id);
    let k = parseInt(target.id.charAt(1));
    if (target.id.includes("10")) {
        k = 10;
    }
    if (target.className != "rowTop" && !target.className.includes("col0") && (k + shipSizes[shipSizesCnt] <= 11)) {
        //*********************************************************** */
        //pls refactor this to overlapCHECK
        var flag = 1;
        for (let i = parseInt(target.id.charAt(1)); i < shipSizes[shipSizesCnt] + k; i++) {
            let x = target.id;
            x = x.slice(0, -1);
            if ((document.getElementById(x + i).className.includes("ship"))) {
                flag = 0;
            }
        }
        /***************************************************************************** */
        if (flag == 1) {
            for (let i = parseInt(target.id.charAt(1)); i < shipSizes[shipSizesCnt] + k; i++) {
                let x = target.id;
                x = x.slice(0, -1);
                ship1.addCoordinates(x + i);
                document.getElementById(x + i).classList.add("ship");
                makeBlue(x + i);
            }
            fleet1.addShip(ship1);
            shipSizesCnt++;
            fleet1.printFleet();
        }
    }

}

document.getElementById("reset").onclick = function (event) {
    
    for(let i = 0; i<fleet1.fleetArray.length; i++) {
        for(let j = 0; j<fleet1.fleetArray[i].shipCoordinates.length; j++){
            makeWhite(fleet1.fleetArray[i].getShip(j));
            document.getElementById(fleet1.fleetArray[i].getShip(j)).classList.remove("ship");
        }
    }
    shipSizesCnt = 0;
    id = 0;
    fleet1 = new Fleet(1);
   // location.reload(); //TEMPORARY
    //document.getElementsByClassName("ship").backgroundColor = "white";
    
}


