import { Game } from '../scenes/Game';
import { Lerp } from  '../Lerp'

export class Enemy extends Phaser.GameObjects.Sprite
{
  adjustedAngle: number = this.angle + 90;
  velocity: number = Math.random() * 5 + 1;

  constructor(scene: Game, x: number, y: number)
  {
    super(scene, x, y, 'enemy-black');
    scene.add.existing(this);
  }

  update()
  {
    this.adjustedAngle = this.angle + 90;
    const direction = new Phaser.Math.Vector2(Math.cos(-this.adjustedAngle * Phaser.Math.DEG_TO_RAD), -Math.sin(-this.adjustedAngle * Phaser.Math.DEG_TO_RAD));
    this.setPosition(this.velocity * direction.x + this.x , this.velocity * direction.y + this.y);
    //@ts-expect-error Property 'player' does not exist on type 'Scene'.
    const lerpedAngle = Lerp.lerpAngle(this.angle, Math.atan2(this.scene.player.y - this.y, this.scene.player.x - this.x) * Phaser.Math.RAD_TO_DEG - 90, 0.1);
    this.setAngle(lerpedAngle);

    if (this.x < 0 - this.width / 2) {
      this.x = this.scene.cameras.main.width;
    }
    else if (this.x > this.scene.cameras.main.width + this.width / 2) {
      this.x = 0;
    }
  }
}


