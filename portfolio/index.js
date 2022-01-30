import language from './translate.js';

//hamburger
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

function toggleMenu() {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
}

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    hamburger.classList.remove('open');
    nav.classList.toggle('open');
  }
}

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);

// Портфолио
const portfolioBtn = document.querySelector('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio_img');
const portfolioBtns = document.querySelector('.wrap-button');
const portfolioButtons = document.querySelectorAll('.portfolio-btn');

function changeImage(event) {
  if(event.target.classList.contains('portfolio-btn')) {
    portfolioButtons.forEach( (item) => item.classList.remove('active'));
    event.target.classList.add('active');
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}

portfolioBtns.addEventListener('click', changeImage);

// Перевод 
let toTranslate = document.querySelectorAll('*[data-i18]');
const LangEn = document.querySelector('.switch-lng.en');
const LangRu = document.querySelector('.switch-lng.ru');
const languageSwitch = document.querySelectorAll('.switch-lng');

//let lang = 'en';


function getTranslate(lang) {
  languageSwitch.forEach( (item) => item.classList.remove('active'));
  if (lang === 'ru') {
    LangRu.classList.add('active'); 
    //lang = 'ru';
  }
  else if (lang === 'en') {
    LangEn.classList.add('active'); 
    //lang = 'en';
  }
  
  toTranslate.forEach( item => {
    // if (currentElement.placeholder) {
    //   currentElement.placeholder = // Ваш код
    //   currentElement.textContent = ''
    // }
    item.textContent = language[lang][item.dataset.i18]});
    localStorage.setItem('lang', lang)
}

LangRu.addEventListener('click', () => {
  getTranslate('ru');
})

LangEn.addEventListener('click', () => {
  getTranslate('en');
})

// Светлая тема
const sectionTitle = document.querySelectorAll('.section-title');
const portfolioButton = document.querySelectorAll('.portfolio-btn');
const themeSun = document.querySelector('.sun');
const themeMoon = document.querySelector('.moon');
const navOpen = document.querySelector('nav');
const navLinkOpen = document.querySelectorAll('.nav-link');
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
const classLight = [skills, portfolio, video, price];

const buttonTheme = document.querySelector('.wrap-button-theme');

let theme = 'dark';

function changeTheme() {
  themeSun.classList.toggle('change');
  themeMoon.classList.toggle('change');
  navOpen.classList.toggle('light-theme');
  line1.classList.toggle('light-theme');
  line2.classList.toggle('light-theme');
  line3.classList.toggle('light-theme');
  navLinkOpen.forEach( (item) => item.classList.toggle('light-theme'));
  classLight.forEach( (item) => item.classList.toggle('light-theme'));
  sectionTitle.forEach( (item) => item.classList.toggle('light-theme'));
  portfolioButton.forEach( (item) => item.classList.toggle('light-theme'));
  if (theme === 'dark') {
    theme = 'light';
  } 
  else {theme = 'dark'};
}

buttonTheme.addEventListener('click', changeTheme);


//local storage
function setLocalStorage() {
  localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('theme')) {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
          changeTheme();
      }
  }
  if (localStorage.getItem('lang')) {
      const lang = localStorage.getItem('lang');
      if (lang === 'en') {
          getTranslate('en')
      } else if (lang === 'ru') {
          getTranslate('ru')
      }
  }
}
window.addEventListener('load', getLocalStorage)

console.log('1. Смена изображений в секции portfolio 25/25\n2. Перевод страницы на два языка 25/25\n3. Переключение светлой и тёмной темы 25/25\n4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы 5/5\n5. Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике 5/5\nИтого 80/85')