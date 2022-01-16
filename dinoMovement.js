var animationInterval;
var spriteSheet = document.getElementById("dino-image");
var widthSheet = 256;
var widthSprite = 128;

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