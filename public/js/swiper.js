const swiper = new Swiper('.gallery__swiper', {
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },

    speed: 400,

    autoHeight: true,

    slideToClickedSlide: true,
});