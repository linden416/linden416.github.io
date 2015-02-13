//Global Constants
var COL_WIDTH = 101;
var ROW_HEIGHT = 83;
//Variables
var bHALT_Action = false; //controls entity movement on playing grid
var position = {
    'x': 0,
    'y': 0
};

//---------------------------------------------
// Enemy Class
//---------------------------------------------
// Enemies our player must avoid
// Input Parameters:
// * rowStart & colStart set the initial position of the Enemy sprite image
// * spped is a setting {'default' | 'fast' | 'warp'}
// * rowJumper set the initial value to {true | false}
var Enemy = function(rowStart, colStart, speed, rowJumper) {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';

    this.speedFactor = 3; //Set the default speed factor
    if (speed === 'fast')
        this.speedFactor = 6;  //Fast factor
    else if (speed === 'warp')
        this.speedFactor = 12; //Double the speed for warp factor

    this.rowJumper = rowJumper; //Indicates whether the enemy jumps to other rows

    this.col = colStart; //Keep active track of the current row and col
    this.row = rowStart;

    position = calcGridPosition(this.row, this.col); //Convert row & col to X Y co-ordinates
    this.x = position.x;
    this.y = position.y;
 };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var speed = 50 * this.speedFactor;  //Base speed is set to 50 which is multiplied
                                        //by the speedFactor property to alter speeds
    //The halt action setting is by default set to false.
    //It is true when the player makes it across successfully or if
    //the player is overcome by the enemy. The halt is for short 4 secs.
    if (bHALT_Action === false) {

       this.x += speed * dt;

        if (this.x > (COL_WIDTH * 5)) {  //Image is off the canvas
            this.x = -50;  //Reposition image to enter canvas again from the left
            if (this.rowJumper === true) {
                this.y = enemyJumpRow(this.y); //Find a different row to prowl
                this.rowJumper = false;
            }
            else {
                this.rowJumper = true; //If not set as row jumper, set true for next iteration
            }
        }

        //Reevaluate current col and row positions
        this.col = calcColumn(this.x);
        this.row = calcRow(this.y);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    var imgOffset = 30; //Clip the top portion of enemy bug image
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.y - imgOffset) );
};

//---------------------------------------------
// Player Class
//---------------------------------------------
// The Player represents an icon on grid that crosses a stone path on playing area.
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png'; //The image of player is a boy
    this.initPosition(); //Set the initial position of player on grid

    //Determine row & column position
    this.row = calcRow(this.y); //1-6; 83px per row
    this.col = calcColumn(this.x); //1-5; 101px per col

};

//Position the player in start position
Player.prototype.initPosition = function() {
    this.x = COL_WIDTH * 2; //position middle column
    this.y = ROW_HEIGHT * 5; //postion bottom "grass level"
    this.row = calcRow(this.y);
    this.col = calcColumn(this.x);
};

//The game engine continuously calls the player update method
Player.prototype.update = function() {
    if (bHALT_Action === true){
        return; //Just return, no change to be made to player at this time
    }

    //If player is at the first row, this would be the water. A successful crossing!
    if (this.row === 1) {  //Player pass through successfully to water!
        this.row = -1;  //Change this value so that condition isn't true on next update call
        bHALT_Action = true; //Stop rendering entities, pause the field
        this.sprite =  'images/in-da-h2o-3.png'; //Change entity image to one that reflects success!
        setTimeout(this.winner, 4000); //Call winner function after 4 secs
    }
};

//Set global boolean variable to prevent rendering of the enemy bugs for short moment before
//reinitializing player to original entity and starting position. Then restart the bugs.
Player.prototype.winner = function() {
    bHALT_Action = false; //Game on!
    player.sprite = 'images/char-boy.png'; //Set player back to original entity
    player.initPosition(); //Reset the player to start position
    clearTimeout();
};

//Display player image sprite on canvas using X Y co-ordinates
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Keyboard arrow keys move the player up, down, left, right one position
Player.prototype.handleInput = function(pressedKey) {
    //Ignore input if HALT Action is true
    if (bHALT_Action === false){
        //Up & Downs. Determine if there is at least a one row of space to move, if not do nothing
        if (pressedKey === 'up'){
            if ( (this.y - ROW_HEIGHT) >= 0) {
                this.y -= ROW_HEIGHT; //move up one row
                this.row = calcRow(this.y); //Determine the new row
            }
        }
        else if (pressedKey === 'down'){
            if ( (this.y + ROW_HEIGHT) < (ROW_HEIGHT * 5)) {
                this.y += ROW_HEIGHT;
                this.row = calcRow(this.y); //Determine what row the player is on
            }
        }
        //Left & Rights. Determine if there is at least a columns width of space to move, if not do nothing
        else if (pressedKey === 'right'){
            if ( (this.x + COL_WIDTH) < (COL_WIDTH * 5)) {
                this.x += COL_WIDTH;     //Move a full COL_WIDTH to right
                this.col = calcColumn(this.x);  //Determine new column
            }
        }
        else if (pressedKey === 'left'){
            if ( (this.x - COL_WIDTH) >= 0){
                this.x -= COL_WIDTH; //Move a full COL_WIDTH to left
                this.col = calcColumn(this.x); //Determine new column
            }
        }
    }
};

//Determine if an enemy object and the player are in the same row and col cell.
//If they share the same cell, a collision has been found. 
//Halt movement temporarily, change the player image, then reset another game.
Player.prototype.checkCollisions = function() {
   if (bHALT_Action === false){

        for(enemy = 0; enemy < allEnemies.length; enemy++) //Traverse all active enemy objects
        {
            //check for enemy and player grid cell match
            if ( allEnemies[enemy].row === player.row  &&
                 allEnemies[enemy].col === player.col) {

                //Collision has occurred, pause entities briefly before reinitializing
                bHALT_Action = true; //pause action to show enemy hit.
                player.sprite = 'images/dead-boy.png'; //Change the player sprite to reflect enemy hit

                setTimeout(this.reset, 2000); //Call reset function after 2 secs

                break; //collision found, no need to check any further, get out of for loop
            }
        }
    }
};

//Turn the game action back to true, reset player sprite to boy image,
//Initialize the player to start position, clear out the Timeout setting.
Player.prototype.reset = function() {
    bHALT_Action = false;
    player.sprite = 'images/char-boy.png'; //default sprite
    player.initPosition(); //Reset the player to start position
    clearTimeout();
};

//---------------------------------------------
// Create objects to start the game
//---------------------------------------------
// Instantiate three objects moving at three different speeds.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies[0] = new Enemy(1, 1, 'warp', true);
allEnemies[1] = new Enemy(2, 4, 'default', false);
allEnemies[2] = new Enemy(3, 5, 'fast', false);

// Create an instance of the Player class.
var player = new Player();

//---------------------------------------------
// Event Listeners
//---------------------------------------------
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//---------------------------------------------
// Functions
//---------------------------------------------
//Receive a row and col position, determine X Y co-ordinates on canvas
function calcGridPosition(row, col) {
    position.x = 0;
    position.y = 0;

    //Determine row position
    if (row === 1)
        position.y = ROW_HEIGHT * 1;
    else if (row === 2)
        position.y = ROW_HEIGHT * 2;
    else if (row === 3)
        position.y = ROW_HEIGHT * 3;
    else if (row === 4)
        position.y = ROW_HEIGHT * 4;

    //Determine col position
    if (col === 1)
        position.X = 0;
    else if (col === 2)
        position.X = COL_WIDTH * 1;
    else if (col === 3)
        position.X = COL_WIDTH * 2;
    else if (col === 4)
        position.X = COL_WIDTH * 3;
    else if (col === 5)
        position.X = COL_WIDTH * 4;

    return position;
};

//Receive an X co-ordinate, determine the matching column on the horizontal axis of the canvas.
function calcColumn(x) {
    var col = 0;

    //Divide the X co-ord by the column width, discard remainder, and match
    if (Math.floor(x/COL_WIDTH) === 0)  //col is 1 when y between 0 and 101
        col = 1;
    else if (Math.floor(x/COL_WIDTH) === 1) //col is 2 when y between 101 and 202
        col = 2;
    else if (Math.floor(x/COL_WIDTH) === 2) //col is 3 when y between 202 and 303
        col = 3;
    else if (Math.floor(x/COL_WIDTH) === 3) //col is 4 when y between 303 and 404
        col = 4;
    else if (Math.floor(x/COL_WIDTH) === 4) //col is 5 when y between 404 and 505
        col = 5;

    return col;
};

//Receive a Y co-ordinate, determine the matching row on the vertical axis of the canvas.
function calcRow(y) {
    var row = 0;

    //Divide the Y co-ord by the row height, discard remainder, and match
    if (Math.floor(y/ROW_HEIGHT) === 0)  //col is 1 when y between 0 and 101
        row = 1;
    else if (Math.floor(y/ROW_HEIGHT) === 1) //col is 2 when y between 101 and 202
        row = 2;
    else if (Math.floor(y/ROW_HEIGHT) === 2) //col is 3 when y between 202 and 303
        row = 3;
    else if (Math.floor(y/ROW_HEIGHT) === 3) //col is 4 when y between 303 and 404
        row = 4;
    else if (Math.floor(y/ROW_HEIGHT) === 4) //col is 5 when y between 404 and 505
        row = 5;

    return row;
};

//Receive an Enemy Y co-ordinate property, reposition the Enemy on a new row
//on the three rows spanning the stone portion of the canvas.
function enemyJumpRow(y) {
    if ((y + ROW_HEIGHT) < (ROW_HEIGHT * 4))
        return y + ROW_HEIGHT;
    else
        return ROW_HEIGHT;
};
