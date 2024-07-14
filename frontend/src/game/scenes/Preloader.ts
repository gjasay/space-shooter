import { Scene } from 'phaser';

export class Preloader extends Scene
{
  constructor()
  {
    super('Preloader');
  }

  init()
  {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, 'background');

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) =>
    {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload()
  {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');
    // Backgrounds
    this.load.image('purple-bg', 'Backgrounds/purple.png');
    this.load.image('darkPurple-bg', 'Backgrounds/darkPurple.png');
    this.load.image('black-bg', 'Backgrounds/black.png');
    this.load.image('blue-bg', 'Backgrounds/blue.png');
    // UI - Buttons
    this.load.image('blue-button', 'UI/buttonBlue.png');
    this.load.image('green-button', 'UI/buttonGreen.png');
    this.load.image('red-button', 'UI/buttonRed.png');
    this.load.image('yellow-button', 'UI/buttonYellow.png');
    // Player Ships
    this.load.image('player_blue', 'Player/playerShip1_blue.png');
    this.load.image('player_green', 'Player/playerShip1_green.png');
    this.load.image('player_orange', 'Player/playerShip1_orange.png');
    this.load.image('player_red', 'Player/playerShip1_red.png');
    // Enemies
    this.load.image('enemy-black', 'Enemies/enemyBlack1.png');
    // Lasers
    this.load.image('laser-blue', 'Lasers/laserBlue01.png');
    this.load.image('laser-red', 'Lasers/laserRed01.png');
    // Meteors
    this.load.image('brown-meteor', 'Meteors/meteorBrown_big1.png');
  }

  create()
  {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu');
  }
}
