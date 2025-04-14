document.addEventListener('DOMContentLoaded', () => {
    /*** 요소 참조 ***/
    const appModal = document.getElementById("appModal__overlay");
    const closeModalBtn = document.querySelector(".appModal__btn--secondary");
    const openAppBtns = document.querySelectorAll(".appModal__btn--primary, .appBanner__cta-btn");

    const appBanner = document.getElementById("appBanner");
    const closeBannerBtn = document.getElementById("appBanner__close-btn");

    /*** 상태 확인 함수 ***/
    const isMobile = () => window.innerWidth < 767;
    const isAppModalClosed = () => localStorage.getItem("appModalClosed") === "true";
    const isAppBannerClosed = () => localStorage.getItem("appBannerClosed") === "true";

    const shouldShowAppModal = () => isMobile() && !isAppModalClosed();
    const shouldShowAppBanner = () => isMobile() && isAppModalClosed() && !isAppBannerClosed();

    /*** 표시 제어 함수 ***/
    const toggleDisplay = (el, show) => {
        el.style.display = show ? "flex" : "none";
    };

    const handleAppModal = () => {
        const show = shouldShowAppModal();
        toggleDisplay(appModal, show);

        if (show) toggleDisplay(appBanner, false); // 모달이 열리면 배너는 숨김
    };

    const handleAppBanner = () => {
        const show = shouldShowAppBanner();
        appBanner.dataset.shouldShow = show ? "true" : "false";
        toggleDisplay(appBanner, show);
    };

    /*** 이벤트 리스너 ***/
    closeModalBtn.addEventListener("click", () => {
        toggleDisplay(appModal, false);
        localStorage.setItem("appModalClosed", "true");
        handleAppBanner(); // 모달 닫은 후 배너 다시 확인
        window.forceHeaderRecalculate?.(); // 헤더 위치 재조정
    });

    openAppBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "/"; // 앱 다운로드 페이지 링크
        });
    });

    closeBannerBtn.addEventListener("click", () => {
        toggleDisplay(appBanner, false);
        localStorage.setItem("appBannerClosed", "true");
        window.forceHeaderRecalculate?.(); // 헤더 위치 재조정
    });

    /*** 초기 숨김 처리로 깜빡임 방지 ***/
    toggleDisplay(appModal, false);
    toggleDisplay(appBanner, false);

    /*** 초기화 및 반응형 대응 ***/
    handleAppModal();
    handleAppBanner();

    window.addEventListener("resize", () => {
        handleAppModal();
        handleAppBanner();
        window.forceHeaderRecalculate?.(); // 리사이즈 시에도 헤더 위치 보정
    });
});
