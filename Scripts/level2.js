class level2 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("tile", "/Assets/Images/lvl2-tiles/tile.png");
        this.load.image("tfloat", "/Assets/Images/lvl2-tiles/tfloat.png");
        this.load.image("Xbutton-out", "/Assets/Images/lvl2-tiles/Xbutton-out.png");
        this.load.image("Xbutton-in", "/Assets/Images/lvl2-tiles/Xbutton-in.png");
        this.load.image("doors1", "/Assets/Images/lvl2-tiles/doors1.png");
        this.load.image("doors2", "/Assets/Images/lvl2-tiles/doors2.png");
        this.load.image("base", "/Assets/Images/lvl2-tiles/base.png");
        this.load.image("elevator-tile", "/Assets/Images/lvl2-tiles/elevator-tile.png");
        this.load.spritesheet("test", "/Assets/Images/lvl2-tiles/test.png", { 
            frameWidth: 40,
            frameHeight: 40,
        });
        this.load.spritesheet("test2", "/Assets/Images/lvl2-tiles/test2.png", { 
            frameWidth: 40,
            frameHeight: 40,
        });
    }

    create() {
        this.background = this.add.image(0, 0, "base");
        this.background.setOrigin(0, 0).setScale(3);
        this.platforms = this.physics.add.staticGroup();

        // Tile set for the ground 
        for (let i = 0; i < 22; i++) {
            let ground = this.platforms.create(29 + i * 70, 680, "tile");
            ground.setScale(2).refreshBody();
        }

        // Tile set for right wall 
        for (let i = 0; i < 22; i++) {
            let ground = this.platforms.create(19, 635 - i * 30, "tile");
            ground.setScale().refreshBody();
        }

        // Tile set for left wall 
        for (let i = 0; i < 22; i++) {
            let ground = this.platforms.create(1500, 635 - i * 30, "tile");
            ground.setScale().refreshBody();
        }

        // Tile set for roof wall 
        for (let i = 0; i < 50; i++) {
            let ground = this.platforms.create(20 + i * 30, 0, "tile");
            ground.setScale().refreshBody();
        }

        // Tile set top left start 
        for (let i = 0; i < 10; i++) {
            let tfloat = this.platforms.create(20 + i * 30, 150, "tfloat");
            tfloat.setScale().refreshBody();
        }

        // Tile set under 
        for (let i = 0; i < 5; i++) {
            let tfloat = this.platforms.create(20 + i * 30, 300, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 3; i++) {
            let tfloat = this.platforms.create(250 + i * 30, 518, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 8; i++) {
            let tfloat = this.platforms.create(20 + i * 30, 550, "tfloat");
            tfloat.setScale().refreshBody();
        }

        // Door 1
        for (let i = 0; i < 5; i++) {
            let tfloat = this.platforms.create(500 + i * 30, 400, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 3; i++) {
            let tfloat = this.platforms.create(340 + i * 30, 550, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 3; i++) {
            let tfloat = this.platforms.create(600 + i * 30, 200, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 3; i++) {
            let tfloat = this.platforms.create(900 + i * 30, 300, "tfloat");
            tfloat.setScale().refreshBody();
        }

        // Elevator
        this.elevatorTiles = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        for (let i = 0; i < 5; i++) {
            let tfloat = this.elevatorTiles.create(1100 + i * 30, 600, "elevator-tile");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 5; i++) {
            let tfloat = this.platforms.create(1280 + i * 30, 150, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 3; i++) {
            let tfloat = this.platforms.create(1390 + i * 30, 500, "tfloat");
            tfloat.setScale().refreshBody();
        }

        // Create button and size 
        this.button = this.physics.add.staticSprite(1450, 480, "Xbutton-out").setScale(0.11);

        // Create door1 
        this.add.image(1350, 80, "doors1").setScale(0.5);

        // Create door2 
        this.add.image(570, 330, "doors2").setScale(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();
        //creat player 1
        this.player1 = this.physics.add.sprite(100, 50, "test").setScale(2);
        this.player1.setCollideWorldBounds(true);
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player1, this.elevatorTiles);

        // Overlap event
        this.physics.add.overlap(this.player1, this.button, this.moveElevator, null, this);

        this.player1.play("test", true);
        //player 2
        this.keyboard = this.input.keyboard.addKeys({ 
            'w': Phaser.Input.Keyboard.KeyCodes.W,
            'a': Phaser.Input.Keyboard.KeyCodes.A,
            's': Phaser.Input.Keyboard.KeyCodes.S,
            'd': Phaser.Input.Keyboard.KeyCodes.D
          });
         this.player2 = this.physics.add.sprite(450, 300, "test2").setScale(2);
          this.player2.setCollideWorldBounds(true);
          this.physics.add.collider(this.player2, this.platforms);
          this.physics.add.collider(this.player2, this.box);




    }

    update() {

        // player1  controles 
        if (this.cursors.left.isDown) {
            this.player1.setVelocityX(-160);
            this.player1.setFlipX( true);
        } else if (this.cursors.right.isDown) {
            this.player1.setVelocityX(160);
            this.player1.setFlipX(false);
        } else {
            this.player1.setVelocityX(0);
            
        }

        if (this.cursors.up.isDown && this.player1.body.touching.down) {
            this.player1.setVelocityY(-300);
        }
        // player 2 controls 
        if (this.keyboard.a.isDown) {
            this.player2.setVelocityX(-160);
            this.player2.setFlipX(true);
          } else if (this.keyboard.d.isDown) {
            this.player2.setVelocityX(160);
            this.player2.setFlipX(false);
          } else {
            this.player2.setVelocityX(0);
          }
      
          if (this.keyboard.w.isDown && this.player2.body.touching.down) {
            this.player2.setVelocityY(-300);
          }




    }

    moveElevator(player, button) {
        const desiredHeight = 330; // Move elevator up by 330 units
        const startY = 530; // Initial Y-coordinate of the elevator
        const stopY = startY - desiredHeight; // Y-coordinate where the elevator should stop
        
        // Check if the elevator has already moved
        if (this.elevatorMoved) {
            return;
        }
    
        // Move elevator tiles up by the desired height
        this.tweens.add({
            targets: this.elevatorTiles.getChildren(),
            y: '-=' + desiredHeight,
            ease: 'Linear',
            duration: 2000, // Duration set to 1000 milliseconds (1 second)
            onStart: () => {
                this.elevatorMoved = true; // Set flag to indicate elevator has moved
            },
            onUpdate: () => {
                this.physics.world.collide(this.player1, this.elevatorTiles);
            },
            onComplete: () => {
                // Stop the elevator at the specified stopY coordinate
                this.elevatorTiles.getChildren().forEach(elevator => {
                    if (elevator.y <= stopY) {
                        elevator.y = stopY;
                        elevator.body.stop();
                        this.elevatorMoved = false; // Reset the elevator moved flag
                    }
                });
            }
        });
    
        // Deactivate button after it has been pressed
        this.physics.world.removeCollider(this.overlapCollider);
    }
}