import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
  background: Phaser.GameObjects.Image;
  playButton: Phaser.GameObjects.Image;
  playButtonText: Phaser.GameObjects.Text;
  constructor()
  {
    super('MainMenu');
  }
  create()
  {
    // Purple background
    this.background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'purple-bg',
    );
    this.background
      .setScale(
        Math.max(
          this.cameras.main.width / this.background.width,
          this.cameras.main.height / this.background.height,
        ),
      )
      .setScrollFactor(0);
    // Play button
    this.playButton = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 200,
      'blue-button',
    )
      .setScale(5)
      .setInteractive();

    // Add event listeners
    this.playButton.on('pointerdown', () =>
    {
      this.scene.start('Game');
    });
    this.playButton.on('pointerover', () =>
    {
      this.playButton.setTint(0x800080);
      this.playButtonText.setColor("#ffffff");
    });
    this.playButton.on('pointerout', () =>
    {
      this.playButton.setTint(0xffffff);
      this.playButtonText.setColor("#000000");
    });

    this.playButtonText = this.add.text(
      this.playButton.x - 150,
      this.playButton.y - 65,
      'Play',
      {
        fontSize: '128px',
        color: 'purple',
      },
    );
    // Title
    this.add.text(
      this.cameras.main.width / 2 - 475,
      this.cameras.main.height / 2 - 200,
      'Space Shooter',
      {
        fontSize: '128px',
        color: '#000000',
      },
    );
    EventBus.emit('current-scene-ready', this);
  }
}
