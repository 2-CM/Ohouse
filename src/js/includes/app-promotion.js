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
        appModal.style.display = shouldShowAppModal() ? "flex" : "none";
    }

    function handleAppBanner() {
        // 최상단이 아닌 경우는 header.js에서 관리하므로 여기선 표시 여부만 설정
        const show = shouldShowAppBanner();
        appBanner.dataset.shouldShow = show ? "true" : "false"; // header.js에서 참조할 수 있게 설정
    }

    closeModalBtn.addEventListener("click", function () {
        appModal.style.display = "none";
        localStorage.setItem("appModalClosed", "true");

        // 모달 닫은 후 배너 조건 확인
        handleAppBanner();
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

    // 화면 크기 변경 시 모달과 배너 처리 함수 실행
    window.addEventListener('resize', function () {
        handleAppModal();
        handleAppBanner();
    });

    // 초기 상태 처리 (페이지가 로드될 때)
    handleAppModal();
    handleAppBanner();
});