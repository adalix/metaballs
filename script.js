const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

ctx.fillStyle = 'rgb(192, 73, 73)'

class Ball {
    constructor(effect){
        this.effect = effect;
        this.x = Math.random() * this.effect.width;;
        this.y = 0;
        this.radius = Math.random() * 250 + 40;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;

    }
    update(){
        if(this.x < this.radius || this.x > this.effect.width - this.radius){
            this.speedX *= -1;

        }
        if(this.y < this.radius || this.y > this.effect.height - this.radius){
            this.speedY *= 1
        }
        this.x += this.speedX
        this.y += this.speedY
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        context.fill()
    }
    reset(){
        this.x = this.effect.width * 0.5;
        this.y = this.effect.height * 0.5;
    }
}

class MetaBallEffect{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.metaBallsArray = [];

    }
    init(numberOfBalls){
        for(let i = 0; i < numberOfBalls; i++){
            this.metaBallsArray.push(new Ball(this))
        }
    }
    update(){
        this.metaBallsArray.forEach(meta => meta.update())
    }
    draw(context){
        this.metaBallsArray.forEach(meta => meta.draw(context))
    }
    reset(newWidth, newHeight){
        this.width = newWidth;
        this.height = newHeight;
        this.metaBallsArray.forEach(meta => meta.reset());
    }

}

const effect = new MetaBallEffect(canvas.width, canvas.height)

effect.init(40)

console.log(effect)

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    effect.update()
    effect.draw(ctx)
    requestAnimationFrame(animate)
}

animate()

window.addEventListener('resize', function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
    canvas.fillStyle = "white"
    effect.reset(canvas.width, canvas.height)
})