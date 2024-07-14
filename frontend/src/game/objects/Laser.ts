export class Laser extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y, 'laser-blue');
    scene.add.existing(this);
  }

  create ()
  {
    this.scene.time.addEvent({
      delay: 1500,
      callback: () =>
      {
        this.destroy();
      },
      loop: false,
    });
  }

  update ()
  {
    if (this.x < 0 - this.width / 2) {
      this.x = this.scene.cameras.main.width;
    } else if (this.x > this.scene.cameras.main.width + this.width / 2) {
      this.x = 0;
    }
    if (this.y < 0 - this.height / 2) {
      this.y = this.scene.cameras.main.height;
    }
    else if (this.y > this.scene.cameras.main.height + this.height / 2) {
      this.y = 0;
    }
  }
}