document.addEventListener('DOMContentLoaded', function () {
    const bannerImageList = []; // 배너 이미지 파일명을 저장할 리스트
    let isMobile = window.innerWidth < 768; // 현재 화면이 모바일인지 여부
    let bannerSwiper; // 배너 Swiper 인스턴스
    let interiorFeedSwiper; // 인테리어 피드 Swiper 인스턴스

    // 현재 화면 크기에 맞춰 배너 swiper를 초기화하거나 재설정하는 함수
    function initBannerSwiper() {
        // 기존 swiper가 있다면 제거
        if (bannerSwiper) {
            bannerSwiper.destroy(true, true);
        }

        bannerImageList.length = 0; // 기존 리스트 비우기

        // 현재 화면 크기에 맞는 이미지 파일명 리스트 재구성
        for (let i = 1; i <= 13; i++) {
            const num = String(i).padStart(2, '0');
            const imageName = isMobile ? `banner-main-mobile-${num}.png` : `banner-main-${num}.png`;
            bannerImageList.push(imageName);
        }

        // swiper-wrapper에 새로운 이미지 슬라이드 추가
        const bannerSwiperWrapper = document.querySelector('#banner-main .swiper-wrapper');
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
            .join('');

        // 배너 Swiper 초기화
        bannerSwiper = new Swiper('#banner-main .swiper', {
            slidesPerView: 1,
            loop: true,
            navigation: {
                prevEl: '.button-prev',
                nextEl: '.button-next',
            },
            pagination: {
                el: isMobile
                    ? '.banner__swiper-pagination .page-number'
                    : '.banner__swiper-pagination-desktop .page-number',
                type: 'custom',
                renderCustom: (swiper, current, total) => {
                    return isMobile ? `${current} / ${total}` : `${current}/${total}`;
                },
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });

        // resize 시 swiper 내부 상태 업데이트
        bannerSwiper.on('resize', () => {
            bannerSwiper.update();
        });
    }

    // 인테리어 피드 Swiper 초기화 함수
    function initInteriorFeedSwiper() {
        // 기존 인스턴스 제거
        if (interiorFeedSwiper) {
            interiorFeedSwiper.destroy(true, true);
        }

        // Swiper 이전/다음 버튼 요소 선택
        const prevBtn = document.querySelector('.feed-button-prev');
        const nextBtn = document.querySelector('.feed-button-next');

        const options = {
            slidesPerView: isMobile ? 2.5 : 4,
            slidesPerGroup: 4,
            navigation: {
                prevEl: '.feed-button-prev',
                nextEl: '.feed-button-next',
            },
            on: {
                init: function () {
                    updateNavButtons(this); // 초기 버튼 상태 설정
                },
                slideChange: function () {
                    updateNavButtons(this); // 슬라이드 변경 시 버튼 상태 업데이트
                },
            },
        };

        if (isMobile) {
            options.slidesOffsetAfter = 35;
        }

        interiorFeedSwiper = new Swiper('#interior-feed .swiper', options);

        // 버튼 상태 업데이트 함수
        function updateNavButtons(swiper) {
            // 맨 처음 슬라이드면 이전 버튼 숨김
            if (swiper.isBeginning) {
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = '';
            }

            // 맨 끝 슬라이드면 다음 버튼 숨김
            if (swiper.isEnd) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = '';
            }
        }
    }

    // 초기화 함수 실행 (최초 1회)
    initBannerSwiper();
    initInteriorFeedSwiper();

    // 창 크기 변경 감지 → 모바일 ↔ PC 구간 변경 시 swiper 재초기화
    window.addEventListener('resize', () => {
        const currentIsMobile = window.innerWidth < 768;

        // 모바일 여부가 바뀐 경우에만 재초기화
        if (currentIsMobile !== isMobile) {
            isMobile = currentIsMobile;
            initBannerSwiper(); // 배너 Swiper 재초기화
            initInteriorFeedSwiper(); // 인테리어 피드 Swiper도 재초기화
        }
    });

    // 북마크 버튼 클릭 시 아이콘 토글
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
