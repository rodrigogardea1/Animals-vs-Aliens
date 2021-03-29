//scene in game
var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2;
var players;
var platforms;
var cursors;
var others;
var music;
var play_button;
var star_bg;
var logo;

var stars;
var score = 0;
var scoreText;

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.audio('music', 'assets/space.mp3');
        game.load.image('sky', 'assets/spoce.jpg', 800, 600);
        game.load.image('logo', 'assets/logo1.png', 20, 10);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('orange', 'assets/o_platform.png');
        game.load.image('red', 'assets/r_platform.png');
        game.load.image('yellow', 'assets/y_platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('button1', 'assets/start1.png', 30, 20);
        console.log('state0');
        
        
        addChangeStateEventListeners();
        
    },
    create: function(){
        
        music = game.add.audio('music');
        music.loop = true;
        music.play();
        // enable Arcarde Physics system to use physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // simple background
        space_bg = game.add.tileSprite(0, 0, 800, 600, 'sky');
        
        
        
        play_button = game.add.button(game.world.centerX - 150, game.world.centerY + 50, 'button1', actionOnClick, this);
        logo = game.add.image(game.world.centerX - 250, game.world.centerY - 180, 'logo');
        
    
        
        
     
        
        
        
        
        
        
        
        // platforms group contains ground and 2 ledges to jump on
        platforms = game.add.group();
        
        // enable physics for any object created in group
        platforms.enableBody = true;
        
        // create ground
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2,2);
        ground.body.immovable = true;
    
        
        // create 2 ledges
        /*var ledge = platforms.create(400, 400, 'orange');
        ledge.scale.setTo(0.8, 1);
        ledge.body.immovable = true;
        
        ledge = platforms.create(-100, 250, 'red');
        ledge.body.immovable = true;
        
        //another ledge
        ledge = platforms.create(500, 180, 'yellow');
        ledge.scale.setTo(0.8, 1);
        ledge.body.immovable = true;*/
        
        // player and settings 
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        
        
        // player physics
        game.physics.arcade.enable(player);
        
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        
        // two animations, walking left and right
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        // stars to collect
        /*stars = game.add.group();
        
        // enable physics for any star created
        stars.enableBody = true;
        
        // create 12 evenly spaced apart
        for (var i = 0; i < 20; i++)
            {
                // create star inside of the 'stars' group
                var star = stars.create(i * 40, 0, 'star');
                star.body.gravity.y = 800;
                //slightly random bounce
                star.body.bounce.y = 0.7 + Math.random() * 0.3;
            }
        
        // score
        scoreText = game.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#FFFFFF'});*/
        // controls
        cursors = game.input.keyboard.createCursorKeys();
      
    },
    update: function(){
        // collide player and stars with platform
        var snd = game.add.audio('music');
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);
        
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        
        space_bg.tilePosition.x -= 2;
     
     
        
        // reset players velocity (movement)
        player.body.velocity.x = 0;
        
        if (cursors.left.isDown)
            {
                // move to the left
                player.body.velocity.x = -150;
                player.animations.play('left');
            }
        else if (cursors.right.isDown)
            {
                // move to the right
                player.body.velocity.x = 150;
                player.animations.play('right');
            }
        else
            { 
                // stand still
                player.animations.stop();
                player.frame = 4;
            }
        // allow player to jump if they are touching the ground
        if (cursors.up.isDown && player.body.touching.down)
            {
                player.body.velocity.y = -350;
            }
        
        
    }
    
};

function collectStar(player, star){
    star.kill();
    
    score += 10;
    scoreText.text = 'Score: ' + score;
    
}

function changeState(i, stateNum){
    console.log(i);
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
}

function actionOnClick(){
    game.state.start('state1');
}