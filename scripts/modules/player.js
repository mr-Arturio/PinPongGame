import { DIRECTION } from './directions.js';

export const Player = {
  new(side, controlKeys) {
    return {
      width: 18,
      height: 180,
      x: side === 'left' ? 150 : this.canvas.width - 150,
      y: (this.canvas.height / 2) - 35,
      score: 0,
      move: DIRECTION.IDLE,
      speed: 8,
      controlKeys: controlKeys, // Array of control keys for this player
    };
  },
};