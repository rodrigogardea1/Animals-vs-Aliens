var first = {}, centerX = 200 / 2, centerY = 2500 / 2, sonic, speed = 6;
var game;       
var star;
var Phaser;
var score = 0;
var scoreText;
var platforms;

first.state0 = function(){};
first.state0.prototype = {
    preload: function(){
        game.load.image('beach', 'space1.png');
        game.load.image('star', 'coin.png');
        game.load.image('sonic','unicorn.png', 250, 300);
        game.load.spritesheet('boss', 'boss.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('state0');
        game.world.setBounds(0, 0, 2050, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var beach = game.add.sprite(0, 0, 'beach');
        sonic = game.add.sprite(centerX, centerY, 'sonic');
        sonic.anchor.setTo(0.5, 0.5);
        sonic.scale.setTo(0.7, 0.7);
        game.physics.enable(sonic);
        sonic.body.collideWorldBounds = true;
        sonic.body.immovable = true;
        boss = game.add.sprite(centerX+50, centerY +50, 'boss')
        
        
        star = game.add.sprite(game.world.width*0.5, game.world.height-50, 'star');
        star.anchor.set(0.5);
        game.physics.enable(star, Phaser.Physics.ARCADE);
        
        star.body.velocity.set(250, -250);
        star.body.collideWorldBounds = true;
        star.body.bounce.set(1);
        star.checkWorldBounds = true;
        star.body.immovable = true;
        



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
        game.physics.arcade.collide(sonic, star);
        
        game.physics.arcade.collide(sonic, star, collectStar);
    
        
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
        
    }
};

function collectStar(sonic, star) {
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}