export class Laser extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y, 'laser-blue');
    scene.add.existing(this);
  }

  update ()
  {
    if (this.x < 0 - this.width / 2) {
      this.x = this.scene.cameras.main.width;
    } else if (this.x > this.scene.cameras.main.width + this.width / 2) {
      this.x = 0;
    }
  }
}