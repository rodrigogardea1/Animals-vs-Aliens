var Phaser = Phaser || {};
var Platformer = Platformer || {};
var demo;
var highScore;
var localStorageName = "crackalien";
var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);
game.state.add("BootState", new Platformer.BootState());
game.state.add("LoadingState", new Platformer.LoadingState());
game.state.add('state0', new demo.state0());
game.state.add("GameState", new Platformer.TiledState());
highScore = localStorage.getItem(localStorageName) === null ? 0 :
            localStorage.getItem(localStorageName);
game.state.add('state1', new demo.state1());
game.state.add('state2', new demo.state2());
game.state.start('state0');
