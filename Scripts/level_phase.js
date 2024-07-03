class Levels extends Phaser.Scene {
    constructor() {
        super("levelSelect");
    }

    preload() {
        this.load.image('homeIcon', 'Assets/Icons/home.png');
        this.load.image('volumeIcon', 'Assets/Icons/volume.png');
        this.load.image('volumeDownIcon', 'Assets/Icons/volume-mute.png');
        this.load.image('background', 'Assets/Images/background.jpg');
        this.load.audio('backgroundMusic', 'Assets/Music/warped vehicles.mp3');
    }

    create() {
        this.background = this.add.image(-10, -100, "background");
        this.background.setOrigin(0, 0).setScale(0.5);

        let backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.25 });
        // backgroundMusic.play();

        const levelsText = this.add.text(580, 20, "Levels", {
            font: "48px",
            fill: "#ffffff"
        });

        const homeIcon = this.add.image(levelsText.x + levelsText.width + 40, levelsText.y + levelsText.height / 2, 'homeIcon')
            .setOrigin(20, 0.5)
            .setInteractive();

        homeIcon.setScale(0.15);

        const volumeIcon = this.add.image(levelsText.x + levelsText.width, levelsText.y + levelsText.height / 2, 'volumeIcon')
            .setOrigin(-10.5, 0.5)
            .setInteractive();

        volumeIcon.setScale(0.2);

        const volumeDownIcon = this.add.image(levelsText.x + levelsText.width, levelsText.y + levelsText.height / 2, 'volumeDownIcon')
            .setOrigin(-15, 0.5)
            .setInteractive();

        volumeDownIcon.setScale(0.14);
        volumeDownIcon.visible = false;

        homeIcon.on('pointerdown', () => {
            console.log('Home icon clicked');
        });

        const levels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"];
        const levelSpacingX = 320;
        const levelSpacingY = 150;
        const levelsPerRow = 3;
        const startX = this.cameras.main.width / 2 - (levelsPerRow - 1) * levelSpacingX / 2;
        const startY = this.cameras.main.height / 2 - (Math.ceil(levels.length / levelsPerRow) - 1) * levelSpacingY / 2;

        levels.forEach((level, index) => {
            let row = Math.floor(index / levelsPerRow);
            let col = index % levelsPerRow;
            let x = startX + col * levelSpacingX;
            let y = startY + row * levelSpacingY;

            // Create background rectangle
            let backgroundRect = this.add.rectangle(x, y, 240, 100, 0x333333, 0.8)
                .setOrigin(0.5)
                .setInteractive();

            // Create text
            let levelText = this.add.text(x, y, level, {
                fontSize: "40px",
                fill: "#ffffff"
            })
                .setOrigin(0.5)
                .setInteractive();

            // Ensure text appears above the background
            levelText.depth = 1;

            levelText.on('pointerdown', () => {
                this.cameras.main.fadeOut(500, 0, 0, 0);

                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.transition({
                        target: 'level',
                        duration: 50,
                        moveBelow: true,
                        onUpdate: this.transitionOut,
                        data: { levelName: level }
                    });

                    this.cameras.main.fadeIn(2000, 0, 0, 0);
                });
            });

            // Add hover effect to text
            levelText.on('pointerover', () => {
                levelText.setStyle({ fill: '#FFD700' });
            });

            levelText.on('pointerout', () => {
                levelText.setStyle({ fill: '#ffffff' });
            });

            // Forward events to the background rectangle for better interaction
            levelText.on('pointerover', () => {
                backgroundRect.setFillStyle(0x555555, 0.8);
            });

            levelText.on('pointerout', () => {
                backgroundRect.setFillStyle(0x333333, 0.8);
            });
        });

        volumeIcon.setInteractive();
        volumeIcon.on('pointerdown', function () {
            // Toggle visibility of icons
            volumeIcon.visible = false;
            volumeDownIcon.visible = true;
        });

        volumeDownIcon.setInteractive();
        volumeDownIcon.on('pointerdown', function () {
            // Toggle visibility of icons
            volumeIcon.visible = true;
            volumeDownIcon.visible = false;
        });

        volumeIcon.on('pointerdown', toggleMute, this);
        volumeDownIcon.on('pointerdown', toggleMute, this);

        function toggleMute() {
            if (backgroundMusic.isPlaying) {
                backgroundMusic.stop();
            } else {
                backgroundMusic.play();
            }
        }
    }
}
