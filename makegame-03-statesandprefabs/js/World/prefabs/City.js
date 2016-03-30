"use strict";

var Airship = Airship || {},
    Phaser = Phaser || {};

Airship.WorldState.City = function (game) {

    var x = game.rnd.between(100, 770);
    var y = game.rnd.between(0, 570);

    Phaser.Sprite.call(this, game, x, y, 'city', 1);

    game.physics.arcade.enable(this);

    this.troops = game.rnd.between(1, 6);

};

Airship.WorldState.City.prototype = Object.create(Phaser.Sprite.prototype);
Airship.WorldState.City.prototype.constructor = Airship.WorldState.City;
