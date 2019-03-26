var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
    preload: preload, create: create, update: update
  });

  var ball;
  var paddle;
  //brick group
  var bricks;
  //brick obj
  var newBrick;
  // brick data
  var brickData;

  function preload() {
    game.scale.scalemode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#333';

    // load assets
    game.load.image('ball', 'assets/ball.png')
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('brick', 'assets/brick.png');
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

    //ball
    ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball')
    ball.anchor.set(0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.set(150, -150);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function(){
        alert('YOU DIED!');
        location.reload();
    }, this);

    //paddle
    paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;

    //bricks
    drawBricks();
  }

  function update() {
    game.physics.arcade.collide(ball, paddle);
    game.physics.arcade.collide(ball, bricks, ballBrickCollision)
    paddle.x = game.input.x || game.world.width*0.5;
  }

  function ballBrickCollision(ball, brick) { brick.kill(); }

  function drawBricks() {
    // data
    brickData = {
      width: 50,
      height: 20,
      count: {
        row: 3,
        columns: 7
      },
      offset: {
          top: 50,
          left: 60
      },
      padding: 10
    }

    //add group by looping rows and columns
    bricks = game.add.group();
    for(i = 0; i < brickData.count.columns; i++) {
      for(j = 0; j < brickData.count.row; j++) {
        
        var x = (i * (brickData.width + brickData.padding)) + brickData.offset.left;
        var y = (j * (brickData.height + brickData.padding)) + brickData.offset.top;

        newBrick = game.add.sprite(x, y, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
      }
    }
  }