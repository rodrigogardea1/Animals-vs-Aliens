var first = {}, centerX = 200 / 2, centerY = 2500 / 2, sonic, speed = 6;
var game;       
var star;
var Phaser;
var score = 0;
var scoreText;
var platforms;
var shootTime = 0;
var lasers;

first.state0 = function(){};
first.state0.prototype = {
    preload: function(){
        game.load.image('beach', 'space1.png');
        game.load.image('star', 'coin.png');
        game.load.image('sonic','unicorn.png', 250, 300);
        game.load.image('orange', 'o_platform.png');
        game.load.image('red', 'r_platform.png');
        game.load.image('yellow', 'y_platform.png');
        game.load.image('end', 'black.png');
        game.load.spritesheet('boss', 'boss2.png', 300, 180);
        game.load.image('laser', 'laser.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('state0');
        game.world.setBounds(0, 0, 2050, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        platforms = game.add.group();
        
        // enable physics for any object created in group
        platforms.enableBody = true;
        
        var beach = game.add.sprite(0, 0, 'beach');
        
        
        boss = game.add.sprite(game.world.width*0.8, game.world.height-250, 'boss');
        boss.anchor.setTo(0.5);
        game.physics.enable(boss, Phaser.Physics.ARCADE);
        boss.body.velocity.set(250, -250);
        boss.body.collideWorldBounds = true;
        boss.body.bounce.set(1);
        boss.body.immovable = true;
        boss.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
        
        
        
        
        
        sonic = game.add.sprite(centerX, centerY, 'sonic');
        sonic.anchor.setTo(0.5, 0.5);
        sonic.scale.setTo(0.7, 0.7);
        game.physics.enable(sonic);
        sonic.body.collideWorldBounds = true;
        sonic.body.immovable = true;
        
        
        
        star = game.add.sprite(game.world.width*0.5, game.world.height-50, 'star');
        star.anchor.set(0.5);
        game.physics.enable(star, Phaser.Physics.ARCADE);
        
        star.body.velocity.set(250, -250);
        star.body.collideWorldBounds = true;
        star.body.bounce.set(1);
        star.checkWorldBounds = true;
        star.body.immovable = true;
        
        lasers = game.add.group();
        lasers.enableBody = true;
        lasers.physicsBodyType = Phaser.Physics.ARCADE;
        lasers.createMultiple(5, 'laser');
        lasers.setAll('anchor.x', 0.5);
        lasers.setAll('anchor.y', 0.5);
        lasers.setAll('scale.x', 0.2);
        lasers.setAll('scale.y', 0.2);
        lasers.setAll('outOfBoundKill', true);
        lasers.setAll('checkWorldBounds', true);
        
        
        
        



        game.camera.follow(sonic);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 0, 0, 350, 1000);
        
    //  The score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        var gameOverText = game.add.text(500, 500, 'GAME OVER', { fontSize: '32px', fill: '#000' }); 
        gameOverText.visible = false;
    //  Our controls.
    
        cursors = game.input.keyboard.createCursorKeys();

    //  We will enable physics for any star that is created in this group
    },
    update: function(){
        boss.animations.play('fly');
        game.physics.arcade.collide(sonic, star);
        game.physics.arcade.collide(sonic, boss);
        
        game.physics.arcade.collide(sonic, star, collectStar);
        game.physics.arcade.collide(sonic, boss, killPlayer);
    
        
        sonic.body.velocity.x = 0;
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            sonic.scale.setTo(0.7, 0.7);
            sonic.x += speed;
            sonic.animations.play('walk', 18, 'true');
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            sonic.scale.setTo(-0.7, 0.7);
            sonic.x -= speed;
            sonic.animations.play('walk', 18, 'true');
        }
        else{
            sonic.animations.stop('walk');
            sonic.frame = 0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            sonic.y -= speed;
            sonic.animations.play('walk', 18, 'true');
            if(sonic.y < 500){
                sonic.y = 500;
            }
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            sonic.y += speed; 
            sonic.animations.play('walk', 18, 'true');
        }
        if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
        shootLaser();
        }
        
        
    }
};

function shootLaser(){
    
    laser = lasers.getFirstExists(false);
    if(laser){
        laser.reset(player.x,player.y);
        laser.body.velocity.x = 600;
    }
    
}

function collectStar(sonic, star) {
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function killPlayer(sonic, boss) {
    sonic.kill();
    game.add.sprite(0, 1110, 'end');
    game.add.text(500, 500, 'YOU LOSE', { fontSize: '100px', fill:'#FFFFFF'});
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}
