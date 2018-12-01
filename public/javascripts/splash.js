var document;
// var x;
// var e;
var id = 0;
var shipSizesCnt = 0;
var shipSizes = [5, 4, 3, 3, 2];
var fleet1 = new Fleet(1);

//Constructor for the class Ship (takes an ID as an argument to count how many ships we have)
function Ship(id) {
    this.id = id;
    var shipCoordinates = [];
    this.shipCoordinates = shipCoordinates;

}
//Constructor for the class Fleet (takes and ID as an argument to count how many fleets we have)
function Fleet(id) {
    this.id = id;
    var fleetArray = [];
    this.fleetArray = fleetArray;

}
//Getter for a fleet object. Returns the Ships in an array
Fleet.prototype.getFleet = function () {
    return this.fleetArray;
}
//Getter for the ship object, which contains ships coordinates. (returns coordinates at ships position)
Ship.prototype.getShip = function (x) {
    return this.shipCoordinates[x];
}
//This function adds a new coordinate to a ship object. (only used when creating new ships)
Ship.prototype.addCoordinates = function (xyString) {
    this.shipCoordinates.push(xyString);
}
//This function prints out ship coordinates at all of its positions
Ship.prototype.printShip = function () {
    console.log("SHIP id number " + this.id);
    for (var i = 0; i < this.shipCoordinates.length; i++) {
        console.log(this.shipCoordinates[i]);
    }
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

//These methods are for changing color of specific objects (specified in the argument)
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



// takes an id, amount of spaces to check to the left and to the right 
//returns false if overlap, true if ok
function overlapCheck(id, numberRight, numberLeft) {
    var flag = 1;
    var k = parseInt(id.charAt(1));

    if (id.includes("10")) {
        k = 10;
    }

    for (i = k; i < numberRight + k; i++) {
        let x = id;
        // if(k==10){
        //     x = x.slice()
        // }
        x = x.slice(0, 1);


        if ((document.getElementById(x + i).className.includes("ship"))) {
            flag = 0;
        }
    }
    for (i = k; i > k - numberLeft; i--) {

        let x = id;
        x = x.slice(0, 1);

        //X is row letter

        if ((document.getElementById(x + i).className.includes("ship"))) {
            flag = 0;
        }
    }

    if (flag == 1) {

        return true;
    }
    console.log("false");
    return false;
}

//This function colors the appropriate amount of ship cells when hovored over

document.getElementById("table1").onmouseover = function (event) {
    let target = event.target;
    var flag = 1;

    //THis part excludes the cells that contain letters and numbers to NOT be colored

    if (target.className != "rowTop" && !target.className.includes("col0")) {
        let k = parseInt(target.id.charAt(1));

        //This if guard takes care of the situation when our coordinate number becomes double digit.. 

        if (target.id.includes("10")) {
            k = 10;
        }
        let i = k;
        //Here we make sure that the ship position does not go out of bounds of the grid

        if (k + shipSizes[shipSizesCnt] <= 11) {
            //if there is enough space on the board, start checking for overlap, if all good, print to the right

            var overlapBoolean = overlapCheck(target.id, shipSizes[shipSizesCnt], 0);
            //Finally coloring the needed cells.
            for (i = k; i < shipSizes[shipSizesCnt] + k; i++) {
                let x = target.id;
                x = x.slice(0, 1);
                if (overlapBoolean == true) {
                    makeGreen(x + i);
                }
                else {

                    makeRed(x + i);
                }
            }

        }
        else {

            //first check for overlap, 11-k spaces to the right k+shipsize-11 spaces to the left
            //if no overlap, paint                        

            var boolean = overlapCheck(target.id, 11 - k, k + shipSizes[shipSizesCnt] - 11);

            for (i = k; i < 11; i++) {
                let x = target.id;
                x = x.slice(0, 1);
                if (boolean == true) {
                    makeGreen(x + i);
                }
                else {
                    makeRed(x + i);
                }
            }

            for (i = k; i >= -shipSizes[shipSizesCnt] + 11; i--) {
                let x = target.id;
                x = x.slice(0, 1);
                if (boolean == true) {
                    makeGreen(x + i);
                }
                else {

                    makeRed(x + i);
                }
            }
        }
    }
}
//This function does mainly the opposite of the onhover function. But the cells marked with class
//ship must stay blue so we exclude them with an if statement

document.getElementById("table1").onmouseout = function (event) {
    let target = event.target;
    if (target.className != "rowTop" && !target.className.includes("col0")) {
        let k = parseInt(target.id.charAt(1));
        if (target.id.includes("10")) {
            k = 10;
        }
        // Checking for out of bounds, then selecting appropriate cells with Slice(), coloring.

        if (k + shipSizes[shipSizesCnt] <= 11) {
            for (let i = parseInt(target.id.charAt(1)); i < shipSizes[shipSizesCnt] + k; i++) {
                let x = target.id;
                x = x.slice(0, 1);
                if (!(document.getElementById(x + i).className.includes("ship"))) {
                    makeWhite(x + i);
                }
                if ((document.getElementById(x + i).className.includes("ship"))) {
                    makeBlue(x + i);
                }
            }
        }
        //
        else {

            for (i = k; i < 11; i++) {
                let x = target.id;
                x = x.slice(0, 1);
                if (!(document.getElementById(x + i).className.includes("ship"))) {
                    makeWhite(x + i);
                }
                if ((document.getElementById(x + i).className.includes("ship"))) {
                    makeBlue(x + i);
                }
            }

            for (i = k; i >= -shipSizes[shipSizesCnt] + 11; i--) {
                let x = target.id;
                x = x.slice(0, 1);
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


document.getElementById("table1").onclick = function (event) {
    let target = event.target;
    id++;
    var ship1 = new Ship(id);
    let k = parseInt(target.id.charAt(1));
    if (target.id.includes("10")) {
        k = 10;
    }
    if (target.className != "rowTop" && !target.className.includes("col0") && (k + shipSizes[shipSizesCnt] <= 11)) {

        var flag = overlapCheck(target.id, shipSizes[shipSizesCnt], 0);
        if (flag == true) {
            for (let i = parseInt(target.id.charAt(1)); i < shipSizes[shipSizesCnt] + k; i++) {
                let x = target.id;
                x = x.slice(0, 1);
                ship1.addCoordinates(x + i);
                document.getElementById(x + i).classList.add("ship");
                makeBlue(x + i);
            }


            fleet1.addShip(ship1);
            shipSizesCnt++;
            fleet1.printFleet();
        }
    }
    if (target.className != "rowTop" && !target.className.includes("col0") && (k + shipSizes[shipSizesCnt] > 11)) {
        var flag = overlapCheck(target.id, 11 - k, k + shipSizes[shipSizesCnt] - 11);
        if (flag == true) {
            console.log(parseInt(target.id.charAt(1)) + 11 - shipSizesCnt);
            for (let i = parseInt(target.id.charAt(1)); i < 11; i++) {
                let x = target.id;
                x = x.slice(0, 1);
                ship1.addCoordinates(x + i);
                document.getElementById(x + i).classList.add("ship");
                makeBlue(x + i);
            }

            for (let i = parseInt(target.id.charAt(1)); i >= -shipSizes[shipSizesCnt] + 11; i--) {
                let x = target.id;
                x = x.slice(0, 1);
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

//This function resets the grid by deleting all the placed ships and their objects/
document.getElementById("reset").onclick = function (event) {
    //iterate through all objects and make them white, remove ship class.

    for (let i = 0; i < fleet1.fleetArray.length; i++) {
        for (let j = 0; j < fleet1.fleetArray[i].shipCoordinates.length; j++) {
            makeWhite(fleet1.fleetArray[i].getShip(j));
            document.getElementById(fleet1.fleetArray[i].getShip(j)).classList.remove("ship");
        }
    }
    shipSizesCnt = 0;
    id = 0;
    fleet1 = new Fleet(1);
}
