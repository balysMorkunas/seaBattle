
var gameStatus = {
	since: Date.now(),     /* since we keep it simple and in-memory, keep track of when this object was created */
	shipPartsSunk: 0,   /* number of games initialized */
	gamesStarted: 0,       /* number of games aborted */
	gamesCompleted: 0      /* number of games successfully completed */
};

module.exports = gameStatus;