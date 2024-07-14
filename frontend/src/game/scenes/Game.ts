import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';

export class Game extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  player: Player;
  enemy: Enemy;

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
    this.enemy = new Enemy(this, 100, 100);
    this.physics.add.existing(this.player);
    this.physics.add.existing(this.enemy);
    //Keys
    if (!this.input.keyboard) return;
    this.player.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.player.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.player.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.player.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.player.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //Collisions
    this.physics.add.collider(this.player, this.enemy, () => {
      this.enemy.setAlpha(0);
    });
    EventBus.emit('current-scene-ready', this);
  }

  update(_time: number, delta: number) 
  {
    if (this.enemy) this.enemy.update();
    this.player.movement(delta);
  }

  changeScene()
  {
    this.scene.start('GameOver');
  }
}
