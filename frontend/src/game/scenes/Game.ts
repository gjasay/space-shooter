import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';
import { Meteor } from '../objects/Meteor';

export class Game extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  player: Player;
  enemies: Phaser.Physics.Arcade.Group;
  enemiesToSpawn: number = 1;
  meteors: Phaser.Physics.Arcade.Group;
  lasers: Phaser.Physics.Arcade.Group;
  score: number = 0;

  constructor()
  {
    super('Game');
  }

  create()
  {
    this.camera = this.cameras.main;
    this.background = this.add.image(this.camera.width / 2, this.camera.height / 2, 'darkPurple-bg');
    this.background.setScale(Math.max(this.camera.width / this.background.width, this.camera.height / this.background.height)).setScrollFactor(0);
    this.player = new Player(this, 100, this.camera.height - 75);
    this.physics.add.existing(this.player);
    this.meteors = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(0, this.camera.width);
      const y = Phaser.Math.Between(0, this.camera.height);
      this.meteors.add(new Meteor(this, x, y));
    }
    //@ts-expect-error Meteor extends Phaser.Physics.Arcade.Sprite which is a typeof Phaser.GameObjects.GameObject
    this.meteors.getChildren().forEach((meteor: Meteor) =>
    {
      meteor.create();
    });
    this.enemies = this.physics.add.group();
    this.lasers = this.physics.add.group();

    this.time.addEvent({
      delay: 5000,
      callback: () =>
      {
        for (let i = 0; i < this.enemiesToSpawn; i++) {
          const x = Phaser.Math.Between(0, this.camera.width);
          const y = Phaser.Math.Between(0, this.camera.height);
          this.enemies.add(new Enemy(this, x, y));
          this.addEnemyCollision();
        }
      },
      loop: true,
    });

    this.time.addEvent({
      delay: 10000,
      callback: () =>
      {
        this.enemiesToSpawn++;
      },
      loop: true,
    });



    //Keys
    if (!this.input.keyboard) return;
    this.player.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.player.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.player.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.player.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.player.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    EventBus.emit('current-scene-ready', this);
  }

  update(_time: number, delta: number) 
  {
    this.enemies.getChildren().forEach((enemy: Phaser.GameObjects.GameObject) =>
    {
      enemy.update();
    });
    this.meteors.getChildren().forEach((meteor: Phaser.GameObjects.GameObject) =>
    {
      meteor.update();
    });
    this.lasers.getChildren().forEach((laser: Phaser.GameObjects.GameObject) =>
    {
      laser.update();
    });
    this.player.movement(delta);

    this.addEnemyCollision();
  }

  changeScene()
  {
    this.scene.start('GameOver');
  }

  addEnemyCollision()
  {
    this.enemies.getChildren().forEach((enemy: Phaser.GameObjects.GameObject) =>
    {
      this.physics.add.collider(this.player, enemy, () =>
      {
        enemy.destroy();
        this.player.updateHealth(-10);
      });
      this.lasers.getChildren().forEach((laser: Phaser.GameObjects.GameObject) =>
      {
        this.physics.add.collider(laser, enemy, () =>
        {
          enemy.destroy();
          laser.destroy();
          this.score += 100;
        });
      });
    });
  };
}
