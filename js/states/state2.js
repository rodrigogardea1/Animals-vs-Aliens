var highscore = 0;
demo.state2 = function(){};
demo.state2.prototype = {
    
    preload: function () {
        this.game.load.image('youwon', 'assets/images/youwon.png')
       
    },
    create: function () {

        var gameoverLabel = stateText = game.add.image(700, 250, 'youwon');
        stateText.anchor.setTo(1.1, 0.2);
        var highScore = Math.max(score, highScore);
        localStorage.setItem(localStorageName, highScore);
	    var style = {
            font: "32px Monospace",
	        fill: "#60E2E1",
	        align: "center"}
        var text = game.add.text(game.width / 2, game.height / 3, "Your score: " + localStorage.getItem('player_score'), style);
	    text.anchor.set(0.5);

    },

    update: function () {
        stateText.text = " GAME OVER \n Click to restart";
        stateText.visible = true;

            //the "click to restart" handler
        game.input.onTap.addOnce(function () {
        this.game.state.start("BootState", true, false, "assets/levels/level1.json");
        }
                                 )}};
