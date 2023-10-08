import { Ball } from "./modules/ball.js";
import { DIRECTION } from "./modules/directions.js";
// import { Ai } from "./modules/ai.js";
import { drawGame } from "./modules/drawGame.js";

const rounds = [5, 5, 3, 3, 2];
const colors = ["#1abc9c", "#2ecc71", "#3498db", "#8c52ff", "#9b59b6"];

const Game = {
  initialize() {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
  
    this.canvas.width = 1400;
    this.canvas.height = 1000;
  
    this.canvas.style.width = this.canvas.width / 2 + "px";
    this.canvas.style.height = this.canvas.height / 2 + "px";

    this.player1 = {
      width: 18,
      height: 180,
      x: 150,
      y: this.canvas.height / 2 - 35,
      score: 0,
      move: DIRECTION.IDLE,
      speed: 8,
    };

    this.player2 = {
      width: 18,
      height: 180,
      x: this.canvas.width - 150,
      y: this.canvas.height / 2 - 35,
      score: 0,
      move: DIRECTION.IDLE,
      speed: 8,
    };

    this.ball = Ball.new.call(this);

    this.player1.speed = 5;
    this.player2.speed = 5;
    this.running = this.over = false;
    this.turn = this.player2;
    this.timer = this.round = 0;
    this.color = "#8c52ff";
  
    Pong.menu();
    Pong.listen();
  },

  endGameMenu: function (text) {
    // Change the canvas font size and color
    Pong.context.font = "45px Courier New";
    Pong.context.fillStyle = this.color;

    // Draw the rectangle behind the 'Press any key to begin' text.
    Pong.context.fillRect(
      Pong.canvas.width / 2 - 350,
      Pong.canvas.height / 2 - 48,
      700,
      100
    );

    // Change the canvas color;
    Pong.context.fillStyle = "#ffffff";

    // Draw the end game menu text ('Game Over' and 'Winner')
    Pong.context.fillText(
      text,
      Pong.canvas.width / 2,
      Pong.canvas.height / 2 + 15
    );

    setTimeout(function () {
      Pong = Object.assign({}, Game);
      Pong.initialize();
    }, 3000);
  },

  menu: function () {
    // Draw all the Pong objects in their current state
    Pong.draw();

    // Change the canvas font size and color
    this.context.font = "50px Courier New";
    this.context.fillStyle = this.color;

    // Draw the rectangle behind the 'Press any key to begin' text.
    this.context.fillRect(
      this.canvas.width / 2 - 350,
      this.canvas.height / 2 - 48,
      700,
      100
    );

    // Change the canvas color;
    this.context.fillStyle = "#ffffff";

    // Draw the 'press any key to begin' text
    this.context.fillText(
      "Press any key to begin",
      this.canvas.width / 2,
      this.canvas.height / 2 + 15
    );
  },

  update: function () {
    if (!this.over) {
      // If the ball collides with the bound limits - correct the x and y coords.
      if (this.ball.x <= 0) this._resetTurn(this.player2, this.player1);
      if (this.ball.x >= this.canvas.width - this.ball.width)
        this._resetTurn(this.player1, this.player2);
      if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN;
      if (this.ball.y >= this.canvas.height - this.ball.height)
        this.ball.moveY = DIRECTION.UP;

      // Move player 1 if their move value was updated by a keyboard event
      if (this.player1.move === DIRECTION.UP)
        this.player1.y -= this.player1.speed;
      else if (this.player1.move === DIRECTION.DOWN)
        this.player1.y += this.player1.speed;

      // On new serve (start of each turn) move the ball to the correct side
      // and randomize the direction to add some challenge.
      if (this._turnDelayIsOver() && this.turn) {
        this.ball.moveX =
          this.turn === this.player1 ? DIRECTION.LEFT : DIRECTION.RIGHT;
        this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][
          Math.round(Math.random())
        ];
        this.ball.y =
          Math.floor(Math.random() * this.canvas.height - 200) + 200;
        this.turn = null;
      }

      // If player 1 collides with the bound limits, update the x and y coords.
      if (this.player1.y <= 0) this.player1.y = 0;
      else if (this.player1.y >= this.canvas.height - this.player1.height)
        this.player1.y = this.canvas.height - this.player1.height;

      // Move ball in intended direction based on moveY and moveX values
      if (this.ball.moveY === DIRECTION.UP)
        this.ball.y -= this.ball.speed / 1.5;
      else if (this.ball.moveY === DIRECTION.DOWN)
        this.ball.y += this.ball.speed / 1.5;
      if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
      else if (this.ball.moveX === DIRECTION.RIGHT)
        this.ball.x += this.ball.speed;

      // Handle player 2 (second player) UP and DOWN movement
      if (this.player2.move === DIRECTION.UP)
        this.player2.y -= this.player2.speed;
      else if (this.player2.move === DIRECTION.DOWN)
        this.player2.y += this.player2.speed;

              // If player 2 collides with the bound limits, update the x and y coords.
      if (this.player2.y <= 0) this.player2.y = 0;
      else if (this.player2.y >= this.canvas.height - this.player2.height)
        this.player2.y = this.canvas.height - this.player2.height;

      // Handle Player 1-Ball collisions
      if (
        this.ball.x - this.ball.width <= this.player1.x &&
        this.ball.x >= this.player1.x - this.player1.width
      ) {
        if (
          this.ball.y <= this.player1.y + this.player1.height &&
          this.ball.y + this.ball.height >= this.player1.y
        ) {
          this.ball.x = this.player1.x + this.ball.width;
          this.ball.moveX = DIRECTION.RIGHT;
        }
      }

      // Handle Player 2-Ball collisions
      if (
        this.ball.x - this.ball.width <= this.player2.x &&
        this.ball.x >= this.player2.x - this.player2.width
      ) {
        if (
          this.ball.y <= this.player2.y + this.player2.height &&
          this.ball.y + this.ball.height >= this.player2.y
        ) {
          this.ball.x = this.player2.x - this.ball.width;
          this.ball.moveX = DIRECTION.LEFT;
        }
      }
    }
  
    // Handle the end of round transition
    // Check to see if player 1 won the round.
    if (this.player1.score === rounds[this.round]) {
      // Check to see if there are any more rounds/levels left and display the victory screen if
      // there are not.
      if (!rounds[this.round + 1]) {
        this.over = true;
        setTimeout(() => {
          Pong.endGameMenu("Player 1 Wins!");
        }, 1000);
      } else {
        // If there is another round, reset all the values and increment the round number.
        this.color = this._generateRoundColor();
        this.player1.score = this.player2.score = 0;
        this.player1.speed += 0.5;
        this.player2.speed += 0.5;
        this.ball.speed += 1;
        this.round += 1;
      }
    }
    // Check to see if player 2 won the round.
    else if (this.player2.score === rounds[this.round]) {
      this.over = true;
      setTimeout(() => {
        Pong.endGameMenu("Player 2 Wins!");
      }, 1000);
    }
  },
  

  // Draw the objects to the canvas element
  draw: function () {
    drawGame(this, rounds); // Use the drawGame function from the draw module
  },

  loop: function () {
    Pong.update();
    Pong.draw();

    // If the game is not over, draw the next frame.
    if (!Pong.over) requestAnimationFrame(Pong.loop);
  },

  listen: function () {
    document.addEventListener("keydown", (key) => {
      // Handle the 'Press any key to begin' function and start the game.
      if (!this.running) {
        this.running = true;
        window.requestAnimationFrame(this.loop);
      }

      // Player 1 controls
      if (key.key === "w") this.player1.move = DIRECTION.UP;
      else if (key.key === "s") this.player1.move = DIRECTION.DOWN;

      // Player 2 controls (arrow keys)
      if (key.key === "ArrowUp") this.player2.move = DIRECTION.UP;
      else if (key.key === "ArrowDown") this.player2.move = DIRECTION.DOWN;
    });

    // Stop player 1 from moving when there are no keys being pressed.
    document.addEventListener("keyup", (key) => {
      if (key.key === "w" || key.key === "s")
        this.player1.move = DIRECTION.IDLE;
      if (key.key === "ArrowUp" || key.key === "ArrowDown")
        this.player2.move = DIRECTION.IDLE;
    });
  },
  

  // Reset the ball location, the player turns and set a delay before the next round begins.
  _resetTurn: function (victor, loser) {
    this.ball = Ball.new.call(this, this.ball.speed);
    this.turn = loser;
    this.timer = new Date().getTime();

    victor.score++;
  },

  // Wait for a delay to have passed after each turn.
  _turnDelayIsOver: function () {
    return new Date().getTime() - this.timer >= 1000;
  },

  // Select a random color as the background of each level/round.
  _generateRoundColor: function () {
    var newColor = colors[Math.floor(Math.random() * colors.length)];
    if (newColor === this.color) return Pong._generateRoundColor();
    return newColor;
  },
};

const Pong = Object.assign({}, Game);
Pong.initialize();