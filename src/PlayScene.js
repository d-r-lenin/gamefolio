import Phaser from 'phaser';
import map from './assets/tilemaps/home.json';
import tilesetPNG from './assets/tilesets/village-48.png';
import streetTiles from './assets/tilesets/street.png';
import woodTiles from './assets/tilesets/WoodTiles.png';
import gladiator from './assets/sprites/gladiator/gladiator.png';
import gladiatorLeft from './assets/sprites/gladiator/gladiator-left.png';

export default class PlayScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 0 },
          // debug: true
        }
      }
    });
  }


  preload () {
    console.log(map);
    this.load.image('tiles', tilesetPNG);
    this.load.image('street', streetTiles);
    this.load.image('woodTiles', woodTiles);
    this.load.tilemapTiledJSON('map', map);
    this.load.spritesheet('gladiator', gladiator, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('gladiator-left', gladiatorLeft, { frameWidth: 32, frameHeight: 32 });
    
  }

  create () { 
    
    

    // set background color
    this.cameras.main.setBackgroundColor('#ccccff'); 

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('village48', 'tiles', 48, 48);
    const tilesetStreet = map.addTilesetImage('woodTiles', 'woodTiles', 48, 48);

    // backgroung layer contains tile from both tilesets
    const backgroundLayer = map.createStaticLayer('background', [tileset, tilesetStreet], 0, 0);
    const hitLayer = map.createStaticLayer('hit', [tileset, tilesetStreet], 0, 0);
    const overHeadLayer = map.createStaticLayer('overhead', [tileset, tilesetStreet], 0, 0);
    const thrughLayer = map.createStaticLayer('thrugh', [tileset, tilesetStreet], 0, 0);

    overHeadLayer.setDepth(10);


    // create player
    this.player = this.physics.add.sprite(4500, 2000, 'gladiator');
    this.player.setScale(1.5);
    //attach player to camera
    this.cameras.main.startFollow(this.player);

    // add collition by property
    hitLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, hitLayer);



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
