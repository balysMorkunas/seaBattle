var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
	res.sendFile("splashScreen.html", { root: "./public" });
});

/* Pressing the 'PLAY' button, returns this page */
router.get("/play", function (req, res) {
	res.sendFile("gameScreen.html", { root: "./public" });
});

module.exports = router;
