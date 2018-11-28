var document;
var x;
var e;

function makeGreen(id) {
    document.getElementById(id).style.backgroundColor = "green";
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

        //this need to be remade, now it makes 3 cubes green, but they do not change back to white.
        //Although, the slice function is good for this situation (aka changing the id number)
        //I'm tired now, will approach this tommorrow.
        let k = parseInt(target.id.charAt(1));
        for(let i = parseInt(target.id.charAt(1));i<3 + k; i++){
            let x = target.id;
            x = x.slice(0, -1);

            makeGreen(x+i);
        }
    }
}

//document.getElementById("table1").onmouseout = function (event) {
//
//    let target = event.target;
//    makeWhite(target.id);
//}

document.getElementById("table1").onmouseout = function (event) {
    let target = event.target;
    if (target.className != "rowTop" && !target.className.includes("col0")) {

        //this need to be remade, now it makes 3 cubes green, but they do not change back to white.
        //Although, the slice function is good for this situation (aka changing the id number)
        //I'm tired now, will approach this tommorrow.
        let k = parseInt(target.id.charAt(1));
        for(let i = parseInt(target.id.charAt(1));i<3 + k; i++){
            let x = target.id;
            x = x.slice(0, -1);

            makeWhite(x+i);
        }
    }
}



