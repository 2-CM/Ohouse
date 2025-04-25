document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('footer__company-btn').addEventListener('click', function () {
        const footerIcon = document.querySelector('.footer__company-icon');
        const companyMobile = document.querySelector('.footer__company-details-mobile');

        // footer__company-info의 클래스 토글 (열리고 닫히는 동작)
        companyMobile.classList.toggle('footer__company-details-mobile--active');

        // 아이콘 상태 변경 (열림/닫힘에 따라)
        if (companyMobile.classList.contains('footer__company-details-mobile--active')) {
            footerIcon.classList.replace('_chevron_thick_down_12', '_chevron_thick_up_12');
        } else {
            footerIcon.classList.replace('_chevron_thick_up_12', '_chevron_thick_down_12');
        }
    });
});