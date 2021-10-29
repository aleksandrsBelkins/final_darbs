const url = 'http://aws.random.cat//meow';

const image = document.querySelector('.cat__image');
const card = document.querySelector('.cat__card')
const button = document.querySelector('.cat__btn');



async function requestHandler() {
    try {
        card.classList.add('sending');
        let response = await fetch(url);
        let result = await response.json();
        card.classList.remove('sending');
        image.src = result.file;
    } catch(e) {
        console.log(e);
        card.classList.remove('sending');
    }
}

button.addEventListener('click', () => {
    let isLoaded = image.complete;

    if (isLoaded) {
        requestHandler();
    }
})