const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = screen.width / 2
canvas.height = screen.width / 2 * 9 / 16

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.4

const dino = new Dino({
    position: {
        x: 0,
        y: canvas.height
    },
    scale: canvas.width / 200,
    velocity: {
        x: 0,
        y: 0
    },
    imgSrc: "img/dino_idle_left.png",
    nbFrames: 2,
    frameDuration: 10,
    sprites: {
        idle: {
            imgSrcLeft: "img/dino_idle_left.png",
            imgSrcRight: "img/dino_idle_right.png",
            nbFrames: 2,
            frameDuration: 10
        },
        run: {
            imgSrcLeft: "img/dino_run_left.png",
            imgSrcRight: "img/dino_run_right.png",
            nbFrames: 2,
            frameDuration: 5
        },
        jump: {
            imgSrcLeft: "img/dino_jump_left.png",
            imgSrcRight: "img/dino_jump_right.png",
            nbFrames: 1,
            frameDuration: 0
        }
    }
})

const keys = {
    a: {
        pressed: false,
        changed: false
    },
    d: {
        pressed: false,
        changed: false
    },
    w: {
        pressed: false,
        changed: false
    }
}

function getkeydown(key)
{
    down = key.pressed && key.changed
    if (down)
        key.changed = false
    return down
}

function getkeyup(key)
{
    up = !key.pressed && key.changed
    if (up)
        key.changed = false
    return up
}

function getkey(key)
{
    return key.pressed
}

function mainloop()
{
    window.requestAnimationFrame(mainloop)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    dino.update()

    if (getkey(keys.w) && dino.onGround)
        dino.jump()

    if (getkeydown(keys.a))
    {
        dino.velocity.x = -5
        dino.switchAnimation(dino.sprites.run, false)
    }
    else if (getkeyup(keys.a) && dino.velocity.x < 0)
    {
        dino.velocity.x = 5 * + getkey(keys.d)
        if (getkey(keys.d))
            dino.switchAnimation(dino.sprites.run, true)
        else
            dino.switchAnimation(dino.sprites.idle, false)
    }

    if (getkeydown(keys.d))    
    {
        dino.velocity.x = 5
        dino.switchAnimation(dino.sprites.run, true)
    }

    else if (getkeyup(keys.d) && dino.velocity.x > 0)
    {
        dino.velocity.x = -5 * + getkey(keys.a)
        if (getkey(keys.a))
            dino.switchAnimation(dino.sprites.run, false)
        else
            dino.switchAnimation(dino.sprites.idle, true)
    } 
}

mainloop()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            keys.d.changed = true
            break
        case 'a':
            keys.a.pressed = true
            keys.a.changed = true
            break
        case 'w':
            keys.w.pressed = true
            keys.w.changed = true
            break

    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            keys.d.changed = true
            break
        case 'a':
            keys.a.pressed = false
            keys.a.changed = true
            break
        case 'w':
            keys.w.pressed = false
            keys.w.changed = true
            break

    }
})
