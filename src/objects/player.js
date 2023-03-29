export default class Player {
    constructor({ scene, spriteStr, x, y, camaraCenter = true }) {
        this.scene = scene;
        this.scene.player = this.scene.physics.add.sprite(x, y, spriteStr);
        this.player = this.scene.player;

        this.scene.u = this.scene.u ? this.scene.u : {};
        this.scene.u.player = this;

        if (camaraCenter) {
            this.scene.cameras.main.startFollow(this.scene.player);
        }

        this.animations();
        
        return this;
    }

    animations() {
        this.scene.anims.create({
            key: "left",
            frames: this.scene.anims.generateFrameNumbers("gladiator-left", { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "turn",
            frames: [{ key: "gladiator", frame: 0 }],
            frameRate: 20,
        });

        this.scene.anims.create({
            key: "up",
            frames: this.scene.anims.generateFrameNumbers("gladiator", { start: 24, end: 26 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "down",
            frames: this.scene.anims.generateFrameNumbers("gladiator", { start: 24, end: 26 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "right",
            frames: this.scene.anims.generateFrameNumbers("gladiator", { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1,
        });
    }

    update(){
        if (this.scene.cursors.left.isDown) {
            this.scene.player.setVelocityX(-160);
            this.scene.player.anims.play('left', true);
          }
          else if (this.scene.cursors.right.isDown) {
            this.scene.player.setVelocityX(160);
            this.scene.player.anims.play('right', true);
          }
          else if (this.scene.cursors.up.isDown) {
            this.scene.player.setVelocityY(-160);
            this.scene.player.anims.play('up', true);
          }
          else if (this.scene.cursors.down.isDown) {
            this.scene.player.setVelocityY(160);
            this.scene.player.anims.play('down', true);
          }
          else {
            this.scene.player.setVelocityX(0);
            this.scene.player.setVelocityY(0);
            this.scene.player.anims.play('turn');
          }
    }
}
