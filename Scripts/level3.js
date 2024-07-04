class level3 extends Phaser.Scene {
  constructor() {
    super("level3");
  }

  preload() {
    this.load.image("tile", "/Assets/Images/lvl2-tiles/tile.png");
    this.load.image("tfloat", "/Assets/Images/lvl2-tiles/tfloat.png");
    this.load.image("Xbutton-out", "/Assets/Images/lvl2-tiles/Xbutton-out.png");
    this.load.image("Xbutton-in", "/Assets/Images/lvl2-tiles/Xbutton-in.png");
    this.load.image("doors1", "/Assets/Images/lvl2-tiles/doors1.png");
    this.load.image("doors2", "/Assets/Images/lvl2-tiles/doors2.png");
    this.load.image("base", "/Assets/Images/lvl2-tiles/base.png");
    this.load.image(
      "elevator-tile",
      "/Assets/Images/lvl2-tiles/elevator-tile.png"
    );
    this.load.image("test", "/Assets/Images/lvl2-tiles/test.png");
    this.load.image("test2", "/Assets/Images/lvl2-tiles/test2.png");
    this.load.image("crate", "/Assets/Images/lvl2-tiles/Box1.png");
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
    for (let i = 0; i < 4; i++) {
      let ground = this.platforms.create(400, 120 - i * 30, "tile");
      ground.setScale().refreshBody();
    }

    // Tile set for roof wall
    for (let i = 0; i < 50; i++) {
      let ground = this.platforms.create(20 + i * 30, 0, "tile");
      ground.setScale().refreshBody();
    }

    // Tile set top left start
    for (let i = 0; i < 14; i++) {
      let tfloat = this.platforms.create(20 + i * 30, 250, "tfloat");
      tfloat.setScale().refreshBody();
    }

    for (let i = 0; i < 3; i++) {
      let tfloat = this.platforms.create(330 + i * 30, 518, "tfloat");
      tfloat.setScale().refreshBody();
    }

    for (let i = 0; i < 3; i++) {
      let tfloat = this.platforms.create(1050 + i * 30, 518, "tfloat");
      tfloat.setScale().refreshBody();
    }

    for (let i = 0; i < 8; i++) {
      let tfloat = this.platforms.create(700 + i * 30, 500, "tfloat");
      tfloat.setScale().refreshBody();
    }

    for (let i = 0; i < 4; i++) {
      let tfloat = this.platforms.create(750 + i * 30, 380, "tfloat");
      tfloat.setScale().refreshBody();
    }
    for (let i = 0; i < 4; i++) {
      let tfloat = this.platforms.create(750 + i * 30, 250, "tfloat");
      tfloat.setScale().refreshBody();
    }

    // Elevator
    this.elevatorTiles = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    for (let i = 0; i < 5; i++) {
      let tfloat = this.elevatorTiles.create(
        500 + i * 30,
        600,
        "elevator-tile"
      );
      tfloat.setScale().refreshBody();
    }
    //Gate
    this.gateTiles = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    for (let i = 0; i < 9; i++) {
      let tfloat = this.gateTiles.create(1350, 389 + i * 30, "elevator-tile");
      tfloat.setScale().refreshBody();
    }

    //Button Platform
    for (let i = 0; i < 3; i++) {
      let tfloat = this.platforms.create(1390 + i * 30, 400, "tfloat");
      tfloat.setScale().refreshBody();
    }

    // Create button and size
    this.button1 = this.physics.add
      .staticSprite(1450, 380, "Xbutton-out")
      .setScale(0.11)
      .refreshBody();

    //gate button
    this.button2 = this.physics.add
      .staticSprite(300, 230, "Xbutton-out")
      .setScale(0.11)
      .refreshBody();

    // Create door1
    this.add.image(100, 180, "doors1").setScale(0.5);

    // Create door2
    this.add.image(1440, 590, "doors2").setScale(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
    //Crate
    this.crate = this.physics.add.sprite(800, 210, "crate").setScale(1.5);
    this.crate.setCollideWorldBounds(true);
    this.crate.setBounce(0.2);
    this.crate.setDragX(300);
    this.physics.add.collider(this.crate, this.platforms);
    this.physics.add.collider(this.crate, this.gateTiles);
    this.physics.add.collider(this.crate, this.elevatorTiles);
    //creat player 1
    this.player1 = this.physics.add.sprite(100, 610, "test").setScale(2);
    this.player1.setCollideWorldBounds(true);
    this.physics.add.collider(this.player1, this.platforms);
    this.physics.add.collider(this.player1, this.elevatorTiles);
    this.physics.add.collider(this.player1, this.crate);
    this.physics.add.collider(this.player1, this.gateTiles);



    this.player1.play("test", true);
    //player 2
    this.keyboard = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.player2 = this.physics.add.sprite(150, 610, "test2").setScale(2);
    this.player2.setCollideWorldBounds(true);
    this.physics.add.collider(this.player2, this.platforms);
    this.physics.add.collider(this.player2, this.elevatorTiles);
    this.physics.add.collider(this.player2, this.crate);
    this.physics.add.collider(this.player2, this.gateTiles);

    // Overlap event for players
    this.physics.add.overlap(this.player1, this.button1, this.moveElevator, null, this);
    this.physics.add.overlap(this.player2, this.button1, this.moveElevator, null, this);

    this.physics.add.overlap(this.player1, this.button2, this.openGate, null, this);
    this.physics.add.overlap(this.player2, this.button2, this.openGate, null, this);
  }

  update() {
    
    
    // player1  controles
    if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-160);
      this.player1.setFlipX(true);
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

    if((this.player.x <=90 && this.player.y>=96) && (this.player2.x >=1270 && this.player2.y<=126)){
      this.onDoorTouch()
      }
  }
  onDoorTouch() {
    this.showPopup('You Win!');
    this.physics.pause(); // Optional: Pause the game
    // player.setTint(0x00ff00); // Optional: Change player color to green
    // player.anims.play('turn'); // Optional: Stop player animation
    // player2.setTint(0x00ff00); // Optional: Change player color to green
    // player2.anims.play('turn'); // Optional: Stop player animation
}
  openGate(player, button2) {
    // Check if the gate has already opened
    if (this.gateOpened) {
        return;
    }

    // Perform actions to open the gate horizontally here
    const desiredWidth = -200; // Move gate to the right by 200 units
    const stopX = 1550; // X-coordinate where the gate should stop

    // Example of using tweens to move the gate horizontally
    this.tweens.add({
        targets: this.gateTiles.getChildren(),
        x: "+=" + desiredWidth,
        ease: "Linear",
        duration: 1000, // Duration set to 1000 milliseconds (1 second)
        onStart: () => {
            this.gateOpened = true; // Set flag to indicate gate has opened
        },
        onComplete: () => {
            // Additional logic to handle completion of gate opening
            this.gateOpened = false; // Reset the gate opened flag
        }
    });

    // Deactivate button after it has been pressed
    button2.disableBody(true);
}
  moveElevator(player, button1) {
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
      y: "-=" + desiredHeight,
      ease: "Linear",
      duration: 2000, // Duration set to 2000 milliseconds (2 seconds)
      onStart: () => {
        this.elevatorMoved = true; // Set flag to indicate elevator has moved
      },
      onUpdate: () => {
        this.physics.world.collide(this.player1, this.elevatorTiles);
        this.physics.world.collide(this.player2, this.elevatorTiles); // Add collision check for player2
      },
      onComplete: () => {
        // Stop the elevator at the specified stopY coordinate
        this.elevatorTiles.getChildren().forEach((elevator) => {
          if (elevator.y <= stopY) {
            elevator.y = stopY;
            elevator.body.stop();
            this.elevatorMoved = false; // Reset the elevator moved flag
          }
        });
      },
    });

    // Deactivate button after it has been pressed
    this.physics.world.removeCollider(this.overlapCollider);
  }

  onDoorTouch() {
    this.showPopup('You Win!');
    this.physics.pause(); 
}


showPopup(message) {
    const popupContainer = this.add.container(400, 300);
    const background = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8);
    popupContainer.add(background);
    const popupText = this.add.text(0, -30, message, {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 280, useAdvancedWrap: true }
    });
    popupText.setOrigin(0.5);
    popupContainer.add(popupText);

    let button1Text, button2Text, button1Action, button2Action;
    let backToHome = false;

    if (message === 'You Win!') {
      button1Text = 'Continue';
      button2Text = 'Back Home';
      button1Action = () => this.scene.start('nextLevel');
      button2Action = () => this.scene.start('levelSelect');
    } else {
      button1Text = 'Retry';
      button2Text = 'Back Home';
      button1Action = () => this.scene.restart();
      button2Action = () => this.scene.start('levelSelect');
    }

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

    Phaser.Display.Align.In.Center(popupContainer, this.add.zone(window.innerWidth / 2, 300, 800, 600));
    this.add.existing(popupContainer);
  }
}

