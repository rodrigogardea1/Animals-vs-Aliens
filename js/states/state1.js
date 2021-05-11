demo.state1 = function(){};
demo.state1.prototype = {
    
    preload: function () {
        this.game.load.image('gameover', 'assets/images/gameover.png')
       
    },
    create: function () {

        var gameoverLabel = stateText = game.add.image(700, 250, 'gameover');
        stateText.anchor.setTo(1.1, 0.2);

    },

    update: function () {
        stateText.text = " GAME OVER \n Click to restart";
        stateText.visible = true;

            //the "click to restart" handler
        game.input.onTap.addOnce(function () {
        this.game.state.start("BootState", true, false, "assets/levels/level1.json");
        }
                                 )}};