demo.state1 = function() {};
var players;
var platforms;
var cursors;

var cassettes;

demo.state1.prototype = {
    preload: function(){
        game.load.image('space', 'assets/skyline.png');
        game.load.image('bl', 'assets/bl_platform.png');
        game.load.image('orange', 'assets/o_platform.png');
        game.load.image('yellow', 'assets/y_platform.png');
        game.load.image('cassette', 'assets/cassette2.jpg');
        game.load.spritesheet('dude', 'assets/dude1.png', 32, 48);
        console.log('state1');
        
        addChangeStateEventListeners();
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.add.sprite(0,0, 'space');
        
        platforms = game.add.group();
        1
        platforms.enableBody = true;
        
        // create ground
        var ground = platforms.create(0, game.world.height - 64, 'bl');
        ground.scale.setTo(2,2);
        ground.body.immovable = true;
        
        // create 2 ledges
        var ledge = platforms.create(450, 400, 'yellow');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;
        
        ledge2 = platforms.create(-100, 280, 'yellow');
        ledge2.scale.setTo(0.8, 0.5);
        ledge2.body.immovable = true;
        
        //another ledge
        ledge3 = platforms.create(500, 150, 'yellow');
        ledge3.scale.setTo(0.8, 0.5);
        ledge3.body.immovable = true;
        
        
        
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
                
        cassettes = game.add.group();
        
        // enable physics for any cassette created
        cassettes.enableBody = true;
        
        // create 12 evenly spaced apart
        for (var i = 0; i < 11; i++)
            {
                // create cassette inside of the 'cassettes' group
                var cassette = cassettes.create(i * 70, 0, 'cassette');
                cassette.body.gravity.y = 300;
                //slightly random bounce
                cassette.body.bounce.y = 0.7 + Math.random() * 0.3;
            }
        
            
        
        // score
        scoreText = game.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#FFFFFF'});
        // controls
        cursors = game.input.keyboard.createCursorKeys();

    },
    update: function(){
        // collide player and stars with platform
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        
        game.physics.arcade.collide(cassettes, platforms);
        
        game.physics.arcade.overlap(player, cassettes, collectcassette, null, this);
     
        
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

function collectcassette(player, cassette){
    cassette.kill();
    
    score += 10;
    scoreText.text = 'Score: ' + score;
    
}


function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
}
