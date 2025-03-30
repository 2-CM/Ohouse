document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('footer__company-btn').addEventListener('click', function () {
        const icon = document.getElementById('footer__company-icon').querySelector('img');
        const companyInfo = document.querySelector('.footer__company-info');

        // footer__company-info의 클래스 토글 (열리고 닫히는 동작)
        companyInfo.classList.toggle('footer__company-info--active');

        // 아이콘 상태 변경 (열림/닫힘에 따라)
        if (companyInfo.classList.contains('footer__company-info--active')) {
            icon.src = '/src/assets/icons/icon-chevron-up.png'; // up 아이콘
        } else {
            icon.src = '/src/assets/icons/icon-chevron-down.png'; // down 아이콘
        }
    });
});