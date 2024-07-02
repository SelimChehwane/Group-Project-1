class Levels extends Phaser.Scene {
    constructor() {
        super("levelSelect");
    }

    preload() {
    }

    create() {
        this.add.text(610, 50, "Levels", { 
            font: "48px gameFont", fill: "#ffffff", });

        const levels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"];
        const levelSpacingX = 250; // Horizontal spacing between levels
        const levelSpacingY = 150; // Vertical spacing between levels
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
        });
    }

    
}