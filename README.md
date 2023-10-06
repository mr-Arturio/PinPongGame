### Ping Pong Game

The idea is to create a ping pong game where two players can interact and play by moving a 'platform' from one part of the screen, trying to hit the 'ball' to the other player. We will keep score; if you miss the 'ball', your opponent will get a point.

I have decided to start with the simple "Score Keeping" panel and will move further to the game model logic.

I'll begin with vanilla JS and HTML and use Bulma for CSS. Later, I will transition to a React UI. The game mechanic is new to me, so it will be an interesting challenge. I have an idea of how to move the 'platforms' using the keyboard and DOM events, but the movement of the ball is a mystery to me for now... <br>

In the future, I may add the ability to play with your friends on different machines (WebSocket?), but for now, I'll focus on just two players on one computer using the keyboard.

Things to consider:
- *Game Logic: Understand the physics of ball movement in a Ping Pong game. You'll need to handle collisions, calculate angles, and update the game state accordingly. There are libraries like Matter.js or Phaser that can simplify this process.* 
- *Graphics and Visuals: Think about the visual elements of your game. Even in its early stages, having some basic graphics and animations can make the game more engaging.*

To add:
for ping pong score  when score is 10:10 add an option for player to win by two points
keep track of the game score: how many games one player won. 

Progress: <br>
I have a ping pong game that needs to be refactored. It is currently you versus the computer. We need to add a second player option, connect scores, and implement "Playing To" logic. Additionally, we need to adjust the game mechanics.<br>
Import/export works wierd... doesnt want to work strait away, but after magicaly works, maybe it is something with the server...