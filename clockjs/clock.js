const clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('h1');

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}



function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();

/*================================*/

const clocks = document.querySelector('.js-clock');
const CLICKED_CLASS = 'clicked';

function clickHandler() {
    clocks.classList.toggle(CLICKED_CLASS); //продвинутый способ
    /*const hasClicked = clocks.classList.contains(CLICKED_CLASS);
    if (hasClicked) {
        clocks.classList.remove(CLICKED_CLASS);
    } else {
        clocks.classList.add(CLICKED_CLASS);
    }*/     //обычный способ
}

function init2() {
    clocks.addEventListener('click', clickHandler);
}
init2();