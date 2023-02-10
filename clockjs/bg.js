const body = document.querySelector('body');
const jsclock = document.querySelector('.js-clock');
const textgr = document.querySelector('.js-greetings');
const IMAGE_NUMBER = 3;
const JSCLICKED = 'jsclicked';
const JSCLICKED2 = 'jsclicked2';
const JSCLICKED1 = 'jsclicked1';

function showImage(number) {
    const img = new Image();
    img.src = `/images/${number + 1}.jpg`;
    img.classList.add('bgImage');
    body.prepend(img);
    console.log(number);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMAGE_NUMBER);
    if (number == 0) {
        jsclock.classList.toggle(JSCLICKED);
        textgr.classList.toggle(JSCLICKED);
    } else if (number == 2) {
        jsclock.classList.toggle(JSCLICKED2);
        textgr.classList.toggle(JSCLICKED2);
    } else if (number == 1) {
        jsclock.classList.toggle(JSCLICKED1);
        textgr.classList.toggle(JSCLICKED1);
    }
    return number
}

function init() {
    const randomNumber = getRandom();
    showImage(randomNumber);
}
init();