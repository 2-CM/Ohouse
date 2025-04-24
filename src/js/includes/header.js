document.addEventListener("DOMContentLoaded", () => {
    // DOM 요소 가져오기
    const headerWrapper = document.getElementById("header__wrapper");
    const subnavContainer = document.getElementById("subnav__container");
    const appBanner = document.getElementById("appBanner");

    let lastScrollTop = 0; // 이전 스크롤 위치 저장용

    // 스크롤바 너비 계산 함수
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
    const scrollbarWidth = getScrollbarWidth();

    // 헤더와 서브네비의 width, padding-right 설정
    function applyHeaderStyles() {
        const hasScrollbar = scrollbarWidth > 0;
        const width = window.innerWidth + "px";

        headerWrapper.style.width = width;
        subnavContainer.style.width = width;

        const paddingRight = hasScrollbar ? `${scrollbarWidth}px` : "0";
        headerWrapper.style.paddingRight = paddingRight;
        subnavContainer.style.paddingRight = paddingRight;
    }

    // 화면 너비에 따라 sticky__container의 높이 설정
    function updateContainerHeights() {
        const stickyContainers = document.querySelectorAll(".sticky__container");

        if (window.innerWidth < 768) {
            // 모바일 높이
            if (stickyContainers[0]) stickyContainers[0].style.height = "50.75px"; // 헤더
            if (stickyContainers[1]) stickyContainers[1].style.height = "40.75px"; // 서브네비
        } else {
            // PC 높이
            if (stickyContainers[0]) stickyContainers[0].style.height = "80.75px";
            if (stickyContainers[1]) stickyContainers[1].style.height = "51.75px";
        }
    }

    // 스크롤 이벤트 핸들러
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isMobile = window.innerWidth < 768;
        const atTop = scrollTop <= 0;
        const shouldShowBanner = appBanner.dataset.shouldShow === "true";

        if (isMobile) {
            // 모바일: 헤더 + 서브네비 모두 fixed
            headerWrapper.classList.add("fixed");
            subnavContainer.classList.add("fixed");

            if (scrollTop > lastScrollTop) {
                // 아래로 스크롤 시: 헤더/서브네비 숨김
                appBanner.style.display = "none";
                headerWrapper.style.top = "-50.75px";
                subnavContainer.style.top = "-40.75px";
            } else {
                // 위로 스크롤 시
                if (atTop && shouldShowBanner) {
                    // 맨 위 + 배너 보여야 하면: 배너 표시
                    appBanner.style.display = "flex";
                    headerWrapper.style.top = `${appBanner.offsetHeight}px`;
                    subnavContainer.style.top = `${appBanner.offsetHeight + 50.75}px`;
                } else {
                    // 일반적인 위로 스크롤
                    appBanner.style.display = "none";
                    headerWrapper.style.top = "0";
                    subnavContainer.style.top = "50.75px";
                }
            }
        } else {
            // PC: 헤더는 고정, 서브네비만 움직임
            headerWrapper.classList.add("fixed");
            subnavContainer.classList.add("fixed");

            headerWrapper.style.top = "0";

            if (scrollTop > lastScrollTop) {
                // 아래로 스크롤: 서브네비 살짝 위로
                subnavContainer.style.top = "29px";
            } else {
                // 위로 스크롤: 서브네비 원위치
                subnavContainer.style.top = "80.75px";
            }
        }

        applyHeaderStyles();      // width, padding-right 적용
        updateContainerHeights(); // 높이 갱신
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 스크롤 위치 저장
    }

    // 초기 실행
    applyHeaderStyles();
    updateContainerHeights();

    // 이벤트 등록
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
        applyHeaderStyles();       // 리사이즈 시 width 조정
        updateContainerHeights();  // 높이 다시 계산
        handleScroll();            // 스크롤 위치에 맞게 동작 반영
    });


    /*** 네비게이션창 ***/
    const menuBtn = document.getElementById("header__menu-btn");
    const navOverlay = document.getElementById("navigation__overlay");
    const nav = document.getElementById("navigation__container");

    // 네비게이션창 열기
    menuBtn.addEventListener("click", function () {
        nav.classList.toggle("active");
        navOverlay.classList.toggle("active");

        if (nav.classList.contains("active")) {
            document.body.style.overflow = "hidden"; // 스크롤 막기
            document.body.style.paddingRight = `${scrollbarWidth}px`; // 스크롤바 공간 유지
        } else {
            document.body.style.overflow = ""; // 스크롤 허용
            document.body.style.paddingRight = ""; // 추가된 스크롤바 공간 제거
        }
    });

    // 네비게이션창 닫기
    navOverlay.addEventListener("click", (event) => {
        nav.classList.remove("active");
        navOverlay.classList.remove("active");

        document.body.style.overflow = ""; // 스크롤 허용
        document.body.style.paddingRight = ""; // 추가된 스크롤바 공간 제거
    });


    const buttons = document.querySelectorAll('.navigation__btn, .navigation__btn--active, .submenu-item__btn');

    // 초기 상태 설정
    buttons.forEach(button => {
        const icon = button.querySelector('.icon-chevron');
        if (icon?.classList.contains('_chevron_thick_up_12')) {
            const submenu = button.nextElementSibling;
            if (submenu) {
                submenu.classList.add('open'); // 기본적으로 펼쳐진 상태로 설정
            }
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // 이벤트 버블링 방지

            const submenu = this.nextElementSibling; // 버튼 바로 다음의 서브메뉴 div
            const icon = this.querySelector('.icon-chevron'); // 아이콘 span 태그

            // 현재 클릭된 버튼이 속한 최상위 부모 서브메뉴 찾기
            const parentMenu = this.closest('.navigation__submenu');

            // 같은 최상위 서브메뉴 내부의 다른 서브메뉴만 닫기
            document.querySelectorAll('.navigation__submenu').forEach(sub => {
                if (sub !== submenu && sub !== parentMenu) { // 클릭한 서브메뉴와 부모는 제외
                    sub.classList.remove('open'); // open 클래스 제거
                    const iconReset = sub.previousElementSibling?.querySelector('.icon-chevron');
                    if (iconReset) {
                        iconReset.classList.remove('_chevron_thick_up_12');
                        iconReset.classList.add('_chevron_thick_down_12');
                    }
                }
            });

            // 현재 상태 확인
            const isOpen = submenu.classList.contains('open');

            // 만약 클릭한 버튼이 이미 열린 상태라면 닫기만 수행
            if (isOpen) {
                submenu.classList.remove('open'); // 서브메뉴 닫기
                icon.classList.remove('_chevron_thick_up_12');
                icon.classList.add('_chevron_thick_down_12');
                return; // 여기서 함수 종료 (새로 열지 않음)
            }

            // 클릭한 버튼의 서브메뉴를 열기
            submenu.classList.add('open');
            icon.classList.remove('_chevron_thick_down_12');
            icon.classList.add('_chevron_thick_up_12');
        });
    });


    /*** 검색창 (mobile, web-768) ***/
    const searchBtn = document.getElementById("header__search-btn");
    const searchOverlay = document.getElementById("search__overlay");
    const search = document.getElementById("search__container");
    const cancelBtn = document.getElementById("search__cancel-btn");
    const searchInput = document.getElementById("search__input");

    // 검색창 열기
    searchBtn.addEventListener("click", function () {
        search.classList.toggle("active");
        searchOverlay.classList.toggle("active");
        document.body.style.overflow = "hidden"; // 스크롤 막기
        document.body.style.paddingRight = `${scrollbarWidth}px`; // 스크롤바 공간 유지
    });

    // 검색창 닫기
    function closeSearch() {
        search.classList.remove("active");
        searchOverlay.classList.remove("active");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
    }

    cancelBtn.addEventListener("click", closeSearch);
    searchOverlay.addEventListener("click", function () {
        if (window.innerWidth >= 768) {
            closeSearch();
        }
    });

    // 검색창 열리는 애니메이션이 끝난 후 포커스를 주기
    search.addEventListener("transitionend", () => {
        if (search.classList.contains("active")) {
            searchInput.focus();
        }
    });


    /*** 검색창 - clear-btn ***/
    const clearButton = document.getElementById("search__clear-btn");

    // 입력값 변경 시 버튼 표시 여부 조절
    searchInput.addEventListener("input", function () {
        if (searchInput.value.trim() !== "") {
            clearButton.style.display = "block";
        } else {
            clearButton.style.display = "none";
        }
    });

    // 버튼 클릭 시 입력값 초기화
    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        clearButton.style.display = "none";
    });

    clearButton.style.display = "none";


    /*** subnav__list ***/
    const subnav = document.querySelector('.subnav__list');

    function updateSubnavClass() {
        if (window.innerWidth >= 768) {
            subnav.classList.remove('subnav__list--mobile');
            subnav.classList.add('subnav__list--web');
        } else {
            subnav.classList.remove('subnav__list--web');
            subnav.classList.add('subnav__list--mobile');
        }
    }

    updateSubnavClass();
    window.addEventListener('resize', updateSubnavClass);


    /*** subnav__modal (mobile) ***/
    /*** header-dropdown (subnav, write) ***/
    // 요소 선택
    const modalOverlay = document.querySelector("#subnav__modal-overlay");
    const subnavModal = document.querySelector("#subnav__modal-container");
    const subnavModalBtn = document.querySelector("#subnav__modal-btn");
    const subnavModalCloseBtn = document.querySelector("#subnav__modal-close-btn");
    const subnavDropdown = document.querySelector(".subnav-dropdown");

    const writeButton = document.querySelector(".header__write-btn");
    const writeDropdown = document.querySelector(".write-dropdown");

    // 공통 드롭다운 토글 함수
    function toggleDropdown(dropdownElement, buttonElement, baseX = 0, baseY = 0, scrollbarWidth = 0) {
        const isOpen = dropdownElement.classList.contains("open");

        // 다른 드롭다운 닫기
        document.querySelectorAll(".header-dropdown.open").forEach((el) => {
            if (el !== dropdownElement) {
                el.classList.remove("open", "open-active");
            }
        });

        if (isOpen) {
            dropdownElement.classList.remove("open", "open-active");
        } else {
            // 위치 조정이 필요한 경우만 적용
            if (baseX && baseY) {
                const adjustedX = baseX - scrollbarWidth;
                dropdownElement.style.transform = `translate3d(${adjustedX}px, ${baseY}px, 0px)`;
            }

            dropdownElement.classList.add("open");
            setTimeout(() => dropdownElement.classList.add("open-active"), 10);
        }
    }

    // 모바일: subnav 모달 열기 / PC: subnav 드롭다운 토글
    subnavModalBtn.addEventListener("click", (e) => {
        if (window.innerWidth < 768) {
            modalOverlay.classList.toggle("active");
            subnavModal.classList.toggle("active");
            document.body.style.overflow = subnavModal.classList.contains("active") ? "hidden" : "";
        } else {
            e.stopPropagation();
            toggleDropdown(subnavDropdown, subnavModalBtn, 370.5, 61, scrollbarWidth);
        }
    });

    // 모바일: 모달 닫기 (닫기 버튼)
    subnavModalCloseBtn.addEventListener("click", () => {
        if (window.innerWidth < 768) {
            subnavModal.classList.add("closing");
            setTimeout(() => {
                modalOverlay.classList.remove("active");
                subnavModal.classList.remove("active", "closing");
                document.body.style.overflow = "";
            }, 300);
        }
    });

    // 모바일: 오버레이 클릭 시 모달 닫기
    modalOverlay.addEventListener("click", () => {
        if (window.innerWidth < 768) {
            subnavModal.classList.add("closing");
            setTimeout(() => {
                modalOverlay.classList.remove("active");
                subnavModal.classList.remove("active", "closing");
                document.body.style.overflow = "";
            }, 300);
        }
    });

    // PC: write 드롭다운 토글
    writeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown(writeDropdown, writeButton, 442, 70, scrollbarWidth);
    });

    // 공통 닫기 처리: 바깥 클릭 시 모든 드롭다운 닫기
    document.addEventListener("click", (e) => {
        document.querySelectorAll(".header-dropdown.open").forEach((dropdown) => {
            const relatedButton = dropdown.previousElementSibling;
            if (
                !dropdown.contains(e.target) &&
                !relatedButton.contains(e.target)
            ) {
                dropdown.classList.remove("open", "open-active");
            }
        });
    });

    window.addEventListener("resize", () => {
        const isMobile = window.innerWidth < 768;

        if (!isMobile) {
            const wasModalOpen = subnavModal.classList.contains("active");

            // 모바일 모달 닫기
            modalOverlay.classList.remove("active");
            subnavModal.classList.remove("active", "closing");
            document.body.style.overflow = "";

            // 모달이 열려 있었다면 → 드롭다운 자동으로 열기
            if (wasModalOpen) {
                toggleDropdown(subnavDropdown, subnavModalBtn);
            }
        } else {
            const wasDropdownOpen = subnavDropdown.classList.contains("open");

            // 드롭다운 닫고 → 모달 자동으로 열기
            if (wasDropdownOpen) {
                subnavDropdown.classList.remove("open", "open-active");

                modalOverlay.classList.add("active");
                subnavModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        }
    });


    /*** realtime-keyword ***/
    const keywords = [
        { rank: 1, text: "이불 세트", href: "/", change: "up" },
        { rank: 2, text: "커튼", href: "/", change: "up" },
        { rank: 3, text: "침대 프레임", href: "/", change: "new" },
        { rank: 4, text: "러그", href: "/", change: "up" },
        { rank: 5, text: "수납장", href: "/", change: "new" },
        { rank: 6, text: "의자", href: "/", change: "up" },
        { rank: 7, text: "식탁", href: "/", change: "new" },
        { rank: 8, text: "화장대", href: "/", change: "up" },
        { rank: 9, text: "스탠드", href: "/", change: "new" },
        { rank: 10, text: "수건", href: "/", change: "new" },
    ];

    const itemContainer = document.querySelector('#realtime-keyword__item');
    let currentIndex = 0;

    function getKeywordHTML(keyword) {
        let icon = "";
        switch (keyword.change) {
            case "up":
                icon = `
              <span class="realtime-keyword__icon--up">
                <span class="higher icon--up__wrapper">
                  <span class="_dropdown_24 icon--up"></span>
                </span>
              </span>
            `;
                break;
            case "new":
                icon = `
              <span class="realtime-keyword__icon-new">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path fill="currentColor" d="M4.186 15v-3.93h.037L6.994 15h1.027V9H6.834v3.909h-.033L4.035 9H3v6zM12.794 13.96H10.11v-1.513h2.533v-.965H10.11v-1.447h2.684V9H8.87v6h3.924zM17.096 10.9h.037l1.125 4.1h1.17L21 9h-1.285l-.936 4.345h-.033L17.638 9H16.59l-1.108 4.345h-.033L14.518 9h-1.285l1.568 6h1.17z"></path>
                </svg>
              </span>
            `;
                break;
        }

        return `
          <div class="realtime-keyword__row">
            <a href="${keyword.href}" class="realtime-keyword__link">
              <div class="realtime-keyword__info">
                <span class="realtime-keyword__rank">${keyword.rank}</span>
                <span class="realtime-keyword__icon">${icon}</span>
                <span class="realtime-keyword__text">${keyword.text}</span>
              </div>
            </a>
          </div>
        `;
    }

    function updateKeyword() {
        // 기존 검색어 항목을 애니메이션 후에 제거
        const currentItem = itemContainer.querySelector('.realtime-keyword__row');
        if (currentItem) {
            currentItem.classList.add('exit');
            setTimeout(() => {
                currentItem.remove(); // exit 애니메이션 후에 DOM에서 제거
            }, 200); // exit 애니메이션 시간 후에 DOM에서 제거
        }

        // 새로운 검색어 추가
        const newKeywordHTML = getKeywordHTML(keywords[currentIndex]);
        itemContainer.insertAdjacentHTML('beforeend', newKeywordHTML);

        const newItem = itemContainer.querySelector('.realtime-keyword__row:last-child');
        newItem.classList.add('slideIn'); // 새 항목에 slideIn 애니메이션 추가

        currentIndex = (currentIndex + 1) % keywords.length; // 인덱스 순환
    }

    // 최초 실행 + 주기적 갱신
    updateKeyword();
    setInterval(updateKeyword, 2500);

});