export class Meteor extends Phaser.Physics.Arcade.Sprite
{
  velocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y, 'brown-meteor');
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  create()
  {
    this.velocity.x = Math.random() * 100 - 50;
    this.velocity.y = Math.random() * 100 + 50;
  }

  update ()
  {
    if (this.y > this.scene.cameras.main.height + this.height / 2) {
      this.y = 0 - this.height / 2;
      this.x = Phaser.Math.Between(0, this.scene.cameras.main.width);
    }

    this.setVelocity(this.velocity.x, this.velocity.y);
  }
}