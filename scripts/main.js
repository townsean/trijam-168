function goToState(stateName) {
    const states = document.getElementsByClassName("state");
    _currentState = stateName;

    for(let state of states) {
        if(state.id == stateName) {
            state.classList.remove("hidden");
        } else {
            state.classList.add("hidden");
        }
    }
}

function playState1() {
    const indicator = document.getElementById("dial-gauge-indicator");
    const indicatorTransform = window.getComputedStyle(indicator).getPropertyValue('transform');

    _rotation = getRotationAngleFromMatrix(indicatorTransform);

    indicator.classList.add("stop-animation");
    setTimeout(() => {
        goToState("play-state-2");
        indicator.classList.remove("stop-animation");
      }, "2000");
}

function playState2() {
    let isPinataHit = false;
    const barGauge = document.getElementById('bar-gauge');
    const indicator = document.getElementById('bar-gauge-indicator');
    const indicatorTransform = window.getComputedStyle(indicator).getPropertyValue('transform');
    
    const matrix = new DOMMatrixReadOnly(indicatorTransform)
    const translateX = matrix.m41;
    const width = barGauge.offsetWidth;

    _rotationCorrection = (translateX / (width / 2)) * 180;

    let angle = _rotation + _rotationCorrection;
    if (angle >= -20 && angle <= 20) {
        isPinataHit = true;
    }


    indicator.classList.add("stop-animation");
    setTimeout(() => {
        playSound("assets/sounds/swing.wav");

        if(isPinataHit) {
            goToState("win-state");
            playSound("assets/sounds/win.wav");
        } else {
            goToState("lose-state");
        }

        indicator.classList.remove("stop-animation");
      }, "1500");
}

function playSound(url, loop = false) {
    const audio = new Audio();
    audio.src = url;
    audio.loop = loop;
    audio.play();
}

/**
 * Code copied and modified from https://css-tricks.com/get-value-of-css-rotation-through-javascript/
 * @param {*} matrix 
 */
function getRotationAngleFromMatrix(matrix) {
    let values = matrix.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');

    let a = values[0];
    let b = values[1];

    let angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    return angle;
}

function checkState(state) {
    switch(state) {
        case 'start-state':
            if(!_isBackgroundMusicPlaying) {
                _isBackgroundMusicPlaying = true;
                playSound("assets/sounds/music.wav", true);
            }

            goToState("play-state-1");
            break;
        case 'play-state-1':
            playState1()
            break;
        case 'play-state-2':
            playState2()
            break;
        case 'win-state':
        case 'lose-state':
            goToState("start-state");
            break;
        default:
            console.log('what happened');
    }
}

function main() {
    document.addEventListener('keypress', () => {
        checkState(_currentState);
    })

    document.addEventListener('click', () => {
        checkState(_currentState);
    })
}

let _currentState = "start-state"
let _rotation;
let _rotationCorrection;
let _isBackgroundMusicPlaying = false;

main();