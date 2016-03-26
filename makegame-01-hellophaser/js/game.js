"use strict"

// create new phaser game object with height: 800px and height: 600px
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create });


function preload () {
    // everything in here is performed before loading the game
    
    // load the game assets
    game.load.image('logo', 'assets/phaser.png');

}

function create () {
    // after preloading is finished, this sets up the initial game stage
    
    // add the image to the center of the game stage
    var logo = game.add.image(game.world.centerX, game.world.centerY, 'logo');
    
    // set the anchor point to the center of the image
    logo.anchor.setTo(0.5, 0.5);

}
