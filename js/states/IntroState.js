var Phaser = Phaser || {};
var Platformer = Platformer || {};
var game;
var players;
var platforms;
var cursors;
var others;
var music;
var play_button;
var star_bg;
var logo;
var game;
var stars;
var score = 0;
var scoreText;

Platformer.IntroState = function () {
    "use strict";
    Phaser.State.call(this);
};

Platformer.prototype = Object.create(Phaser.State.prototype);
Platformer.prototype.constructor = Platformer.IntroState;

Platformer.IntroState.prototype.init = function (level_file) {
    "use strict";
    this.level_file = level_file;
};


Platformer.IntroState.prototype.preload = function () {
    "use strict";
    
    this.game.load.image('sky', 'assets/images/background.png', 800, 600);
    this.game.load.image('logo', 'assets/images/log2.png', 10, 10);
    this.game.load.image('ground', 'assets/images/platform.png');
    this.game.load.image('orange', 'assets/images/o_platform.png');
    this.game.load.image('red', 'assets/images/r_platform.png');
    this.game.load.image('yellow', 'assets/images/y_platform.png');
    this.game.load.image('star', 'assets/images/star.png');
    this.game.load.spritesheet('dude', 'assets/images/kooo.png', 20, 20);
    this.game.load.image('button1', 'assets/images/start1.png', 30, 10);
    console.log('state0');
        
        
};


Platformer.IntroState.prototype.create = function () {
    "use strict";
    
    // enable Arcarde Physics system to use physics
    this.game.physics.startSystem(this.game.Phaser.Physics.ARCADE);
        
        // simple background
    var space_bg = this.game.add.tileSprite(0, 0, 800, 600, 'sky');
        
        
        
    var play_button = this.game.add.button(game.world.centerX - 150, game.world.centerY + 50, 'button1', this.actionOnClick, this);
    var logo = this.game.add.image(game.world.centerX - 250, game.world.centerY - 180, 'logo');
    
    var platforms = this.game.add.group();
        
        // enable physics for any object created in group
    this.platforms.enableBody = true;
        
        // create ground
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    this.ground.scale.setTo(2,2);
    this.ground.body.immovable = true;
    
    var player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        
        
        // player physics
    this.game.physics.arcade.enable(this.player);
        
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;
        
        // two animations, walking left and right
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [9, 8, 7, 6], 10, true);
    
    var cursors = this.input.keyboard.createCursorKeys();
    
    
    
};

Platformer.IntroState.prototype.update = function () {
    "use strict";
    // collide player and stars with platform
    
   
    this.game.physics.arcade.collide(this.stars, this.platforms);
        
    this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        
    this.space_bg.tilePosition.x -= 2;
     
     
        
        // reset players velocity (movement)
    this.player.body.velocity.x = 0;
        
    if (this.cursors.left.isDown) {
        
                // move to the left
        this.player.body.velocity.x = -150;
        this.player.animations.play('left'); 
    }
        else if (this.cursors.right.isDown) {
                // move to the right
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
            }
        else {
                // stand still
            this.player.animations.stop();
            this.player.frame = 4;
            }
        // allow player to jump if they are touching the ground
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
            }
        


};

Platformer.IntroState.prototype.collectStar = function (player, star) {
    "use strict";
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
    
};

Platformer.IntroState.prototype.changeState = function (i, stateNum) {
    "use strict";
    console.log(i);
    game.state.start('state' + stateNum);
};

Platformer.IntroState.prototype.addKeyCallback = function (key, fn, args) {
    "use strict";
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

Platformer.IntroState.prototype.addChangeStateEventListeners = function () {
    "use strict";
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
};

Platformer.IntroState.prototype.actionOnClick = function () {
    "use strict";
    game.state.start('GameState');
};



