import { Laser } from '../objects/Laser';

export class Player extends Phaser.Physics.Arcade.Sprite
{
  //Keys
  keyW: Phaser.Input.Keyboard.Key;
  keyA: Phaser.Input.Keyboard.Key;
  keyS: Phaser.Input.Keyboard.Key;
  keyD: Phaser.Input.Keyboard.Key;
  keySpace: Phaser.Input.Keyboard.Key;
  //Movement
  velocity: number = 0;
  adjustedAngle: number = this.angle - 90;
  acceleration: number = 0.25;
  deceleration: number = 0.15;
  rotationSpeed: number = 0.35;
  canShoot: boolean = true;
  reloadTime: number = 200;


  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y, 'player_red');
    scene.add.existing(this);
  }

  create()
  {
    
  }

  movement(deltaTime: number)
  {
    this.adjustedAngle = this.angle - 90;
    //Movement
    if (this.keyW.isDown) {
      this.velocity += (this.acceleration / 100) * deltaTime;
    } else if (this.keyS.isDown) {
      this.velocity -= (this.deceleration / 100) * deltaTime;
    }
    //Lerp the velocity to 0
    this.velocity = lerp(this.velocity, 0, 0.001 * deltaTime);
    //Clamp values between 0 and 1
    this.velocity = Phaser.Math.Clamp(this.velocity, 0, 1);
    //Clamp/Wrap the player position
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > this.scene.cameras.main.height) {
      this.y = this.scene.cameras.main.height;
    }
    if (this.x < 0 - this.width / 2) {
      this.x = this.scene.cameras.main.width;
    } else if (this.x > this.scene.cameras.main.width + this.width / 2) {
      this.x = 0;
    }

    // Rotation
    if (this.keyA.isDown) {
      this.setAngle(this.angle - this.rotationSpeed * deltaTime);
    }
    else if (this.keyD.isDown) {
      this.setAngle(this.angle + this.rotationSpeed * deltaTime);
    }
    //Move in the forward direction at velocity
    this.setPosition(
    this.x + Math.cos(-this.adjustedAngle * Phaser.Math.DEG_TO_RAD) * this.velocity * deltaTime,
    this.y - Math.sin(-this.adjustedAngle * Phaser.Math.DEG_TO_RAD) * this.velocity * deltaTime
    );

    //Shoot
    if (this.keySpace.isDown && this.canShoot) {
      this.shoot();
      
    }
  }

  shoot ()
  {
    const directionX = Math.cos(-this.adjustedAngle * Phaser.Math.DEG_TO_RAD);
    const directionY = -Math.sin(-this.adjustedAngle * Phaser.Math.DEG_TO_RAD);
    //Create a new laser
    const laser = new Laser(this.scene, this.x + directionX * 75, this.y + directionY * 75);
    this.scene.physics.add.existing(laser);
    //Set the angle of the laser to the player
    laser.setAngle(this.angle);
    laser.setScale(1);
    //Set the velocity of the laser
    laser.setVelocityX(directionX * (this.velocity + 1000));
    laser.setVelocityY(directionY * (this.velocity + 1000));
    this.canShoot = false;
    this.scene.time.addEvent({
      delay: this.reloadTime,
      callback: () => {
        this.canShoot = true;
      },
      callbackScope: this,
    });

    return laser;
  }
}

function lerp(start: number, end: number, t: number): number {
  return start + t * (end - start);
}