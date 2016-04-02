"use strict";

var Airship = Airship || {},
    Phaser = Phaser || {};
    
/**
 * Represents the Load State.
 * @constructor
 */
Airship.LoadState = function (game) {
  
  Phaser.State.call(this);

  // define font style
  this._fontStyle = { font: "bold 20px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
};

Airship.LoadState.prototype = Object.create(Phaser.State.prototype);
Airship.LoadState.prototype.constructor = Airship.LoadState;


/**
 * Preloading the Load State
 */  
Airship.LoadState.prototype.preload = function () {

    // add a loading text to the screen
    this.loadingLabel = this.game.add.text(this.game._width / 2, this.game._height / 2, "loading assets...", this._fontStyle);
    this.loadingLabel.anchor.setTo(0.5, 0.5);

    // load the game assets
    this.load.image('logo', 'assets/logo.gif');
    this.load.image('ship', 'assets/airship.png');
    this.load.image('map', 'assets/fantasy_world_map.jpg');
    this.load.image('city', 'assets/circle.png');
    this.load.image('rectangle', 'assets/rectangle.png');
    this.load.spritesheet('soldier', 'assets/soldier.png', 32, 36, 45);
};


/**
 * Creating the Load State
 */  
Airship.LoadState.prototype.create = function () {
    // go to the Start state to start the game
    this.state.start('StartState');
};

