"use strict";

var Airship = Airship || {},
    Phaser = Phaser || {};

/**
 * Represents the World State.
 * @constructor
 */
Airship.WorldState = function () { 
  Phaser.State.call(this);
};
Airship.WorldState.prototype = Object.create(Phaser.State.prototype);
Airship.WorldState.prototype.constructor = Airship.WorldState;


/**
 * Initialising the World State
 */  
Airship.WorldState.prototype.init = function () {

  // define the characters as JSON objects
  this.character_data = {
    "0": {
      name: 'Character A',
      stats: {
        health: 60,
        attack: 15,
        defense: 5
      }
    },
    "1": {
      name: 'Character B',
      stats: {
        health: 70,
        attack: 15,
        defense: 5
      }
    },
    "2": {
      name: 'Character C',
      stats: {
        health: 60,
        attack: 18,
        defense: 2
      }
    },
    "3": {
      name: 'Character D',
      stats: {
        health: 80,
        attack: 8,
        defense: 10
      }
    }
  };
}


/**
 * Creating the World State
 */  
Airship.WorldState.prototype.create = function () {
  
    // enable the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // load the background WorldState
    this.add.sprite(0, 0, 'map');

    // add a group for the cities
    this.cities = this.add.group();

    // create 10 cities
    for (var i = 0; i < 10; i++)
    {
        // create cities at random positions
        this.cities.add(new Airship.WorldState.City(this));
    }
    
    // add a ship (player) object to the center of the stage
    this.ship = new Airship.WorldState.Ship(this, this.world.centerX, this.world.centerY);
    this.game.add.existing(this.ship);
}

/**
 * Updating the World State
 */  
Airship.WorldState.prototype.update = function () {
    //  Collide the ship with the cities
    this.game.physics.arcade.overlap(this.ship, this.cities, this.visitCity, null, this);
}

/**
 * Called when ship hits a city
 * @callback
 * @param {Object} ship - The players ship
 * @param {Object} city - The city that is hit 
 */
Airship.WorldState.prototype.visitCity = function (ship, city) {

    // ddebug message with name (key) of collided sprite
    this.game.debug.text('Troops: ' + city.troops, city.x -40, city.y - 10);
    
    // go to battle when user presses enter
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      
      // go to the battle state
      this.game.state.start('BattleState', true, false, city, this.character_data);
    }
}
  
/**
 * Rendering the World State
 */  
Airship.WorldState.prototype.render = function () {
    // Draw debug tools
    //game.debug.bodyInfo(this.ship, 32, 32);
    //game.debug.body(this.ship);
}