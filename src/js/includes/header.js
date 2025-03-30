document.addEventListener("DOMContentLoaded", () => {

    /*** 스크롤시 헤더 고정 및 제거 ***/
    let lastScrollTop = 0; // 이전 스크롤 위치
    const HEADER_HEIGHT = 50.75; // #header__wrapper 높이
    const SUBNAV_HEIGHT = 40.75; // #subnav__container 높이
    const headerWrapper = document.getElementById("header__wrapper");
    const subnavContainer = document.getElementById("subnav__container");

    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // 스크롤 내릴 때: 헤더 숨기기
            headerWrapper.classList.add("fixed");
            subnavContainer.classList.add("fixed");
            headerWrapper.style.top = `-${HEADER_HEIGHT}px`;
            subnavContainer.style.top = `-${SUBNAV_HEIGHT - 0.25}px`;
            headerWrapper.style.width = window.innerWidth + "px";
            subnavContainer.style.width = window.innerWidth + "px";
        } else {
            // 스크롤 올릴 때: 헤더 표시
            headerWrapper.style.top = "0";
            subnavContainer.style.top = `${HEADER_HEIGHT}px`;
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 최상단에서 초기화
    });


    /*** 네비게이션창 ***/
    const menuBtn = document.getElementById("header__menu-btn");
    const navOverlay = document.getElementById("navigation__overlay");
    const nav = document.getElementById("navigation__container");

    // 네비게이션창 열기
    menuBtn.addEventListener("click", function () {
        nav.classList.toggle("active");
        navOverlay.classList.toggle("active");
    });

    // 네비게이션창 닫기
    navOverlay.addEventListener("click", (event) => {
        nav.classList.remove("active");
        navOverlay.classList.remove("active");
    });


    const buttons = document.querySelectorAll('.navigation__btn, .navigation__btn--active, .submenu-item__btn');
    const submenus = document.querySelectorAll('.navigation__submenu');

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // 이벤트 버블링 방지

            const submenu = this.nextElementSibling; // 버튼 바로 다음의 서브메뉴 div
            const icon = this.querySelector('.icon-chevron-up, .icon-chevron-down'); // 아이콘 span 태그

            // 현재 클릭된 버튼이 속한 최상위 부모 서브메뉴 찾기
            const parentMenu = this.closest('.navigation__submenu');

            // 같은 최상위 서브메뉴 내부의 다른 서브메뉴만 닫기
            document.querySelectorAll('.navigation__submenu').forEach(sub => {
                if (sub !== submenu && sub !== parentMenu) { // 클릭한 서브메뉴와 부모는 제외
                    sub.classList.remove('open'); // open 클래스 제거
                    const iconReset = sub.previousElementSibling?.querySelector('.icon-chevron-up, .icon-chevron-down');
                    if (iconReset) {
                        iconReset.classList.remove('icon-chevron-up');
                        iconReset.classList.add('icon-chevron-down');
                        const img = iconReset.querySelector('img');
                        img.src = '/src/assets/icons/icon-chevron-down.png'; // down 이미지로 변경
                    }
                }
            });

            // 이미 열린 서브메뉴를 다시 클릭했는지 확인
            const isOpen = submenu.classList.contains('open');

            // 만약 클릭한 버튼이 이미 열린 상태라면 닫기만 수행
            if (isOpen) {
                submenu.classList.remove('open'); // 서브메뉴 닫기
                icon.classList.remove('icon-chevron-up');
                icon.classList.add('icon-chevron-down');
                const img = icon.querySelector('img');
                img.src = '/src/assets/icons/icon-chevron-down.png'; // down 이미지로 변경
                return; // 여기서 함수 종료 (새로 열지 않음)
            }

            // 클릭한 버튼의 서브메뉴를 열기
            submenu.classList.add('open');
            icon.classList.remove('icon-chevron-down');
            icon.classList.add('icon-chevron-up');
            const img = icon.querySelector('img');
            img.src = '/src/assets/icons/icon-chevron-up.png'; // up 이미지로 변경
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
    });

    // 검색창 닫기
    cancelBtn.addEventListener("click", function () {
        search.classList.remove("active");
        searchOverlay.classList.remove("active");
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
    });

    // 드롭다운 닫기
    closeButton.addEventListener("click", () => {
        dropdown.classList.add("closing");
        // 드롭다운 영역을 닫을 때 애니메이션 효과가 끝난 후 클래스를 제거
        setTimeout(() => {
            dropdownOverlay.classList.remove("active");
            dropdown.classList.remove("active", "closing");
        }, 300);
    });

    dropdownOverlay.addEventListener("click", (event) => {
        dropdown.classList.add("closing");
        setTimeout(() => {
            dropdownOverlay.classList.remove("active");
            dropdown.classList.remove("active", "closing");
        }, 300);
    });
});