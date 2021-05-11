var Phaser = Phaser || {};
var Platformer = Platformer || {};
var game;

Platformer.IntroState = function () {
    "use strict";
    Phaser.State.call(this);
};



Platformer.IntroState.prototype.init = function (level_file) {
    "use strict";
    this.level_file = level_file;
};


Platformer.IntroState.prototype.preload = function () {
    "use strict";

    game.load.image('tinystar', 'assets/images/star2.png');
    game.load.spritesheet('mummy', 'assets/images/boss.png', 300, 180, 28);
    game.load.image('knightHawks', 'assets/images/knighthawks.png');
    game.load.image('raster', 'assets/images/multi-color-raster.png');

};



var distance = 300;
var speed = 6;
var star;
var texture;

var max = 400;
var xx = [];
var yy = [];
var zz = [];

Platformer.IntroState.prototype.create = function () {
    "use strict";
    var i;

    star = game.make.sprite(0, 0, 'tinystar');
    texture = game.add.renderTexture(800, 600, 'texture');

    game.add.sprite(0, 0, texture);

    for (i = 0; i < max; i++) {
        xx[i] = Math.floor(Math.random() * 800) - 400;
        yy[i] = Math.floor(Math.random() * 600) - 300;
        zz[i] = Math.floor(Math.random() * 1700) - 100;
    }
    
    
    
};

Platformer.IntroState.prototype.update = function () {
    "use strict";
    var i;

    texture.clear();

    for (i = 0; i < max; i++) {
        var perspective = distance / (distance - zz[i]);
        var x = game.world.centerX + xx[i] * perspective;
        var y = game.world.centerY + yy[i] * perspective;

        zz[i] += speed;

        if (zz[i] > 300) {
            zz[i] -= 600;
        }

        texture.renderXY(star, x, y);
    }

};



