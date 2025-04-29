document.addEventListener('DOMContentLoaded', () => {
    /*** 요소 참조 ***/
    const topBanner = document.querySelector("#top-banner");
    const closeTopBannerBtn = document.querySelector(".top-banner__close-button");

    /*** 상태 확인 함수 ***/
    const isTopBannerClosed = () => localStorage.getItem("topBannerClosed") === "true";

    /*** 표시 제어 함수 ***/
    const toggleTopBanner = (show) => {
        if (!topBanner) return;
        topBanner.style.display = show ? "block" : "none";
    };

    /*** 초기화 ***/
    const initTopBanner = () => {
        const shouldShow = !isTopBannerClosed();
        toggleTopBanner(shouldShow);
    };

    /*** 이벤트 리스너 ***/
    closeTopBannerBtn?.addEventListener("click", () => {
        toggleTopBanner(false);
        localStorage.setItem("topBannerClosed", "true");
    });

    initTopBanner();
});
