document.addEventListener("DOMContentLoaded", () => {
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
});