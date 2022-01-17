// Main Loop
var mainInterval;
var frameduration = 10;

// Animation Loop
var animationInterval;
var spriteSheet = document.getElementById("dino-image");
var widthSheet = 512;
var widthSprite = 256;

var animSpeed = 200;

// Stats
var running = false;
var leftPos = -260;
var dir = -1;
var runSpeed = 8;

// Intro Cinematic
var gameBegin = false;

function intro() {
    var interval;
    startRun();

    interval = setInterval(() => {
        leftPos += runSpeed;
        spriteSheet.style.left = `${leftPos}px`;
        if (leftPos >= 190) {
            gameBegin = true;
            stopRun();
            mainLoop();
            clearInterval(interval);
        }
    }, 10);
}

// Main Loop

function stopLoop() {
    clearInterval(mainInterval);
}

function mainLoop() {
    mainInterval = setInterval(() => {
        if (running) {
            leftPos += runSpeed * -dir;
            if (leftPos < 0) {
                leftPos = 0;
            } else if (leftPos > window.screen.width - widthSprite) {
                leftPos = window.screen.width - widthSprite;
            }

            spriteSheet.style.left = `${leftPos}px`;
        }
    }, frameduration);
}

// Animation

function stopAnimation() {
    clearInterval(animationInterval);
}

function startAnimation() {
    var position = widthSprite;
    const diff = widthSprite;

    animationInterval = setInterval(() => {
        spriteSheet.style.backgroundPosition = `-${position}px 0px`;

        if (position < widthSheet) {
            position = position + diff;
        } else {
            position = widthSprite;
        }
    }, animSpeed);
}

// Animation states

function startRun() {
    if (running) return;

    stopAnimation();

    spriteSheet.style.background = `url("../img/dino_run.png") 0px 0px`;
    spriteSheet.style.backgroundSize = `1024px 256px`;

    animSpeed = 100;
    widthSheet = 1024;
    running = true;
    startAnimation();
}

function stopRun() {
    stopAnimation();

    spriteSheet.style.background = `url("../img/dino_idle.png") 0px 0px`;
    spriteSheet.style.backgroundSize = `512px 256px`;

    animSpeed = 200;
    widthSheet = 512;
    running = false;
    startAnimation();
}

// Key Detection

function onKeyDown(e) {
    if (!gameBegin) return;

    if (e.key == 'a') {
        spriteSheet.style.transform = `scaleX(1)`;
        dir = 1;
        startRun();
    }
    else if (e.key == 'd') {
        spriteSheet.style.transform = `scaleX(-1)`;
        dir = -1;
        startRun();
    }
}

function onKeyUp(e) {
    if (!gameBegin) return;
    stopRun();
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

intro()