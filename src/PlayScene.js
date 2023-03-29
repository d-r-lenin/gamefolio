import Phaser from 'phaser';

import Player from './objects/player';

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
					gravity: { y: 0 }
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
        new Player({ scene: this, spriteStr: 'gladiator', x: 3500, y: 2000 });

        this.player.setScale(1.5);

        // add collition by property
        hitLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, hitLayer);

        // craete curser
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.u.player.update();

    }
}
