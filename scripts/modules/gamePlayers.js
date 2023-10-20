import { Ball } from "./ball.js";
import { DIRECTION } from "./directions.js";
import { Ai } from "./ai.js";
import { drawGame } from "./drawGame.js";


export default function RunGame() {

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

    this.player = Ai.new.call(this, "left");
    this.ai = Ai.new.call(this, "right");
    this.ball = Ball.new.call(this);

    this.ai.speed = 5;
    this.running = this.over = false;
    this.turn = this.ai;
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

  // Update all objects (move the player, ai, ball, increment the score, etc.)
  update: function () {
    if (!this.over) {
      // If the ball collides with the bound limits - correct the x and y coords.
      if (this.ball.x <= 0) Pong._resetTurn.call(this, this.ai, this.player);
      if (this.ball.x >= this.canvas.width - this.ball.width)
        Pong._resetTurn.call(this, this.player, this.ai);
      if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN;
      if (this.ball.y >= this.canvas.height - this.ball.height)
        this.ball.moveY = DIRECTION.UP;

      // Move player if they player.move value was updated by a keyboard event
      if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
      else if (this.player.move === DIRECTION.DOWN)
        this.player.y += this.player.speed;

      // On new serve (start of each turn) move the ball to the correct side
      // and randomize the direction to add some challenge.
      if (Pong._turnDelayIsOver.call(this) && this.turn) {
        this.ball.moveX =
          this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
        this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][
          Math.round(Math.random())
        ];
        this.ball.y =
          Math.floor(Math.random() * this.canvas.height - 200) + 200;
        this.turn = null;
      }

      // If the player collides with the bound limits, update the x and y coords.
      if (this.player.y <= 0) this.player.y = 0;
      else if (this.player.y >= this.canvas.height - this.player.height)
        this.player.y = this.canvas.height - this.player.height;

      // Move ball in intended direction based on moveY and moveX values
      if (this.ball.moveY === DIRECTION.UP)
        this.ball.y -= this.ball.speed / 1.5;
      else if (this.ball.moveY === DIRECTION.DOWN)
        this.ball.y += this.ball.speed / 1.5;
      if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
      else if (this.ball.moveX === DIRECTION.RIGHT)
        this.ball.x += this.ball.speed;

      // Handle player 2 (second player) UP and DOWN movement
      if (this.ai.move === DIRECTION.UP)
        this.ai.y -= this.ai.speed;
      else if (this.ai.move === DIRECTION.DOWN)
        this.ai.y += this.ai.speed;

              // If player 2 collides with the bound limits, update the x and y coords.
      if (this.ai.y <= 0) this.ai.y = 0;
      else if (this.ai.y >= this.canvas.height - this.ai.height)
        this.ai.y = this.canvas.height - this.ai.height;

      // Handle Player 1-Ball collisions
      if (
        this.ball.x - this.ball.width <= this.player.x &&
        this.ball.x >= this.player.x - this.player.width
      ) {
        if (
          this.ball.y <= this.player.y + this.player.height &&
          this.ball.y + this.ball.height >= this.player.y
        ) {
          this.ball.x = this.player.x + this.ball.width;
          this.ball.moveX = DIRECTION.RIGHT;
        }
      }

      // Handle Player 2-Ball collisions
      if (
        this.ball.x - this.ball.width <= this.ai.x &&
        this.ball.x >= this.ai.x - this.ai.width
      ) {
        if (
          this.ball.y <= this.ai.y + this.ai.height &&
          this.ball.y + this.ball.height >= this.ai.y
        ) {
          this.ball.x = this.ai.x - this.ball.width;
          this.ball.moveX = DIRECTION.LEFT;
        }
      }
    }
  
    // Handle the end of round transition
    // Check to see if player 1 won the round.
    if (this.player.score === rounds[this.round]) {
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
        this.player.score = this.ai.score = 0;
        this.player.speed += 0.5;
        this.ai.speed += 0.5;
        this.ball.speed += 1;
        this.round += 1;
      }
    }
    // Check to see if player 2 won the round.
    else if (this.ai.score === rounds[this.round]) {
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
      if (key.key === "w") this.player.move = DIRECTION.UP;
      else if (key.key === "s") this.player.move = DIRECTION.DOWN;

      // Player 2 controls (arrow keys)
      if (key.key === "ArrowUp") this.ai.move = DIRECTION.UP;
      else if (key.key === "ArrowDown") this.ai.move = DIRECTION.DOWN;
    });

    // Stop player 1 from moving when there are no keys being pressed.
    document.addEventListener("keyup", (key) => {
      if (key.key === "w" || key.key === "s")
        this.player.move = DIRECTION.IDLE;
      if (key.key === "ArrowUp" || key.key === "ArrowDown")
        this.ai.move = DIRECTION.IDLE;
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
};