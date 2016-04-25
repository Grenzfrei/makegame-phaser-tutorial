"use strict";

var Airship = Airship || {},
    Phaser = Phaser || {};
    
/**
 * Represents the Enemy units Prefab.
 * @constructor
 * @param {Object} game_state - The current game state object
 * @param {number} x - x position for the enemy unit
 */  
Airship.BattleState.Enemy = function (game_state, character_index) {

    // name of enemy unit
    this.name = "soldier";

    // starting position of enemy unit
    this.startPosition = {
      x: character_index * 100 + 200,
      y: 150
    }

    // create new object from Unit prefab
    Airship.BattleState.Unit.call(this, game_state, {x: this.startPosition.x, y: this.startPosition.y}, 'soldier', 0);

    // set enemy units stats
    this.stats = {};
    this.stats.health = 50;
    this.stats.attack = 13;
    this.stats.defense = 5;

    // enemy unit is clicked (action of player unit)
    this.events.onInputDown.add(function(target) {
      
      // disable clicking on all enemy units
      this.game_state.groups.enemies.forEachAlive(function(unit) {
        unit.inputEnabled = false;
        unit.input.useHandCursor = false;
      }, this);
      
      // destroy the click message
      this.game_state.message.destroy();
      
      // theplayer unit attacks this unit
      this.game_state.current_unit.attack(target, 0.5);
    }, this);
};
Airship.BattleState.Enemy.prototype = Object.create(Airship.BattleState.Unit.prototype);
Airship.BattleState.Enemy.prototype.constructor = Airship.BattleState.Enemy;


/**
 * Enemy unit is acting
 */  
Airship.BattleState.Enemy.prototype.act = function () {

    var alive_characters, target_index, target, damage;

    // create array of alive characters for unit to chose from
    alive_characters = [];
    this.game_state.groups.characters.forEachAlive(function(unit) {
      alive_characters.push(unit);
    }, this);

    // randomly choose target player character 
    target_index = this.game_state.rnd.between(0, alive_characters.length - 1);
    target = alive_characters[target_index];

    // attack the chosen character unit
    this.attack(target, 0.5);
};