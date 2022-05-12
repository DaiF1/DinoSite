const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.4

const dino = new Dino({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imgPrefix: "img/dino_idle_"
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

    if (getkeydown(keys.a))
    {
        dino.velocity.x = -5
        dino.image.src = dino.imgPrefix + "right.png"
    }
    else if (getkeyup(keys.a) && dino.velocity.x < 0)
    {
        dino.velocity.x = 5 * + getkey(keys.d)
        if (getkey(keys.d))
            dino.image.src = dino.imgPrefix + "left.png"
    }

    if (getkeydown(keys.d))    
    {
        dino.velocity.x = 5
        dino.image.src = dino.imgPrefix + "left.png"
    }

    else if (getkeyup(keys.d) && dino.velocity.x > 0)
    {
        dino.velocity.x = 5 * + getkey(keys.a)
        if (getkey(keys.a))
            dino.image.src = dino.imgPrefix + "right.png"
    }

    if (getkey(keys.w) && dino.onGround)
        dino.jump()
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
