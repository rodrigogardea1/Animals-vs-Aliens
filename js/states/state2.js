demo.state2 = function(){};
demo.state2.prototype = {
    
    preload: function () {
        this.game.load.image('youwon', 'assets/images/youwon.png')
       
    },
    create: function () {

        var gameoverLabel = stateText = game.add.image(700, 250, 'youwon');
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