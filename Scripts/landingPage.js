const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const instructions_btn = document.getElementById('instructions-btn');
const main = document.getElementById('main-btn-container');
const instructions_container = document.getElementById('instructions-container');
const back_btn = document.getElementById('back');
const title=document.getElementById('title');

let speed = 1
let gameFrame=0

const bg0 = new Image();
bg0.src = 'assets/Landing_Page/0.png';
const bg1 = new Image();
bg1.src = 'assets/Landing_Page/1.png';
const bg2 = new Image();
bg2.src = 'assets/Landing_Page/2.png';
const bg3 = new Image();
bg3.src = 'assets/Landing_Page/3.png';
const bg4 = new Image();
bg4.src = 'assets/Landing_Page/4.png';
const bg5 = new Image();
bg5.src = 'assets/Landing_Page/5.png';

window.addEventListener('load', () => {
    class Layer{
    constructor(image,speedModifier) {
        this.x = 0
        this.y = 0
        this.width = 320
        this.height = 150
        this.image = image
        this.speedModifier = speedModifier
        this.speed = speed * this.speedModifier

    }

    update() {
            this.speed = speed * this.speedModifier
            this.x = gameFrame *this.speed%this.width
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height)

        }
        set_height(height) {
            this.height = height
        }
    }

    const layer0 = new Layer(bg0, 1);
    const layer1 = new Layer(bg1, 0.5);
    const layer2 = new Layer(bg2, 0.4);
    const layer3 = new Layer(bg3, 0.3);
    const layer4 = new Layer(bg4, 0.2);
    const layer5 = new Layer(bg5, 0.1);
    layer5.set_height(180)

    const layers=[layer5, layer4, layer3, layer2, layer1, layer0,]

    const animate = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        layers.forEach((layer) => {
            layer.update()
            layer.draw()
        });
        gameFrame--;
        requestAnimationFrame(animate);
    };
    
    instructions_btn.addEventListener('click', () => {
        main.classList.add('display-none')
        title.classList.add('display-none')
        instructions_container.classList.remove('display-none');
    });
    back_btn.addEventListener('click', () => {
        instructions_container.classList.add('display-none');
        title.classList.remove('display-none')
        main.classList.remove('display-none')
    });

    animate() 
});