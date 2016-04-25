"use strict";

var Airship = Airship || {},
    Phaser = Phaser || {};

/**
 * Represents the Battle State
 * @constructor
 * @param {Object} game - The game object
 */
Airship.BattleState = function (game) {
  
  Phaser.State.call(this);

  // define font Styles
  this._fontStyle = { font: "bold 20px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
  this._unitFontStyle = { font: "bold 14px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
};

Airship.BattleState.prototype = Object.create(Phaser.State.prototype);
Airship.BattleState.prototype.constructor = Airship.BattleState;


/**
 * Initialising the Battle State
 * @param {Object} city - The city that has been hit in the World State 
 * @param {number} city.troops - Number of troops in visited city
 * @param {Object} character_data - The collection of characters data that has been created in the World State
 */
Airship.BattleState.prototype.init = function (city, character_data) {
    
    // save number of troops in the city in current state
    this.troops = city.troops;
    // save collection of characters data in current state
    this.character_data = character_data;
    
    // set the background color of the stage
    this.stage.backgroundColor = '#407C40';
}

/**
 * Creating the Battle State
 */
Airship.BattleState.prototype.create = function () {

    // create groups
    this.groups = {};
    
    // add a group for the enemies
    this.groups.enemies = this.add.group();
    
    // add a group for the characters
    this.groups.characters = this.add.group();

    // add a new enemy object from enemy prefab for each number of troops
    for (var i = 0; i < this.troops; i++) {
        this.groups.enemies.add(new Airship.BattleState.Enemy(this, i))
    }

    // add a new Character Object from Character prefab for each character in character_data
    for (var key in this.character_data) {
      this.groups.characters.add(new Airship.BattleState.Character(this, this.character_data[key], key));
    }

    // create units array with player and enemy units
    this.units = [];
    this.units = this.units.concat(this.groups.characters.children);
    this.units = this.units.concat(this.groups.enemies.children);

    // start next first turn of battle
    this.nextTurn();
}


/**
 * Renders the Battle State
 */  
Airship.BattleState.prototype.render = function () {

    // show health of enemy units as debug text
    this.groups.enemies.forEachAlive(function(unit) {
      this.game.debug.text('HP:' + unit.stats.health, unit.x-30, unit.y - 30, '#ffffff');
    }, this)

     // show health of player units as debug text
    this.groups.characters.forEachAlive(function(unit) {
      this.game.debug.text('HP:' + unit.stats.health, unit.x-30, unit.y - 30, '#ffffff');
    }, this)
}


/**
 * Called when unit turn is over
 * @callback
 */
Airship.BattleState.prototype.nextTurn = function () {
  
    // first unit takes the next turn
    this.current_unit = this.units.shift();
    // if the unit is alive, it acts, otherwise goes to the next turn
    if (this.current_unit.alive) {
        this.current_unit.act();
        this.units.push(this.current_unit);
    } else {
        this.nextTurn();
    }
};