var commandbox = document.getElementById("command-panel");
var opacity = 0;

// Fading

function fadeIn()
{
    var interval;

    interval = setInterval(() => {
        opacity += 0.05;
        commandbox.style.opacity = `${opacity}`;
        if (opacity >= 1)
        clearInterval(interval);
    }, 10);
}

function fadeOut()
{
    var interval;
    
    interval = setInterval(() => {
        opacity -= 0.05;
        commandbox.style.opacity = `${opacity}`;
        if (opacity <= 0)
            clearInterval(interval);
    }, 10);
}

// Key detection

function onKeyDown(e) {
    if (e.code == 'KeyA' || e.code == 'KeyD') {
        fadeOut();
    }
}

document.addEventListener('keydown', onKeyDown);

fadeIn();