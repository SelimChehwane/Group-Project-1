class Levels extends Phaser.Scene {
    constructor() {
        super("levelSelect");
    }

    preload() {
        this.load.image('homeIcon', 'Assets/Icons/home.png'); 
    }

    create() {
        // Position and add the "Levels" text
        const levelsText = this.add.text(610, 50, "Levels", { 
            font: "48px gameFont", 
            fill: "#ffffff"
        });

        const homeIcon = this.add.image(levelsText.x + levelsText.width + 40, levelsText.y + levelsText.height / 2, 'homeIcon')
            .setOrigin(20 , 0.5)
            .setInteractive();

        homeIcon.setScale(0.15); 

        homeIcon.on('pointerdown', () => {
            console.log('Home icon clicked');
        });

        const levels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"];
        const levelSpacingX = 250; 
        const levelSpacingY = 150; 
        const levelsPerRow = 3;
        const startX = this.cameras.main.width / 2 - (levelsPerRow - 1) * levelSpacingX / 2;
        const startY = this.cameras.main.height / 2 - (Math.ceil(levels.length / levelsPerRow) - 1) * levelSpacingY / 2;

        levels.forEach((level, index) => {
            let row = Math.floor(index / levelsPerRow);
            let col = index % levelsPerRow;
            let x = startX + col * levelSpacingX;
            let y = startY + row * levelSpacingY;

            let levelText = this.add.text(x, y, level, { 
                fontFamily: "gameFont",
                fontSize: "40px",
                fill: "#ffffff"
            })
            .setOrigin(0.5)
            .setInteractive();

            // Add hover effect
            levelText.on('pointerover', () => {
                levelText.setStyle({ fill: '#ffcc00' });
            });

            levelText.on('pointerout', () => {
                levelText.setStyle({ fill: '#ffffff' });
            });

            // Handle level click
            levelText.on('pointerdown', () => {
                this.selectLevel(level);
            });
        });
    }

    selectLevel(level) {
        console.log(`Selected: ${level}`);
    }
}
