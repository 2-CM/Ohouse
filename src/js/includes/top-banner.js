document.addEventListener('DOMContentLoaded', () => {
    /*** 요소 참조 ***/
    const topBanner = document.querySelector("#top-banner");
    const closeTopBannerBtn = document.querySelector(".top-banner__close-button");

    /*** 상태 확인 함수 ***/
    const isTopBannerClosed = () => localStorage.getItem("topBannerClosed") === "true";

    /*** 초기화 ***/
    const initTopBanner = () => {
        if (!topBanner) return;
        if (isTopBannerClosed()) {
            topBanner.style.display = "none";
        } else {
            topBanner.style.display = ""; // CSS에 맡김
        }
    };

    /*** 이벤트 리스너 ***/
    closeTopBannerBtn?.addEventListener("click", () => {
        topBanner.style.display = "none";
        localStorage.setItem("topBannerClosed", "true");
    });

    initTopBanner();
});
