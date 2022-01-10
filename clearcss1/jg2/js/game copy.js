export default class gameScene extends Phaser.Scene {
    
    constructor(){
        super('gameScene')
        this.ground;
        this.platforms;
        this.wplatform;
        this.player;
        this.cursor;
        this.lava;
    
    }
    preload(){
        this.load.image('sky', '../../assets/sky.png');
        this.load.image('ground', '../../assets/ground.png');
        this.load.image('platform', '../../assets/platform.png');
        this.load.image('wplatform', '../../assets/wplatform.png');
        this.load.image('gem', '../../assets/gem.png');
        this.load.image('lava', '../../assets/lava.png');
        this.load.spritesheet('player', '../../assets/player/player.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('rest', 'assets/rest1.png');

    }

     
    create(){
        

        this.add.image(400, 300, 'sky');
        this.ground = this.physics.add.staticGroup();
        this.ground.create(400, 1, 'ground');

        this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height - 540, 'gem');
        this.treasure.setScale(1);
        
        this.lava1 = this.add.sprite(this.sys.game.config.width - 740, this.sys.game.config.height - 20, 'lava');
        this.lava1.setScale(20);
        this.lava2 = this.add.sprite(this.sys.game.config.width - 340, this.sys.game.config.height - 20, 'lava');
        this.lava2.setScale(20);
        this.lava3 = this.add.sprite(this.sys.game.config.width - 120, this.sys.game.config.height - 400, 'lava');
        this.lava3.setScale(5);
        

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(220, 380, 'platform');
        this.platforms.create(260, 380, 'platform');
        this.platforms.create(280, 230, 'platform');
        this.platforms.create(280, 190, 'platform');
        this.platforms.create(280, 150, 'platform');
        this.platforms.create(280, 110, 'platform');
        this.platforms.create(380, 110, 'platform');
        this.platforms.create(480, 110, 'platform');
        this.platforms.create(720, 110, 'platform');

        this.platforms.create(300, 380, 'platform');
        this.platforms.create(440, 380, 'platform');
        this.platforms.create(480, 380, 'platform');
        this.platforms.create(600, 380, 'platform');
        this.platforms.create(680, 380, 'platform');
        this.platforms.create(780, 420, 'platform');
        this.platforms.create(700, 520, 'platform');
        this.platforms.create(100, 570, 'platform');
        this.platforms.create(100, 530, 'platform');
        this.platforms.create(270, 570, 'platform');
        this.platforms.create(270, 530, 'platform');
        this.platforms.create(270, 440, 'platform');
        this.platforms.create(100, 440, 'platform');
        this.platforms.create(470, 570, 'platform');
        this.platforms.create(470, 570, 'platform');
        this.platforms.create(470, 530, 'platform');
        this.platforms.create(470, 450, 'platform');
        this.platforms.create(180, 270, 'platform');
        this.platforms.create(180, 180, 'platform');
        this.platforms.create(180, 100, 'platform');
        this.platforms.create(280, 270, 'platform');
        this.platforms.create(600, 180, 'platform');
        this.platforms.create(600, 220, 'platform');
        this.platforms.create(640, 220, 'platform');
        this.platforms.create(680, 220, 'platform');
        this.platforms.create(720, 220, 'platform');
        this.platforms.create(760, 220, 'platform');
        this.platforms.create(570, 545, 'platform');
        

        this.wplatforms = this.physics.add.staticGroup();
        this.wplatforms.create(100, 216, 'wplatform');
        this.wplatforms.create(800, 200, 'wplatform');
        this.wplatforms.create(800, 400, 'wplatform');
        this.wplatforms.create(0, 200, 'wplatform');
        this.wplatforms.create(0, 400, 'wplatform');

        this.player = this.physics.add.sprite(50, 60, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        var text ="text";

        this.cursor = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.wplatforms);
        this.physics.add.collider(this.player, this.ground);
        
        
        
        
        this.cameras.main.fadeFrom(2000, Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255));


        this.cameras.main.on('camerafadeoutcomplete', function () {

            this.scene.restart();

        }, this);

        //  Every time you click, fade the camera

        this.input.once('pointerdown', function () {

            //  Get a random color
            var blue = Phaser.Math.Between(10, 5);

            this.cameras.main.fade(2000, blue);

        }, this);
        
    }

    update(){
        if(this.cursor.left.isDown){
            this.player.setVelocityX(-120)
        } else if (this.cursor.right.isDown){
            this.player.setVelocityX(120)
        } else{
            this.player.setVelocityX(0)
        }

        if(this.cursor.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-256)
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            document.getElementById("win").innerHTML = "YOU WON!!!";
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.lava1.getBounds())) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.lava2.getBounds())) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.lava3.getBounds())) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            
            this.add.image(100, 100, 'rest1').setScale(1);
        }
        
       

    }
}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{y: 300},
            debug: true,
        }
    },
    scene: [gameScene]
}

new Phaser.Game(config)

