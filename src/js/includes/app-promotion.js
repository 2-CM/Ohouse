document.addEventListener('DOMContentLoaded', function () {

    /*** 앱 유도 모달 관련 처리 ***/
    const appModal = document.getElementById("appModal__overlay");
    const closeModalBtn = document.querySelector(".appModal__btn--secondary");
    const openAppBtns = document.querySelectorAll(".appModal__btn--primary, .appBanner__cta-btn");

    // 화면 너비가 767px 미만일 경우에만 모달 표시
    function handleAppModal() {
        const appModalClosed = localStorage.getItem("appModalClosed"); // 최신 localStorage 값 가져오기

        if (window.innerWidth < 767) {
            if (appModalClosed !== "true") {
                appModal.style.display = "flex";  // 모달 표시
            } else {
                appModal.style.display = "none";   // 이미 닫힌 경우 모달 숨기기
            }
        } else {
            appModal.style.display = "none"; // 화면 크기가 767px 이상일 때 모달 숨기기
        }
    }

    closeModalBtn.addEventListener("click", function () {
        appModal.style.display = "none";
        localStorage.setItem("appModalClosed", "true"); // localStorage에 "true" 저장
    });

    openAppBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            window.location.href = "/"; // 앱 다운로드 페이지
        });
    });

    /*** 앱 다운로드 상단 배너 관련 처리 ***/
    const appBanner = document.getElementById("appBanner");
    const closeBannerBtn = document.getElementById("appBanner__close-btn");

    function handleAppBanner() {
        const appModalClosed = localStorage.getItem("appModalClosed"); // 최신 값 가져오기

        if (window.innerWidth < 767) {
            if (localStorage.getItem("appBannerClosed") !== "true" && appModalClosed === "true") {
                appBanner.style.display = "flex"; // 배너 표시
            } else {
                appBanner.style.display = "none"; // 배너 숨기기
            }
        } else {
            appBanner.style.display = "none";
        }
    }

    closeModalBtn.addEventListener("click", function () {
        appBanner.style.display = "flex";
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
