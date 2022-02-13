//form
const nameImage = document.querySelector('.name-images');
const searchImages = document.querySelector('.search-images');
let nameImg = 'september';
let numberPage = 1;

function receiveNameImages(event) { 
    event.preventDefault();
    clear();
    numberPage = 1;
    getData(nameImage.value, numberPage);
}
searchImages.addEventListener('submit', receiveNameImages);

const galleryContainer = document.querySelector('.gallery-container');
const moreImg = document.querySelector('.more-img');
const empty = document.querySelector('.empty');

//
async function getData(name, numberPage) {
    
    let url = `https://api.unsplash.com/search/photos?query=${name}&page=${numberPage}&per_page=16&client_id=bivkAOsmcb0P3hffQIIdkBD2FinuvLrHBJ1hBd1_ib0`;  
    nameImg = name;
    const res = await fetch(url);
    const data = await res.json();
    if (Object.keys(data.results).length === 0) {
        moreImg.classList.add('open');
        empty.classList.add('open');
        console.log('пустой');
    }
    else {
        moreImg.classList.remove('open');
        empty.classList.remove('open');
        data.results.forEach(element => showData(element.urls.regular)); 
    }

}


//add images
function showData(data){
    let img = `<a class="gallery-img" target="_blank" href="${data}" style="background-image: url(${data});" ></a>`;
    // console.log(img);
    galleryContainer.insertAdjacentHTML('beforeend', img);
}

function clear() {
    galleryContainer.innerHTML = '';
}

//добавляем еще изображений

function addImg() {
    numberPage++;
    // console.log(numberPage);
    getData(nameImg, numberPage);
}

moreImg.addEventListener('click', addImg);


//local storage
function setLocalStorage() {
    localStorage.setItem('nameImg', nameImg);
}
window.addEventListener('beforeunload', setLocalStorage)
  
function getLocalStorage() {
    if (localStorage.getItem('nameImg')) {
        const nameImg = localStorage.getItem('nameImg');
        getData(nameImg);
    }
    else {
        getData(nameImg);
    }
}
window.addEventListener('load', getLocalStorage)


console.log('Вёрстка 10/10')
console.log('При загрузке приложения на странице отображаются полученные от API изображения 10/10')
console.log('Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API 10/10')
console.log('Поиск 30/30')
console.log('Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложени 10/10')