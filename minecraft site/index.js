let number = 0;
const textjs = document.querySelector(".nav-textjs");
const textjs1 = document.querySelector(".nav-textjs1")
const text = "Поздравляю!!! Ты выполнил все 5 заданий! Ты должен перейти в мой дискорд сервер и найти текстовый канал с названием #downloads и скачать файл под названием topcheat.dll";
const visible = "invisible";

function sum() {
    ++number;
    console.log(number)
    if (number === 5) {
        textjs.innerHTML = text;
        setTimeout(() => {
            textjs1.classList.remove(visible)
        }, 5000)
    }
}
function init() {
    alert("Смотрите в 100% размере, если вы с телефона то включите функцию 'Версия для ПК'!")
}
init();
