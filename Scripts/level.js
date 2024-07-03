class LevelOne extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image("tile", "/Assets/Images/tile.png");
        this.load.image("tfloat", "/Assets/Images/tfloat.png");
        this.load.image("Xbutton-out", "/Assets/Images/Xbutton-out.png");
        this.load.image("Xbutton-in", "/Assets/Images/Xbutton-in.png");
        this.load.image("doors1", "/Assets/Images/doors1.png");
        this.load.image("doors2", "/Assets/Images/doors2.png");
        this.load.image("base", "/Assets/Images/base.png");
        this.load.image("test2", "/Assets/Images/test2.png");
        this.load.image("elevator-tile", "/Assets/Images/elevator-tile.png");
        this.load.image("spike", "/Assets/Images/spike.png");
        this.load.spritesheet("test", "/Assets/Images/test.png", { 
            frameWidth: 40,
            frameHeight: 40,
        });
    }

    create() {
        this.background = this.add.image(0, 0, "base");
        this.background.setOrigin(0, 0).setScale(3);
        this.platforms = this.physics.add.staticGroup();

        // Tile set for the ground 
        for (let i = 0; i < 44; i++) {
            let ground = this.platforms.create(29 + i * 30, 620, "tile");
            ground.setScale(1).refreshBody();
        }

        // Tile set for right wall 
        for (let i = 0; i < 22; i++) {
            let ground = this.platforms.create(19, 635 - i * 30, "tile");
            ground.setScale().refreshBody();
        }

        // Tile set for left wall 
        for (let i = 0; i < 22; i++) {
            let ground = this.platforms.create(1350, 635 - i * 30, "tile");
            ground.setScale(1).refreshBody();
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
        for (let i = 0; i < 10; i++) {
            let tfloat = this.platforms.create(1050 + i * 30, 180, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 5; i++) {
            let tfloat = this.platforms.create(430 + i * 30, 220, "tfloat");
            tfloat.setScale().refreshBody();
        }
        for (let i = 0; i < 5; i++) {
            let tfloat = this.platforms.create(630 + i * 30, 350, "tfloat");
            tfloat.setScale().refreshBody();
        }
        for (let i = 0; i < 5; i++) {
            let tfloat = this.platforms.create(830 + i * 30, 250, "tfloat");
            tfloat.setScale().refreshBody();
        }

        // Tile set under 
        for (let i = 0; i < 10; i++) {
            let tfloat = this.platforms.create(20 + i * 30, 330, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 10; i++) {
            let tfloat = this.platforms.create(20 + i * 30, 550, "tfloat");
            tfloat.setScale().refreshBody();
        }

        for (let i = 0; i < 5; i++) {
            let tfloat = this.platforms.create(420 + i * 30, 460, "tfloat");
            tfloat.setScale().refreshBody();
        }

        // Elevator
        this.elevatorTiles = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        // Create button and size 
        this.button = this.physics.add.staticSprite(500, 180, "spike").setScale(0.1);
        

        // Create door1
        this.add.image(80, 80, "doors1").setScale(0.5);
        this.add.image(1280, 110, "doors2").setScale(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(1000, 400, "test").setScale(2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.elevatorTiles);

        this.WASD = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        
         this.player2 = this.physics.add.sprite(900, 300, "test2").setScale(2);
          this.player2.setCollideWorldBounds(true);
          this.physics.add.collider(this.player2, this.platforms);
          this.physics.add.collider(this.player2, this.box);

          const controlMessage = this.add.text(250, 580, 'Control Player 1 with: W A D keys\nControl Player 2 with: Arrow keys', {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#000000'
        }).setOrigin(0.5);

        // Remove the control message after 5 seconds
        this.time.delayedCall(3500, () => {
            controlMessage.destroy();
        }, [], this);
        // Overlap events
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-310);
        }

        if (this.WASD.left.isDown) {
            this.player2.setVelocityX(-160);
            this.player2.anims.play("left", true);
        } else if (this.WASD.right.isDown) {
            this.player2.setVelocityX(160);
            this.player2.anims.play("right", true);
        } else {
            this.player2.setVelocityX(0);
            this.player2.anims.play("turn");
        }
    
        if (this.WASD.up.isDown && this.player2.body.touching.down) {
            this.player2.setVelocityY(-310);
        }


        if((this.player.x >=494 && this.player.x<=505) && (this.player.y<=166 && this.player.y>=155)){
        this.onButtonTouch(this.player , this.button)
        }
        if((this.player2.x >=494 && this.player2.x<=505) && (this.player2.y<=166&& this.player2.y>=155)){
        this.onButtonTouch(this.player2 , this.button)
        }

        if((this.player.x <=90 && this.player.y>=96) && (this.player2.x >=1270 && this.player2.y<=126)){
        this.onDoorTouch()
        }


        
    }

    onButtonTouch(player, button) {
        this.showPopup('Game Over');
        this.physics.pause(); // Pause the game
        player.setTint(0xff0000); // Change player color to red
        player.anims.play('turn'); // Stop player animation
    }

    onDoorTouch() {
        this.showPopup('You Win!');
        this.physics.pause(); // Optional: Pause the game
        // player.setTint(0x00ff00); // Optional: Change player color to green
        // player.anims.play('turn'); // Optional: Stop player animation
        // player2.setTint(0x00ff00); // Optional: Change player color to green
        // player2.anims.play('turn'); // Optional: Stop player animation
    }

    showPopup(message) {
        // Create a container for the popup
        const popupContainer = this.add.container(400, 300);

        // Add a background rectangle
        const background = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8);
        popupContainer.add(background);

        // Add text for the message
        const popupText = this.add.text(0, -30, message, {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280, useAdvancedWrap: true }
        });
        popupText.setOrigin(0.5);
        popupContainer.add(popupText);

        // Add buttons based on the message
        let button1Text, button2Text, button1Action, button2Action;
        let backToHome =false;

        if (message === 'You Win!') {
            button1Text = 'Continue';
            button2Text = 'Back Home';
            button1Action = () => this.scene.start('level2')
            button2Action = () => this.scene.start('levelSelect');
        } else {
            button1Text = 'Retry';
            button2Text = 'Back Home';
            button1Action = () => this.scene.restart();
            button2Action = () => this.scene.start('levelSelect');
        }

        // Create buttons
        const button1 = this.add.text(-100, 50, button1Text, {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#ff0000',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive().on('pointerdown', () => {
            button1Action();
            popupContainer.destroy();
        });
        button1.setOrigin(0.5);
        popupContainer.add(button1);

        const button2 = this.add.text(100, 50, button2Text, {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive().on('pointerdown', () => {        
            button2Action();
            popupContainer.destroy();
        });
        button2.setOrigin(0.5);
        popupContainer.add(button2);

        // Center the container on the screen
        Phaser.Display.Align.In.Center(popupContainer, this.add.zone(window.innerWidth/2, 300, 800, 600));

        // Add the popup container to the scene
        this.add.existing(popupContainer);
    }
    }
