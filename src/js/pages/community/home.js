document.addEventListener('DOMContentLoaded', function () {
    // 배너
    const bannerImageList = [];

    for (let i = 1; i <= 15; i++) {
        bannerImageList.push(`banner-main${i}.avif`);
    }

    // 배너 swiper-wrapper 요소 선택
    const bannerSwiperWrapper = document.querySelector('#banner .swiper-wrapper');

    // bannerImageList 배열의 이미지들을 동적으로 swiper-slide로 추가
    bannerSwiperWrapper.innerHTML = bannerImageList
        .map(
            (image) => `
            <div class="swiper-slide">
                <a href="#">
                    <div class="image-wrapper">
                        <img class="event" src="/src/assets/images/community/home/banners/${image}" alt="배너 이미지" />
                    </div>
                </a>
            </div>
        `
        )
        .join(''); // map()으로 HTML 문자열을 생성하고, join('')으로 하나의 문자열로 합침

    // 배너 Swiper 초기화
    const bannerSwiper = new Swiper('#banner .swiper', {
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
                return `${current} / ${total}`; // 페이지 번호 형식
            },
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // 창 크기 변경 시 swiper 내부 상태를 재계산하여 슬라이드 위치 버벅임 방지
    bannerSwiper.on('resize', () => {
        bannerSwiper.update();
    });

    // 인테리어 피드
    const interiorFeedSwiper = new Swiper('#interior-feed .swiper', {
        slidesPerView: 2.5,
        slidesOffsetAfter: 35,
    });

    // 북마크 버튼 클릭 시 빈 아이콘과 꽉 찬 아이콘을 토글
    const bookmarkButtons = document.querySelectorAll('.bookmark-button');

    bookmarkButtons.forEach((button) => {
        const bookmarkIcon = button.querySelector('.bookmark-icon');

        button.addEventListener('click', function () {
            if (bookmarkIcon.src.includes('bookmark-empty.svg')) {
                bookmarkIcon.src = '/src/assets/icons/bookmark-filled.svg';
            } else {
                bookmarkIcon.src = '/src/assets/icons/bookmark-empty.svg';
            }
        });
    });
});
