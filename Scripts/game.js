let height = window.innerHeight;
let width = window.innerWidth;

let config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    backgroundColor: '#301934',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Levels, LevelOne , level2]
};

let game = new Phaser.Game(config);
