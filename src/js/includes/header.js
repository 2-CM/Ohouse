document.addEventListener("DOMContentLoaded", () => {

    /*** 헤더 검색창 ***/
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

    /*** 헤더 검색창 - clear-btn ***/
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