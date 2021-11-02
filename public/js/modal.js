document.addEventListener('click', (event) => {
    // open
    if (event.target.closest('.js-modal-open')) {
        event.preventDefault();

        const target = event.target.closest('.js-modal-open');
        const modalId = target.getAttribute('href').replace('#', '');
        const modal = document.getElementById(modalId);
        // const lockPaddingValue = window.innerWidth - document.querySelector('.content').offsetWidth + 'px';
        // console.log(lockPaddingValue)

        document.body.style.padding = `${getScroolbarWidth()}px`;
        document.body.style.overflow = 'hidden';

        modal.classList.add('modal--active');
    }
    // close
    if (
        event.target.closest('.js-modal-close') || 
        event.target.classList.contains('.modal--active')
    ) {
        event.preventDefault();

        const modal = event.target.closest('.modal');

        modal.classList.remove('modal--active');

        modal.addEventListener('transitionend', showScrool);
    } 

    const modal = document.querySelector('.modal');

    modal.addEventListener('click', (event) => {
        if(!event.target.closest('.modal__dialog')) {
            modal.classList.remove('modal--active')
            modal.addEventListener('transitionend', showScrool);
        }
})
});

function getScroolbarWidth() {
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.top = '-9999px';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    const scroolbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return scroolbarWidth;
}

function showScrool(event) {
    if (event.propertyName === 'transform') {
        document.body.style.padding = '';
        document.body.style.overflow = 'visible';

        event.target.closest('.modal').removeEventListener( 'transitionend', showScrool);
    }
}