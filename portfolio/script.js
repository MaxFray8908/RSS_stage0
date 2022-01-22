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


console.log('1. Вёрстка соответствует макету 47/48 \n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется 15/15 \n3. На ширине экрана 768рх и меньше реализовано адаптивное меню 22/22 \nИтого 75/75')