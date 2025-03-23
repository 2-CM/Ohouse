const swiper = new Swiper('#banner .swiper', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
    pagination: {
        el: '.banner__swiper-pagination .page-number',
        type: 'custom',
        renderCustom: (swiper, current, total) => {
            return `${current} / ${total}`; // 커스터마이즈된 페이지 번호 형식
        },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});
