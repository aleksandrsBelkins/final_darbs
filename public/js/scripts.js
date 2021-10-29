let dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
    document.querySelector('.header__list').classList.toggle('header__list--open');
    dropdown.querySelector('.dropdown__icon').classList.toggle('dropdown__icon--active');
})


let date = new Date();
let copyrightYear = document.querySelector('.footer__copyright-year');
copyrightYear.textContent = date.getFullYear();
