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

//document.getElementById(x).onmouseover = function(){makeGreen(x)};
//document.getElementById("table1").onmouseleave = function(){makeWhite("table1")};

//document.getElementById("table1").onmouseover = function(event){
//   let target = event.target;
//  target.style.backgroundColor = 'pink';
//}


document.getElementById("table1").onmouseover = function (event) {
    let target = event.target;
    if (target.className != "rowTop")
        if (target.id!="A0" && target.id!="B0" && target.id!="C0" && target.id!="D0" && target.id!="E0" && target.id!="F0" && target.id!="G0" && target.id!="H0" && target.id!="I0" && target.id!="J0" && target.id!="rowTop0") {
            makeGreen(target.id);
        }
}

document.getElementById("table1").onmouseout = function (event) {

    let target = event.target;
    makeWhite(target.id);
}

