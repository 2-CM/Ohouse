document.addEventListener('DOMContentLoaded', function () {

    const appModal = document.getElementById("appModal__overlay");
    const closeModalBtn = document.querySelector(".appModal__btn--secondary");
    const openAppBtns = document.querySelectorAll(".appModal__btn--primary, .appBanner__cta-btn");

    const appBanner = document.getElementById("appBanner");
    const closeBannerBtn = document.getElementById("appBanner__close-btn");

    function shouldShowAppModal() {
        const appModalClosed = localStorage.getItem("appModalClosed");
        return window.innerWidth < 767 && appModalClosed !== "true";
    }

    function shouldShowAppBanner() {
        const appModalClosed = localStorage.getItem("appModalClosed");
        const appBannerClosed = localStorage.getItem("appBannerClosed");
        return window.innerWidth < 767 && appModalClosed === "true" && appBannerClosed !== "true";
    }

    function handleAppModal() {
        const showModal = shouldShowAppModal();
        appModal.style.display = showModal ? "flex" : "none";

        // 모달이 열려있으면 배너는 무조건 숨기기
        if (showModal) {
            appBanner.style.display = "none";
        }
    }

    function handleAppBanner() {
        const show = shouldShowAppBanner();
        appBanner.dataset.shouldShow = show ? "true" : "false";
        appBanner.style.display = show ? "flex" : "none";
    }

    closeModalBtn.addEventListener("click", function () {
        appModal.style.display = "none";
        localStorage.setItem("appModalClosed", "true");
        handleAppBanner(); // 모달 닫은 후 배너 표시 여부 다시 확인
    });

    openAppBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "/"; // 앱 다운로드 페이지 링크
        });
    });

    closeBannerBtn.addEventListener("click", function () {
        appBanner.style.display = "none";
        localStorage.setItem("appBannerClosed", "true");
    });

    // 초기 숨김 처리로 깜빡임 방지
    appModal.style.display = "none";
    appBanner.style.display = "none";

    // 초기화
    handleAppModal();
    handleAppBanner();

    // 화면 크기 변경 시 다시 조건 확인
    window.addEventListener('resize', function () {
        handleAppModal();
        handleAppBanner();
    });
});
