import { DIRECTION } from './directions.js';

// The ai object (The two lines that move up and down)
export const Ai = {
  new(side) {
      return {
          width: 18,
          height: 180,
          x: side === 'left' ? 150 : this.canvas.width - 150,
          y: (this.canvas.height / 2) - 35,
          score: 0,
          move: DIRECTION.IDLE,
          speed: 8
      };
  }
};