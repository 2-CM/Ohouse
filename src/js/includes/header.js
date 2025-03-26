document.addEventListener("DOMContentLoaded", () => {

    /*** 네비게이션창 ***/
    const menuBtn = document.getElementById("header__menu-btn");
    const navOverlay = document.getElementById("navigation__overlay");
    const nav = document.getElementById("navigation__container");

    // 네비게이션창 열기
    menuBtn.addEventListener("click", function () {
        navOverlay.style.display = "block";
    });

    // 네비게이션창 닫기
    navOverlay.addEventListener("click", (event) => {
        // dropdown 영역 바깥을 클릭하면 닫힘
        if (!nav.contains(event.target)) {
            navOverlay.style.display = "none";
        }
    });

    // 초기 로드시 숨기기 (새로고침했을 때도 숨김 유지)
    navOverlay.style.display = "none";


    /*** 네비게이션창 -  navigation__btn ***/
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
                    sub.style.display = 'none';
                    sub.style.height = '0px';

                    // 아이콘 초기화
                    const iconReset = sub.previousElementSibling?.querySelector('.icon-chevron-up, .icon-chevron-down');
                    if (iconReset) {
                        iconReset.classList.remove('icon-chevron-up');
                        iconReset.classList.add('icon-chevron-down');
                        const img = iconReset.querySelector('img');
                        img.src = '/src/assets/icons/header/icon-chevron-down.png'; // down 이미지로 변경
                    }
                }
            });

            // 이미 열린 서브메뉴를 다시 클릭했는지 확인
            const isOpen = submenu.style.display === "block";

            // 만약 클릭한 버튼이 이미 열린 상태라면 닫기만 수행
            if (isOpen) {
                submenu.style.display = "none";
                submenu.style.height = "0px"; // 서브메뉴 닫기

                icon.classList.remove('icon-chevron-up');
                icon.classList.add('icon-chevron-down');
                const img = icon.querySelector('img');
                img.src = '/src/assets/icons/header/icon-chevron-down.png'; // down 이미지로 변경

                return; // 여기서 함수 종료 (새로 열지 않음)
            }

            // 클릭한 버튼의 서브메뉴를 열기
            submenu.style.display = "block";
            submenu.style.height = "auto"; // 서브메뉴 열기

            icon.classList.remove('icon-chevron-down');
            icon.classList.add('icon-chevron-up');
            const img = icon.querySelector('img');
            img.src = '/src/assets/icons/header/icon-chevron-up.png'; // up 이미지로 변경
        });
    });


    /*** 검색창 (mobile) ***/
    const searchBtn = document.getElementById("header__search-btn");
    const searchOverlay = document.getElementById("search__overlay");
    const cancelBtn = document.getElementById("search__cancel-btn");

    // 검색창 열기
    searchBtn.addEventListener("click", function () {
        searchOverlay.style.display = "block";
    });

    // 검색창 닫기
    cancelBtn.addEventListener("click", function () {
        searchOverlay.style.display = "none";
    });

    // 초기 로드시 숨기기 (새로고침했을 때도 숨김 유지)
    searchOverlay.style.display = "none";

    /*** 검색창 - clear-btn ***/
    const searchInput = document.getElementById("search__input");
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


    /*** 서브 네비게이션 드롭다운 ***/
    const dropdownOverlay = document.querySelector("#subnav__dropdown-overlay");
    const dropdown = document.querySelector("#subnav__dropdown-container");
    const dropdownButton = document.querySelector("#subnav__dropdown-btn");
    const closeButton = document.querySelector("#subnav__dropdown-close-btn");

    // 드롭다운 열기
    dropdownButton.addEventListener("click", () => {
        dropdownOverlay.style.display = "flex";
    });

    // 드롭다운 닫기
    closeButton.addEventListener("click", () => {
        dropdownOverlay.style.display = "none";
    });

    dropdownOverlay.addEventListener("click", (event) => {
        // dropdown 영역 바깥을 클릭하면 닫힘
        if (!dropdown.contains(event.target)) {
            dropdownOverlay.style.display = "none";
        }
    });

    dropdownOverlay.style.display = "none";
});