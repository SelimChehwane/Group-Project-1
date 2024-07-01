
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: 0x00FF00,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics:{
    default: 'arcade',
    arcade: {
      gravity: {y:200},
    }
  },
  
}
const game = new Phaser.Game(config);


