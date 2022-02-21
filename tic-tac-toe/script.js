const imgCross = `<svg width="75" height="75" xmlns="http://www.w3.org/2000/svg">
    <line class="cross" stroke-width="3" id="line-1" y2="72.77044" x2="2.22955" y1="1.78571" x1="73.21428"/>
    <line class="cross" transform="rotate(90 37.7219 37.2781)" stroke-width="3" id="line-2" y2="72.77044" x2="2.22955" y1="1.78571" x1="73.21428"/>
    </svg>`;
const imgCircle = `<svg xmlns="http://www.w3.org/2000/svg" width="75px" height="75px" viewBox="0 0 150 150"><circle class="circle" cx="75" cy="75" r="70" stroke-width="6"/></svg>`;
const fieldGame = document.querySelector('.field-game');
const cells = document.querySelectorAll('.cell');
const wrapNotification = document.querySelector('.wrap-notification');
const notification = document.querySelector('.notification');
const buttonNewGame = document.querySelector('.button-new-game');
const chooseButtonOpponent = document.querySelector('.opponent');
const buttonOpponent = document.querySelectorAll('.button-opponent');
const buttonOpponentComputer = document.querySelector('.button-opponent-computer');
const wrapRecord = document.querySelector('.wrap-record');
let record = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];
let ii;
let countStep = 0;
let step = "cross";
let img;
let string;
let string2;
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function checkWinning (step, img) {
    let freeCell = document.querySelectorAll('.free');

    for (let i = 0; i < win.length; i++) {
        if(cells[win[i][0]].classList.contains(`${step}`) && cells[win[i][1]].classList.contains(`${step}`) && cells[win[i][2]].classList.contains(`${step}`)) {
            freeCell.forEach( cell => cell.classList.remove('free'));
            string = `<p class="p">Winner: ${step}</p>`;
            string2 = `<p class="p">Number of moves: ${countStep}</p>`;
            setTimeout("wrapNotification.classList.add('game-over')", 1500);
            if (record.length >= 10) {
                record.pop();
            }
            record.unshift(step);
            notification.insertAdjacentHTML('afterbegin', string2);
            notification.insertAdjacentHTML('afterbegin', string);
            return
        }
    }

    if (freeCell.length === 0) {
        string = `<p class="p">draw</p>`;
        string2 = `<p class="p">Number of moves: ${countStep}</p>`;
        if (record.length >= 10) {
            record.pop();
        }
        record.unshift('draw');
        wrapNotification.classList.add('game-over');  
        notification.insertAdjacentHTML('afterbegin', string2);
        notification.insertAdjacentHTML('afterbegin', string);
    }
}

function drawStep (cell, img) {
    
    cell.insertAdjacentHTML('afterbegin', img);
    cell.classList.remove('free');
    
}

function game (cell) {
    cell.classList.add(`${step}`);
    countStep++;
    if (cell.classList.contains('free')) {
    if (step === "circle") {
        img = imgCircle;
        drawStep (cell, img);
        checkWinning (step, img);
        step = "cross";
    }
    else {
        img = imgCross;
        drawStep (cell, img);
        checkWinning (step, img);
        step = "circle";
    }
    }
}

function clear () {
    location.reload();
}

let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function computer(cell) {
    if (step === "cross") {
        game(cell);
    }
    array.splice(array.indexOf([...fieldGame.children].indexOf(cell)), 1); //почитать

    if (step === "circle") {
        let randomCell = getRandomInt(array.length);
        game(cells[array[randomCell]]);
        array.splice(randomCell, 1);
    }

}

function chooseOpponent (event) {
    if (!(event.target.classList.contains('selected'))) {
        if (ii === 'true') {      
            ii = 'false';

        }
        else {         
            ii = 'true';
        }
        buttonOpponent.forEach( elem => elem.classList.toggle('selected'));
    }
    clear(); 
}

function motionOpponent (event) {
    if (ii === 'true') {  
        computer(event.target);
    }
    else {
        game(event.target);
    }
}

function showRecord (record) {
    for (let i = 0; i < record.length; i++) {
        string = `<div class="string-record"> ${i}. ${record[i]} </div>`;
        wrapRecord.insertAdjacentHTML('beforeend', string);
    }
    
}

chooseButtonOpponent.addEventListener('click', chooseOpponent)

buttonNewGame.addEventListener('click', clear);

fieldGame.addEventListener('click', motionOpponent);

//local storage
function setLocalStorage() {
    localStorage.setItem('ii', ii);
    localStorage.setItem('record', JSON.stringify(record));
}
window.addEventListener('beforeunload', setLocalStorage)
  
function getLocalStorage() {
    if (localStorage.getItem('record')) {
        record = JSON.parse(localStorage.getItem('record'));
    }
    showRecord(record);
    if (localStorage.getItem('ii')) {
        ii = localStorage.getItem('ii');
        if (ii === 'true' && !(buttonOpponentComputer.classList.contains('selected'))) {
            buttonOpponent.forEach( elem => elem.classList.toggle('selected'));
        }
    }
    else {
        ii = false;
    }
}
window.addEventListener('load', getLocalStorage)

 console.log('Итоговая оценка 60')