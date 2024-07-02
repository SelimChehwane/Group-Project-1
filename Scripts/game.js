let height = window.innerHeight
let width =window.innerWidth

let config ={
    type:Phaser.AUTO,
    width : width,
    height : height,
    backgroundColor:'#301934',
    scene: [Levels]
}

    let game =new Phaser.Game(config); 
