var commandbox = document.getElementById("command-panel");
var opacity = -4;
var fadeInEnded = false;
var fadeOutStarted = false;

// Fading

function fadeIn()
{
    var interval;

    interval = setInterval(() => {
        if (opacity >= 1) {
            fadeInEnded = true;
            clearInterval(interval);
        }
        opacity += 0.05;
        commandbox.style.opacity = `${opacity}`;
    }, 10);
}

function fadeOut()
{
    if (!fadeInEnded) return;
    var interval;
    
    interval = setInterval(() => {
        if (opacity <= 0) {
            clearInterval(interval);
        }
        opacity -= 0.05;
        commandbox.style.opacity = `${opacity}`;
    }, 10);
}

// Key detection

function onKeyDown(e) {
    if (fadeOutStarted && !fadeInEnded) return;

    if (e.code == 'KeyA' || e.code == 'KeyD') {
        fadeOut();
        fadeOutStarted = true;
    }
}

document.addEventListener('keydown', onKeyDown);

fadeIn();