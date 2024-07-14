import { Game } from '../scenes/Game';

export class Enemy extends Phaser.GameObjects.Sprite
{
  adjustedAngle: number = this.angle + 90;
  velocity: number = 4;

  constructor(scene: Game, x: number, y: number)
  {
    super(scene, x, y, 'enemy-black');
    scene.add.existing(this);
  }

  update()
  {
    this.adjustedAngle = this.angle + 90;
    const directionX = Math.cos(-this.adjustedAngle * Phaser.Math.DEG_TO_RAD);
    const directionY = -Math.sin(-this.adjustedAngle * Phaser.Math.DEG_TO_RAD);
    this.setPosition(this.x + directionX * this.velocity, this.y + directionY * this.velocity);

    this.setAngle(Math.atan2(this.scene.player.y - this.y, this.scene.player.x - this.x) * Phaser.Math.RAD_TO_DEG - 90);

    if (this.x < 0 - this.width / 2) {
      this.x = this.scene.cameras.main.width;
    }
    else if (this.x > this.scene.cameras.main.width + this.width / 2) {
      this.x = 0;
    }
  }
}

function lerp(a: number, b: number, n: number): number
{
  return (1 - n) * a + n * b;
}