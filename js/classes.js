class Sprite 
{
    constructor({position, imgSrc})
    {
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc
        this.scale = 4
        this.nbFrames = 2
        this.height = this.image.height * this.scale
    }

    draw() 
    {
        if (this.height == 0)
            this.height = this.image.height * this.scale

        c.imageSmoothingEnabled = false
        c.drawImage(this.image, 
            0, 0, this.image.width / this.nbFrames, this.image.height,
            this.position.x, this.position.y, 
            (this.image.width / this.nbFrames) * this.scale, this.height
        )
    } 
}

class Dino extends Sprite
{
    constructor({position, velocity, imgPrefix})
    {
        const imgSrc = imgPrefix + "left.png"
        super({position, imgSrc})
        this.velocity = velocity
        this.onGround = false
        this.imgPrefix = imgPrefix
    }

    jump()
    {
        this.velocity.y = -12
        this.onGround = false
    }

    update()
    {
        this.draw()
        this.velocity.y += gravity
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height)
        {
            this.velocity.y = 0
            this.position.y = canvas.height - this.height
            this.onGround = true
        }
    }
}
