class level2 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload() {
      this.load.image("tile", "/Assets/Images/lvl2-tiles/tile.png");
      this.load.image("tfloat", "/Assets/Images/lvl2-tiles/tfloat.png");
      this.load.image("Xbutton-out","/Assets/Images/lvl2-tiles/Xbutton-out.png");
      this.load.image("Xbutton-in","/Assets/Images/lvl2-tiles/Xbutton-in.png");
      this.load.image("doors1","/Assets/Images/lvl2-tiles/doors1.png");
      this.load.image("doors2","/Assets/Images/lvl2-tiles/doors2.png");
      this.load.image("base","/Assets/Images/lvl2-tiles/base.png");
      this.load.image("elevator-tile","/Assets/Images/lvl2-tiles/elevator-tile.png");
    //   this sprite is for testing purpose 
      this.load.spritesheet("test", "/Assets/Images/lvl2-tiles/test.png", { 
        frameWidth: 40,
        frameHeight: 40,
      });
    }
  
    create() { 

    }
    update() {
  
    }
  }
