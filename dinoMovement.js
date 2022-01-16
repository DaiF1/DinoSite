var animationInterval;
var spriteSheet = document.getElementById("dino-image");
var widthSheet = 256;
var widthSprite = 128;

var running = false;
var leftPos = 0;
var dir = -1;

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

function startRun() {
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


function onKeyDown(e) {
    if (e.code == 'KeyA') {
        spriteSheet.style.transform = `scaleX(1)`;
        dir = 1;
        run();
    }
    else if (e.code == 'KeyD') {
        spriteSheet.style.transform = `scaleX(-1)`;
        dir = -1;
        run();
    }
}

function onKeyUp(e) {
    stopRun();
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);