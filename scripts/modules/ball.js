// The ball object (The cube that bounces back and forth)
import { DIRECTION } from "./directions.js";

export const Ball = {
  new(incrementedSpeed) {
    return {
      width: 18,
      height: 18,
      x: (this.canvas.width / 2) - 9,
      y: (this.canvas.height / 2) - 9,
      moveX: DIRECTION.IDLE,
      moveY: DIRECTION.IDLE,
      speed: incrementedSpeed || 7
    };
  }
};