// hamburger
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header');

function toggleMenu() {
    headerNav.classList.toggle('open');
    hamburger.classList.toggle('open');
}
hamburger.addEventListener('click', toggleMenu);

// audioPlay
let isPlay = false;
let song = 'solovey';
const audio = new Audio();
const buttonAudio = document.querySelector('.button-audio');
const buttonPlay = document.querySelector('.icon-play');

function playAudio() {
    audio.src = `./assets/audio/${song}.mp3`;
    audio.currentTime = 0;
    if(!isPlay) {
        isPlay = true;  
        buttonPlay.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './assets/svg/sprite.svg#pause');
        audio.play();
    }
    else {
        isPlay = false;
        buttonPlay.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './assets/svg/sprite.svg#play');
        audio.pause();
    }
}
buttonAudio.addEventListener('click', playAudio);


// backgroundMain
const backgroundMain = document.querySelector('.main');
const itemNav = document.querySelectorAll('.nav-item');

function background(event) {
    backgroundMain.style.backgroundImage = `url(./assets/img/${event}.jpg)`;
    itemNav.forEach( (item) => {
        if(item.dataset.bird === event) {
            item.classList.add('choice');
        }
        else {
            item.classList.remove('choice');
        }
    });
    song = event;
}

//choose audio
const navPlay = document.querySelector('.nav-list');

function changeAudio(event) { 
    background(event.target.dataset.bird);
    song = `${event.target.dataset.bird}`;
    isPlay = false;
    playAudio();
}
navPlay.addEventListener('click', changeAudio);

//local storage
function setLocalStorage() {
    localStorage.setItem('song', song);
}
window.addEventListener('beforeunload', setLocalStorage)
  
function getLocalStorage() {
    if (localStorage.getItem('song')) {
        const song = localStorage.getItem('song');
        background(song);
    }
}
window.addEventListener('load', getLocalStorage)