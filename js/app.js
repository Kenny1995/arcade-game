let level = 1;

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetEnemy = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if( level === 1){
        //allEnemies.splice(4, 9);
        this.speed = 160;
    }
    if( level === 2 ){
        //allEnemies.splice(6, 9);
        this.speed = 270;
    }
    if( level === 3 ){
        //allEnemies.slice(0, 9);
        this.speed = 360;
    }

    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    } else {
        // to reset the enemy
        this.x = this.resetEnemy;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and

class Hero {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }

    // To Draw the hero sprite on current x and y cordinate
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Update the x and y properties in hero according to input
     *
     * @param {string} input - Direction to travel
     */
    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }

    update() {

        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2)) {
                this.reset();
            }
        }

        // if(this.y === -28) {
        //     this.victory = true;
        // }
        //changes, handles and displays the level
        if (this.y < -18) {
            this.reset();
            level++;
            if (level > 3) {
                prompt('YOU WIN!!!')
                setTimeout(this.reset(), 1000);
                level = 1;
            }
            document.getElementById("myspan").innerHTML = level;
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}

const player = new Hero();
const enemy1 = new Enemy(-101, 0, this.speed);
const enemy2 = new Enemy(-101, 83, this.speed);
const enemy3 = new Enemy((-101 * 2.5), 83, this.speed);
const enemy4 = new Enemy(-101, 166, this.speed);
const enemy5 = new Enemy((-101 * 2.5), 0, this.speed);
const enemy6 = new Enemy((-101 * 3.5), 83, this.speed);
const enemy7 = new Enemy((-101 * 2.5), 166, this.speed);
const enemy8 = new Enemy((-101 * 3.8), 0, this.speed);
const enemy9 = new Enemy((-101 * 4), 166, this.speed);

const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});