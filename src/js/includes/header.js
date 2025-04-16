document.addEventListener("DOMContentLoaded", () => {
    /*** 상수 및 요소 참조 ***/
    const HEADER_HEIGHT = 50.75; // #header__wrapper 높이
    const SUBNAV_HEIGHT = 40.75; // #subnav__container 높이

    const headerWrapper = document.getElementById("header__wrapper");
    const subnavContainer = document.getElementById("subnav__container");
    const appBanner = document.getElementById("appBanner");

    let lastScrollTop = 0;

    /*** 스크롤바 너비 계산 함수 ***/
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
    const scrollbarWidth = getScrollbarWidth();

    /*** 헤더 스타일 적용 함수 ***/
    function applyHeaderStyles() {
        const hasScrollbar = scrollbarWidth > 0;

        headerWrapper.style.width = window.innerWidth + "px";
        subnavContainer.style.width = window.innerWidth + "px";

        if (hasScrollbar) {
            headerWrapper.style.paddingRight = `${scrollbarWidth}px`;
            subnavContainer.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            headerWrapper.style.paddingRight = "0";
            subnavContainer.style.paddingRight = "0";
        }
    }

    /*** 스크롤 이벤트 핸들러 ***/
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const atTop = scrollTop <= 0;
        const shouldShowBanner = appBanner.dataset.shouldShow === "true";

        // 헤더 고정 클래스는 항상 유지
        headerWrapper.classList.add("fixed");
        subnavContainer.classList.add("fixed");

        if (scrollTop > lastScrollTop) {
            // 스크롤 내릴 때: 헤더 숨기기
            appBanner.style.display = "none";
            headerWrapper.style.top = `-${HEADER_HEIGHT}px`;
            subnavContainer.style.top = `-${SUBNAV_HEIGHT - 0.25}px`;
        } else {
            // 스크롤 올릴 때: 헤더 다시 표시
            if (atTop && shouldShowBanner) {
                appBanner.style.display = "flex";
                headerWrapper.style.top = `${appBanner.offsetHeight}px`;
                subnavContainer.style.top = `${appBanner.offsetHeight + HEADER_HEIGHT}px`;
            } else {
                appBanner.style.display = "none";
                headerWrapper.style.top = "0";
                subnavContainer.style.top = `${HEADER_HEIGHT}px`;
            }
        }

        applyHeaderStyles(); // 스크롤 시에도 스타일 유지
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // 초기 설정
    applyHeaderStyles();

    // 이벤트 바인딩
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", applyHeaderStyles);

    window.forceHeaderRecalculate = handleScroll;


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


    /*** 검색창 (mobile) ***/
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
    cancelBtn.addEventListener("click", function () {
        search.classList.remove("active");
        searchOverlay.classList.remove("active");
        document.body.style.overflow = ""; // 스크롤 허용
        document.body.style.paddingRight = ""; // 추가된 스크롤바 공간 제거
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


    /*** subnav__dropdown (mobile) ***/
    const dropdownOverlay = document.querySelector("#subnav__dropdown-overlay");
    const dropdown = document.querySelector("#subnav__dropdown-container");
    const dropdownButton = document.querySelector("#subnav__dropdown-btn");
    const closeButton = document.querySelector("#subnav__dropdown-close-btn");

    // 드롭다운 열기
    dropdownButton.addEventListener("click", () => {
        dropdownOverlay.classList.toggle("active");
        dropdown.classList.toggle("active");

        if (dropdown.classList.contains("active")) {
            document.body.style.overflow = "hidden"; // 스크롤 막기
        } else {
            document.body.style.overflow = ""; // 원래대로 복구
        }
    });

    // 드롭다운 닫기
    closeButton.addEventListener("click", () => {
        dropdown.classList.add("closing");
        // 드롭다운 영역을 닫을 때 애니메이션 효과가 끝난 후 클래스를 제거
        setTimeout(() => {
            dropdownOverlay.classList.remove("active");
            dropdown.classList.remove("active", "closing");
            document.body.style.overflow = ""; // 스크롤 허용
        }, 300);
    });

    dropdownOverlay.addEventListener("click", (event) => {
        dropdown.classList.add("closing");
        setTimeout(() => {
            dropdownOverlay.classList.remove("active");
            dropdown.classList.remove("active", "closing");
            document.body.style.overflow = ""; // 스크롤 허용
        }, 300);
    });
});