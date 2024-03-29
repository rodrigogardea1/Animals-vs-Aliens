var Platformer = Platformer || {};
var reached = 0;
Platformer.Goal = function (game_state, position, properties) {
    "use strict";
    Platformer.Prefab.call(this, game_state, position, properties);
    
    this.next_level = properties.next_level;
    
    this.game_state.game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5);
};

Platformer.Goal.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Goal.prototype.constructor = Platformer.Goal;

Platformer.Goal.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};

Platformer.Goal.prototype.reach_goal = function () {
    "use strict";
    // start the next level
    reached += 1;
    localStorage.player_lives = this.game_state.prefabs.player.lives;
    localStorage.player_score = this.game_state.prefabs.player.score;
    if (reached === 1) {
        this.game_state.game.state.start("BootState", true, false, this.next_level);
        
    }
    
    else {
        this.game_state.game.state.start("state2");   
    }
};
