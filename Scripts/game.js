let height = window.innerHeight;
let width = window.innerWidth;

let config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#301934',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Levels, LevelOne , level2,level3]
};

let game = new Phaser.Game(config);
