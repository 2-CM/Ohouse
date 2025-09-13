# Ohouse
<img src="https://oopy.lazyrockets.com/api/rest/cdn/image/af74748c-9c69-4dc5-835e-655a5f800764.png" width=100% height=400 />  

### 오늘의 집(Ohouse) 사이트를 클론코딩한 팀 프로젝트.

>프로젝트 기간 : 2025.03.11 ~ 2025.05.21

>URL : https://2cm-ohouse.netlify.app/

## 🎯 구현 목표
- HTML/CSS/JS 숙련도 향상
- Media Query를 활용한 반응형 페이지 제작

## ⚒️ Skill
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" />

## 📑 페이지 구조
![0913204735195424](https://github.com/user-attachments/assets/0b569f59-f74e-4d3d-845d-eaef338e48e4)

## 🗂️ 파일 구조
```html
project-root/
├── src/
│   ├── assets/          # 이미지, 아이콘 등
│   │   ├── fonts
│   │   ├── icons/
│   │   └── images/
│   ├── css/
│   │   ├── common/
│   │   │   ├── reset.css       # css 초기화
│   │   │   ├── font.css       # 폰트
│   │   │   └── theme.css      # 색상 및 사이즈(공통 스타일 모음)
│   │   ├── includes/        # 공통적인 CSS 모음 (재사용 O)
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── top-banner.css
│   │   │   └── app-promotion.css
│   │   ├── pages/       # 개별 페이지 CSS 모음
│   │   │   ├── community/
│   │   │   │   └── home.css
│   │   └── main.css    # 메인 CSS 파일
│   ├── includes/        # 공통적인 HTML 모음 (재사용 O)
│   │   ├── header.html
│   │   └── footer.html
│   ├── js/
│   │   ├── includes/        # 레이아웃 관련 JS
│   │   │   ├── header.js
│   │   │   ├── footer.js
│   │   │   ├── top-banner.js
│   │   │   └── app-promotion.js
│   │   ├── pages/          # 개별 페이지 JS 모음
│   │   │   ├── community/
│   │   │   │   └── home.js
│   │   └── main.js
│   ├── pages/           # 개별 페이지 HTML 모음
│   │   ├── community/
│   └── └── └── home.html
├── .gitignore
├── index.html       # 메인 페이지
└── README.md
```

## 📱 반응형 브레이크포인트
- Mobile: `max-width: 767px`
- Tablet: `min-width: 768px` and `max-width: 1023px`
- Desktop (Small): `min-width: 1024px`
- Desktop (Large): `min-width: 1256px`

## 👫 Contributors
||이름|담당|
|:---:|:---:|:---:|
|![image](https://avatars.githubusercontent.com/u/151013932?s=64&v=4)|[정윤진](https://github.com/maruru301)|banner, quick-menu, interior-feed, interior-collections|
|![image](https://avatars.githubusercontent.com/u/151013952?s=64&v=4)|[최아로인](https://github.com/bboroin)|top-banner, header, nav, footer, app-promotion|

## 🚀 프로젝트 사용법
저장소 클론하기
```
git clone https://github.com/2-CM/Ohouse.git
```
