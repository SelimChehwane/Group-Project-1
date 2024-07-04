const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scene:level,
  
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
