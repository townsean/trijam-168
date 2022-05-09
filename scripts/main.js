function goToState(stateName) {
    const states = document.getElementsByClassName("state");
    currentState = stateName;
    
    for(let state of states) {
        if(state.id == stateName) {
            state.classList.remove("hidden");
        } else {
            state.classList.add("hidden");
        }
    }
}

function checkState(state) {
    switch(state) {
        case 'start-state':
            goToState("play-state-1");
            break;
        case 'play-state-1':
            goToState("play-state-2");
            break;
        case 'play-state-2':
            goToState("win-state");
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
        checkState(currentState);
    })

    document.addEventListener('click', () => {
        checkState(currentState);
    })
}

let currentState = "start-state"

main();