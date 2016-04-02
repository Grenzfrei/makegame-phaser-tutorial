"use strict";

var Airship = Airship || {},
    Phaser = Phaser || {};
    
/**
 * Represents the City Prefab.
 * @constructor
 * @param {Object} game_state - The game state object
 */  
Airship.WorldState.City = function (game_state) {
    
    // set random coordinates for city
    var x = game_state.rnd.between(100, 770),
        y = game_state.rnd.between(0, 570);

    // crate city as new Sprite Object
    Phaser.Sprite.call(this, game_state, x, y, 'city', 1);
    
     // enable physics for collision
    game_state.physics.arcade.enable(this);

    // set random amount of troops
    this.troops = game_state.rnd.between(1, 6);
};
Airship.WorldState.City.prototype = Object.create(Phaser.Sprite.prototype);
Airship.WorldState.City.prototype.constructor = Airship.WorldState.City;
