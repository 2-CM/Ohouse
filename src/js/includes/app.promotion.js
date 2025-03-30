document.addEventListener('DOMContentLoaded', function () {

    /*** 앱 유도 모달 관련 처리 ***/
    // localStorage에서 값 가져오기
    const appModalClosed = localStorage.getItem("appModalClosed");

    // 모달 DOM 요소
    const appModal = document.getElementById("appModal__overlay");
    const closeModalBtn = document.querySelector(".appModal__btn--secondary");
    const openAppBtns = document.querySelectorAll(".appModal__btn--primary, .appBanner__cta-btn"); // 여러 개의 버튼 선택

    // localStorage에 값이 없거나 "false"일 경우에만 모달이 보이도록 설정
    if (appModalClosed !== "true") {
        appModal.style.display = "flex";  // 모달 표시
    } else {
        appModal.style.display = "none";   // 이미 닫힌 경우 모달 숨기기
    }

    // "모바일 웹으로 보기" 버튼 클릭 시 모달 닫기 및 localStorage에 상태 저장
    closeModalBtn.addEventListener("click", function () {
        appModal.style.display = "none"; // 모달 숨기기
        localStorage.setItem("appModalClosed", "true"); // localStorage에 "true" 저장
    });

    // "편리한 앱으로 보기", "앱으로 보기" 버튼 클릭 시 앱 다운로드 페이지로 이동
    openAppBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            window.location.href = "/"; // 앱 다운로드 페이지
        });
    });
});
