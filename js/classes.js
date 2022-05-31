class Sprite 
{
    constructor({position, scale, imgSrc, nbFrames=1, frameDuration=0})
    {
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc
        this.scale = scale

        this.nbFrames = nbFrames
        this.frameElapsedTime = 0
        this.frameDuration = frameDuration
        this.frameCurrent = 0
    }

    draw() 
    {
        c.imageSmoothingEnabled = false
        c.drawImage(this.image, 
            this.frameCurrent * (this.image.width / this.nbFrames), 0, 
            this.image.width / this.nbFrames, this.image.height,
            this.position.x, this.position.y, 
            (this.image.width / this.nbFrames) * this.scale,
            this.image.height * this.scale
        )
    } 

    animate()
    {
        this.frameElapsedTime++

        if (this.frameElapsedTime % this.frameDuration === 0)
            this.frameCurrent = ++this.frameCurrent % this.nbFrames
    } 
}

class Dino extends Sprite
{
    constructor({position, scale, velocity, imgSrc, nbFrames=1, frameDuration=0, sprites})
    {
        super({position, scale, imgSrc, nbFrames, frameDuration})
        this.velocity = velocity
        this.onGround = false

        this.sprites = sprites
        for (const sprite in this.sprites) 
        {
            sprites[sprite].imageLeft = new Image()
            sprites[sprite].imageLeft.src = sprites[sprite].imgSrcLeft
            sprites[sprite].imageRight = new Image()
            sprites[sprite].imageRight.src = sprites[sprite].imgSrcRight
        }

        this.lookLeft = true
    }

    jump()
    {
        this.switchAnimation(this.sprites.jump, this.lookLeft)
        this.velocity.y = -12
        this.onGround = false
    }

    switchAnimation(anim, left)
    {
        this.lookLeft = left

        if (!this.onGround)
        {
            if (left)
                this.image = this.sprites.jump.imageLeft
            else
                this.image = this.sprites.jump.imageRight
            return
        }

        if (left && this.image === anim.imageLeft ||
            !left && this.image === anim.imageRight)
            return

        const reset = this.image === anim.imageLeft ||
            this.image === anim.imageRight

        if (!reset)
        {
            this.nbFrames = anim.nbFrames
            this.frameDuration = anim.frameDuration
            this.frameCurrent = 0
            this.frameElapsedTime = 0
        }

        if (left)
            this.image = anim.imageLeft
        else
            this.image = anim.imageRight
    }

    update()
    {
        this.draw()
        this.animate()
        this.velocity.y += gravity
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.image.height * this.scale + 
            this.velocity.y >= canvas.height)
        {
            this.velocity.y = 0
            this.position.y = canvas.height - this.image.height * this.scale
            if (this.onGround === false)
            {
                this.onGround = true
                if (this.velocity.x == 0)
                    this.switchAnimation(this.sprites.idle, this.lookLeft)
                else
                    this.switchAnimation(this.sprites.run, this.velocity.x > 0)
            }
            this.onGround = true
        }
    }
}

class Platform extends Sprite
{
    constructor({position, imgSrc, nbFrames=1, frameDuration=0})
    {
        super({position, imgSrc, nbFrames, frameDuration})
    }

    collide(other)
    {
        return false
    }
}
