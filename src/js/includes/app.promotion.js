document.addEventListener('DOMContentLoaded', function () {

    /*** 앱 유도 모달 관련 처리 ***/
    const appModalClosed = localStorage.getItem("appModalClosed");

    const appModal = document.getElementById("appModal__overlay");
    const closeModalBtn = document.querySelector(".appModal__btn--secondary");
    const openAppBtns = document.querySelectorAll(".appModal__btn--primary, .appBanner__cta-btn"); // 여러 개의 버튼 선택

    // 화면 너비가 767px 미만일 경우에만 모달 표시
    function handleAppModal() {
        if (window.innerWidth < 767) {  // 화면 크기가 767px 미만일 때만 모달 표시
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
        appModal.style.display = "none"; // 모달 숨기기
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

    // 화면 너비가 766px 이하일 경우에만 배너 처리
    function handleAppBanner() {
        if (window.innerWidth <= 766) {
            // localStorage에서 배너 닫힘 상태 확인
            if (localStorage.getItem("appBannerClosed") !== "true" && appModalClosed === "true") {
                appBanner.style.display = "flex"; // 배너 표시
            } else {
                appBanner.style.display = "none"; // 배너 숨기기
            }

            // "모바일 웹으로 보기" 클릭 시 배너를 보이도록 처리
            closeModalBtn.addEventListener("click", function () {
                appBanner.style.display = "flex"; // 모바일 웹으로 보기 클릭 시 배너 표시
            });

            // 배너의 "닫기" 버튼 클릭 시
            closeBannerBtn.addEventListener("click", function () {
                appBanner.style.display = "none"; // 배너 숨기기
                localStorage.setItem("appBannerClosed", "true"); // 배너 닫힘 상태 저장
            });
        } else {
            // 화면 크기가 767px 이상일 때는 배너를 숨김
            appBanner.style.display = "none";
        }
    }

    // 페이지 리프레시 시 배너가 닫히지 않도록 처리 (localStorage 사용)
    if (localStorage.getItem("appBannerClosed") === "true") {
        appBanner.style.display = "none"; // "닫기" 버튼을 눌러 배너가 닫혔으면 표시 안 함
    }

    // 화면 크기 변경 시 모달과 배너 처리 함수 실행
    window.addEventListener('resize', function () {
        handleAppModal();  // 화면 크기 변경 시 모달 처리
        handleAppBanner(); // 화면 크기 변경 시 배너 처리
    });

    // 초기 상태 처리 (페이지가 로드될 때)
    handleAppModal();
    handleAppBanner();
});
