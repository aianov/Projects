/*=====================Для себя: Методы для массивов============================
метод push добавляет значение в конец массива, в указанную переменную
например:
let massiv = [10, 20];
massiv.push(30);
console.log(massiv);
вывод: (3) [10, 20, 30]
а метод unshift добавляет значение в начало а не в конец при этом его индекс: 0

метод pop забирает значение массива в конце и присваевает это значение в другую переменную
метод shift делает тоже и самое что pop только уже с начала

метод splice позволяет удалить значение массива по его индексу (нумерации в массиве)
например: massiv.splice(2)
удаляется значение массива с индексом 2
через запятую можно указать второе значение которое отвечает за то сколько мы значений еще удалим от заданного индекса
тоесть: let massiv = [10, 20, 30, 40, 50];
massiv.splice (2, 2);
итог: [10, 50]

метод split превращает строку в массив например:
let a = [Dulat];
let b = a.split("");
итог: ["D", "u", "l", "a", "t"]
и есть второ вариант использования метода split:
let a = [Dulat daun];
let b = a.split(" ");
итог: ["Dulat", "daun"];
==========================Для себя: Функции и проверки=============================================
Функция isNaN() определяет является ли литерал или переменная нечисловым значением (NaN) или нет. При работе с функцией необходимо проявлять осторожность так как она имеет свои особенности. В качестве альтернативы можно использовать метод Number.isNaN() из ECMAScript 6, или дополнительно проверять литерал или переменную на нечисловое значение при помощи typeof
короче говоря если это строка то true если число то false

Функция parseInt() принимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления.
=================================================================================================*/

let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0; 
let hidden;
let deck;
let canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}
const buttonjs = document.querySelector(".buttjs");

function clickHandler() {
    location.reload();
}
function buildDeck() {
    let values = ["A", "2","3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let t = 0; t < types.length; t++) {
        for (let v = 0; v < values.length; v++) {
            deck.push(values[v] + "-" + types[t])
        }
    }
    //первый цикл for никогда не прекратиться до тех пор пока второй цикл for в нем, не распределит values первому значению types "C"
    //когда он полностью запишет все значение values с первым значением types начнется первый цикл for который скажет распределить значения values уже второму значению types "H" 
}
function shuffleDeck() {
    for (let t = 0; t < deck.length; t++) {
        let v = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[t];
        deck[t] = deck[v];
        deck[v] = temp;
    }
    //console.log(deck); вообщем-то функция shuffledeck берет и нашим всем картам от 1 до 52 по очередно заменяет их попавшим рандомом значение по индексу. кратко говоря оно берет и туда сюда туда сюда растосовывает карты.
}
function startGame() {
    hidden = deck.pop(); //берется значение с самого конца в массиве deck и присваивается переменной hidden
    dealerSum += getValue(hidden); //запуск функции getValue со значением hidden
    dealerAceCount += checkAce(hidden); //ну по правилам игры нам нужно создать такую переменную и функцию
    
    while (dealerSum < 17) {
        //<img src="./cards/(наше значение).png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.querySelector(".dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.querySelector(".your-cards").append(cardImg);
    }
    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}
function getValue(card) { //значение hidden записывается в переменную card
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0]; // "2", по индексу 0 берется значение в массиве data: ["2", "C"] тоесть СТРОКА "2"

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11; //по правилам игры если выпадет A то нам оно возвращает значение 11
        }
        return 10;
    }
    return parseInt(value);  //в любом случае все наши числа это СТРОКИ так что с помощью parseInt мы переделаем их в ЧИСЛО
}
function checkAce(card) { //Фукнция по правилам игры
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}
function hit() {
     if (!canHit) {
        return;
     }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.querySelector(".your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }
}
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) { //случай если у вас 21 очков при нажатии hit
        message = "Вы Проиграли... :(";
    }
    else if (dealerSum > 21) { //случай если у диллера 21 при hit
        message = "Вы Выиграли! :)";
    }
    else if (yourSum == dealerSum) { //случай если у обоих 21 прим hit
        message = "Ничья :/";
    }
    else if (yourSum > dealerSum) {
        message = "Вы Выиграли! :)))";
    }
    else if (yourSum < dealerSum) {
        message = "Вы Проиграли... :(";
    }
    
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}
function reduceAce(playerSum, playerAceCount) {
    while(playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
console.log("привет Елдос! Что ты тут ищешь?)))")