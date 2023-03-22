import Phaser from 'phaser';
import map from './assets/tilemaps/home.json';
import tilesetPNG from './assets/tilesets/village-48.png';
import gladiator from './assets/sprites/gladiator/gladiator.png';
import gladiatorLeft from './assets/sprites/gladiator/gladiator-left.png';

export default class PlayScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 0 },
          debug: true
        }
      }
    });
  }


  preload () {
    console.log(map);
    this.load.image('tiles', tilesetPNG);
    this.load.tilemapTiledJSON('map', map);
    this.load.spritesheet('gladiator', gladiator, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('gladiator-left', gladiatorLeft, { frameWidth: 32, frameHeight: 32 });
    
  }

  create () { 
    
    

    // set background color
    this.cameras.main.setBackgroundColor('#ccccff'); 

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('village48', 'tiles', 48, 48);
    const ground = map.createLayer('ground', tileset, 0, 0);
    const roads = map.createLayer('roads', tileset, 0, 0);
    const walls = map.createLayer('walls', tileset, 0, 0);
    const houses = map.createLayer('trees and rocks', tileset, 0, 0);

      houses.setCollision([399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451], true);

    walls.setCollisionByProperty({ collides: true });


    // create player
    this.player = this.physics.add.sprite(2000, 450, 'gladiator');
    this.player.setScale(1.5);
    //attach player to camera
    this.cameras.main.startFollow(this.player);

    // set collision
    this.physics.add.collider(this.player, [walls, houses]);
    



    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('gladiator-left', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'gladiator', frame: 0 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('gladiator', { start: 24, end: 26 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('gladiator', { start: 24, end: 26 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('gladiator', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });


    

    console.log(map);


    // craete curser
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update () {

    
    // move player with curesr in rpg map
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('down', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('turn');
    }





  }
}
