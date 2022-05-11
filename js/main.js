const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.4

class Sprite 
{
    constructor({position, velocity})
    {
        this.position = position
        this.velocity = velocity
        this.height = 50
        this.onGround = false
    }

    draw() 
    {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
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

const dino = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

dino.draw()

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

function mainloop()
{
    window.requestAnimationFrame(mainloop)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    dino.update()

    if (keys.a.pressed)
        dino.velocity.x = -5
    else if (dino.velocity.x < 0)
        dino.velocity.x = 0
    
    if (keys.d.pressed)
        dino.velocity.x = 5
    else if (dino.velocity.x > 0)
        dino.velocity.x = 0

    if (keys.w.pressed && dino.onGround)
        dino.jump()
}

mainloop()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            keys.w.pressed = true
            break

    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break

    }
})
