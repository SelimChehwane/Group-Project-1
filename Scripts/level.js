class LevelOne extends Phaser.Scene {
    constructor() {
        super("level");
    }

    preload() {
        this.load.image("tile", "/Assets/Images/tile.png");
        this.load.image("tfloat", "/Assets/Images/tfloat.png");
        this.load.image("Xbutton-out", "/Assets/Images/Xbutton-out.png");
        this.load.image("Xbutton-in", "/Assets/Images/Xbutton-in.png");
        this.load.image("doors1", "/Assets/Images/doors1.png");
        this.load.image("doors2", "/Assets/Images/doors2.png");
        this.load.image("base", "/Assets/Images/base.png");
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

        for (let i = 0; i < 5; i++) {
            let tfloat = this.platforms.create(430 + i * 30, 220, "tfloat");
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
        this.add.image(80, 80, "doors2").setScale(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(1000, 400, "test").setScale(2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.elevatorTiles);

        
        // Overlap event
        this.physics.add.overlap(this.player, this.door, this.onDoorTouch, null, this);
        this.player.play("test", true);
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
    }

    onDoorTouch(player, door) {
        this.showPopup('You Win!'); // Show a winning popup message
    }

    showPopup(message) {
        // Create a container for the popup
        const popupContainer = this.add.container(400, 300);

        // Add a background rectangle
        const background = this.add.rectangle(0, 0, 300, 150, 0x000000, 0.8);
        popupContainer.add(background);

        // Add text for the message
        const popupText = this.add.text(0, 0, message, {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 280, useAdvancedWrap: true }
        });
        popupText.setOrigin(0.5);
        popupContainer.add(popupText);

        // Make the container interactive (close popup on click)
        popupContainer.setInteractive().on('pointerdown', () => {
            popupContainer.destroy(); // Remove the popup when clicked
        });

        // Center the container on the screen
        Phaser.Display.Align.In.Center(popupContainer, this.add.zone(400, 300, 800, 600));

        // Add the popup container to the scene
        this.add.existing(popupContainer);
    
    }
}