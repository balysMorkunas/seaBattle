
/* every game has two players, identified by their WebSocket */
var game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.countA = 0;
    this.countB = 0;
    this.id = gameID;
    this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted

};

game.prototype.hasTwoConnectedPlayers = function() {
    return this.gameState == "2 JOINT";
}

game.prototype.addPlayer = function(p) {
        
    if(this.playerA == null) {
        this.playerA = p;
        return "A";
    }
    else if(this.playerB == null) {
        this.playerB = p;
        //send game somewhere
        return "B";
    }else{
        return "N";
    }
};

module.exports = game;