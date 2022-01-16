// Main Loop
var mainInterval;

// Animation Loop
var animationInterval;
var spriteSheet = document.getElementById("dino-image");
var widthSheet = 256;
var widthSprite = 128;

// Stats
var running = false;
var leftPos = 0;
var dir = -1;

// Main Loop

function stopLoop() {
    clearInterval(mainInterval);
}

function mainLoop() {
    spriteSheet.style.backgroundSize = `256px 128px`;
    startAnimation();

    mainInterval = setInterval(() => {
    });
}

// Animation

function stopAnimation() {
    clearInterval(animationInterval);
}

function startAnimation() {
    var position = widthSprite;
    const speed = 100;
    const diff = widthSprite;

    animationInterval = setInterval(() => {
        spriteSheet.style.backgroundPosition = `-${position}px 0px`;

        if (position < widthSheet) {
            position = position + diff;
        } else {
            position = widthSprite;
        }
    }, speed);
}

// Animation states

function startRun() {
    if (running) return;

    clearInterval(animationInterval);
    spriteSheet.style.background = `url("img/dino_run.png") 0px 0px`;
    spriteSheet.style.backgroundSize = `512px 128px`;
    widthSheet = 512;
    running = true;
    startAnimation();
}

function stopRun() {
    clearInterval(animationInterval);
    spriteSheet.style.background = `url("img/dino_idle.png") 0px 0px`;
    spriteSheet.style.backgroundSize = `256px 128px`;
    widthSheet = 256;
    running = false;
    startAnimation();
}

// Key Detection

function onKeyDown(e) {
    if (e.code == 'KeyA') {
        spriteSheet.style.transform = `scaleX(1)`;
        dir = 1;
        startRun();
    }
    else if (e.code == 'KeyD') {
        spriteSheet.style.transform = `scaleX(-1)`;
        dir = -1;
        startRun();
    }
}

function onKeyUp(e) {
    stopRun();
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

mainLoop()