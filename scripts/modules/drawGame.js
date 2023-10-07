export function drawGame(Pong, rounds) {
  // Clear the Canvas
  Pong.context.clearRect(0, 0, Pong.canvas.width, Pong.canvas.height);

  // Set the fill style to black
  Pong.context.fillStyle = Pong.color;

  // Draw the background
  Pong.context.fillRect(0, 0, Pong.canvas.width, Pong.canvas.height);

  // Set the fill style to white (For the paddles and the ball)
  Pong.context.fillStyle = "#ffffff";

  // Draw the Player
  Pong.context.fillRect(
    Pong.player.x,
    Pong.player.y,
    Pong.player.width,
    Pong.player.height
  );

  // Draw the Ball
  if (Pong._turnDelayIsOver.call(Pong)) {
    Pong.context.fillRect(
      Pong.ball.x,
      Pong.ball.y,
      Pong.ball.width,
      Pong.ball.height
    );
  }

  // Draw the net (Line in the middle)
  Pong.context.beginPath();
  Pong.context.setLineDash([7, 15]);
  Pong.context.moveTo(Pong.canvas.width / 2, Pong.canvas.height - 140);
  Pong.context.lineTo(Pong.canvas.width / 2, 140);
  Pong.context.lineWidth = 10;
  Pong.context.strokeStyle = "#ffffff";
  Pong.context.stroke();

  // Set the default canvas font and align it to the center
  Pong.context.font = "100px Courier New";
  Pong.context.textAlign = "center";

  // Draw the players score (left)
  Pong.context.fillText(
    Pong.player.score.toString(),
    Pong.canvas.width / 2 - 300,
    200
  );

  if (Pong.ai) { // Check if Pong.ai (AI) exists before drawing its score
    // Draw the paddles score (right)
    Pong.context.fillRect(Pong.ai.x, Pong.ai.y, Pong.ai.width, Pong.ai.height);
  }

  // Change the font size for the center score text
  Pong.context.font = "30px Courier New";

  // Draw the winning score (center)
  Pong.context.fillText(
    "Round " + (Pong.round + 1),
    Pong.canvas.width / 2,
    35
  );

  // Change the font size for the center score value
  Pong.context.font = "40px Courier";

  // Draw the current round number
  Pong.context.fillText(
    rounds[Pong.round] ? rounds[Pong.round] : rounds[Pong.round - 1],
    Pong.canvas.width / 2,
    100
  );
}
