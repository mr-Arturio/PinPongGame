import { DIRECTION } from './constants.js';

// The ball object (The cube that bounces back and forth)
export function createBall(canvas, incrementedSpeed) {
  return {
    width: 18,
    height: 18,
    x: (canvas.width / 2) - 9,
    y: (canvas.height / 2) - 9,
    moveX: DIRECTION.IDLE,
    moveY: DIRECTION.IDLE,
    speed: incrementedSpeed || 7,
  };
}