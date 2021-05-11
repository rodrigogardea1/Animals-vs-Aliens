var Phaser = Phaser || {};
var Platformer = Platformer || {};
var game;
var platforms;
var cursors;
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
    
    this.load.image('sky', 'assets/images/background.png');
    this.load.image('logo', 'assets/images/log2.png', 10, 10);
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('orange', 'assets/images/o_platform.png');
    this.load.image('red', 'assets/images/r_platform.png');
    this.load.image('yellow', 'assets/images/y_platform.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.spritesheet('dude', 'assets/images/kooo.png', 20, 20);
    this.load.image('button1', 'assets/images/start1.png', 30, 10);
    console.log('state0');
        
        
};


Platformer.IntroState.prototype.create = function () {
    "use strict";
    
    // enable Arcarde Physics system to use physics
    this.physics.startSystem(Phaser.Physics.ARCADE);
        
        // simple background
    var space_bg = this.add.tileSprite(0, 0, 800, 600, 'sky');
        
        
        
    var play_button = this.add.button(this.world.centerX - 150, this.world.centerY + 50, 'button1', this.actionOnClick, this);
    var logo = this.add.image(this.world.centerX - 250, this.world.centerY - 180, 'logo');
    
    var platforms = this.add.group();
        
        // enable physics for any object created in group
    platforms.enableBody = true;
        
        // create ground
    var ground = platforms.create(0, this.world.height - 64, 'ground');
    ground.scale.setTo(2,2);
    ground.body.immovable = true;
    
    var player = this.add.sprite(32, this.world.height - 150, 'dude');
        
        
        // player physics
    this.physics.arcade.enable(player);
        
    this.player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
        
        // two animations, walking left and right
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [9, 8, 7, 6], 10, true);
    
    var cursors = this.input.keyboard.createCursorKeys();
    
    
    
};

Platformer.IntroState.prototype.update = function () {
    "use strict";
    // collide player and stars with platform
    var hitPlatform = this.physics.arcade.collide(player, platforms);
   
    this.physics.arcade.collide(stars, platforms);
        
    this.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        
    space_bg.tilePosition.x -= 2;
     
     
        
        // reset players velocity (movement)
    player.body.velocity.x = 0;
        
    if (cursors.left.isDown) {
        
                // move to the left
        player.body.velocity.x = -150;
        player.animations.play('left'); 
    }
    else if (cursors.right.isDown) {
                // move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
        }
    else {
                // stand still
        player.animations.stop();
        player.frame = 4;
            }
        // allow player to jump if they are touching the ground
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
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
    this.state.start('state' + stateNum);
};

Platformer.IntroState.prototype.addKeyCallback = function (key, fn, args) {
    "use strict";
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

Platformer.IntroState.prototype.addChangeStateEventListeners = function () {
    "use strict";
    this.addKeyCallback(Phaser.Keyboard.ZERO, this.changeState, 0);
    this.addKeyCallback(Phaser.Keyboard.ONE, this.changeState, 1);
};

Platformer.IntroState.prototype.actionOnClick = function () {
    "use strict";
    this.game.state.start('GameState');
};



