function makeGreen() {
    document.getElementById("B2").style.backgroundColor = "green";
}
function makeWhite() {
    document.getElementById("B2").style.backgroundColor = "white";
}
var document;
document.getElementById("B2").onmouseover = function() {makeGreen()};
document.getElementById("B2").onmouseleave = function() {makeWhite()};