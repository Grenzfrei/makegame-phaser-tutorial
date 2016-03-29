"use strict"

// create new phaser game object with height: 800px and height: 600px
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });


function preload () {
  // Change the background color of the game
  game.stage.backgroundColor = '#43BBFC';

  // load the game assets
  game.load.image('ship', 'assets/airship.png');
  game.load.image('map', 'assets/fantasy_world_map.jpg');

}

var ship,
    cursors,
    speed = 250; // how fast the ship will move


function create () {
  
   // add the background map
   game.add.sprite(0, 0, 'map');

  // enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // add the preloaded ship image to the center of the stage
  ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
  
  //set the anchorpoint to center of the sprite
  ship.anchor.setTo(0.5, 0.5);

  // enable physics for the ship
  game.physics.arcade.enable(ship);

  // create the controls
  cursors = game.input.keyboard.createCursorKeys();

}


function update() {
  
    // this contains all the games logic, called 60 times per second

    //  Reset the ships velocity (movement)
    ship.body.velocity.x = 0;
    ship.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        ship.body.velocity.x = -speed;
        // turn ship to the left
        ship.angle = 90;

        // if ship leaves stage to the left, let it reappear from the right
        if(ship.x <= 0)
        {
          ship.x = game.world._width;
        }
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        ship.body.velocity.x = speed;
        // turn ship to the right
        ship.angle = 270;

        // if ship leaves stage to the right, let it reappear from the left
        if(ship.x >= game.world._width)
        {
          ship.x = 0;
        }

    }
    else if (cursors.up.isDown)
    {
        //  Move to the right
        ship.body.velocity.y = -speed;
        // turn ship to the top
        ship.angle = 180;

        // if ship leaves stage to the top, let it reappear from the bottom
        if(ship.y <= 0 )
        {
          ship.y = game.world._height;
        }

    }
    else if (cursors.down.isDown)
    {
        //  Move to the right
        ship.body.velocity.y = speed;
        // turn ship to the bottom
        ship.angle = 0;

        // if ship leaves stage to the bottom, let it reappear from the top
        if(ship.y >= game.world._height)
        {
          ship.y = 0;
        }

    }

}


