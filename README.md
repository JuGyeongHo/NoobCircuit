# NoobCircuit ⚡

초보자를 위한 웹 기반 회로 설계 및 실시간 분석 플랫폼입니다.  
**NoobCircuit**은 복잡하고 어려운 전문 EDA(Electronic Design Automation) 툴의 진입장벽을 낮추고, 초급 학습자와 전자회로 입문자가 쉽고 직관적으로 회로를 설계·분석·출력할 수 있도록 제작된 웹 기반 학습 플랫폼입니다.

본 프로젝트는 설치형 고사양 설계 프로그램 대신 웹 브라우저 기반 환경을 제공하며, 깔끔한 흑백 회로 이미지 출력과 실시간 기초 회로 분석 기능을 중심으로 설계되었습니다.

---

# 📌 프로젝트 목표

- 초보자도 쉽게 사용할 수 있는 회로 설계 환경 제공
- 복잡한 EDA Tool 없이 기초 회로 설계 및 분석 지원
- SVG 기반의 고품질 흑백 회로 이미지 출력
- 교육·과제·보고서·발표자료에 즉시 활용 가능한 회로도 생성
- 웹 기반 환경을 통한 높은 접근성과 확장성 제공

---

# 🎨 주요 특징 및 디자인 가이드라인

## ✅ Blueprint Light 테마
- 화이트 및 연회색 기반의 아카데믹 스타일 UI
- 깔끔한 흑백 회로도 출력 최적화
- 눈의 피로를 줄이는 고가독성 인터페이스

---

## ✅ SVG 기반 회로 캔버스
- 순수 SVG 기반 렌더링
- 16px Grid Snap 지원
- 드래그 앤 드롭 회로 배치
- Point-to-Point 배선 연결
- 직교(Orthogonal) 90도 배선 스타일 지원
- 확대 시 깨짐 없는 벡터 기반 회로도 출력

---

## ✅ 실시간 회로 분석 기능

### 지원 기능
- 직렬 저항 계산
- 병렬 저항 계산
- 옴의 법칙 기반 계산
- 전압/전류 계산
- 소비 전력 계산
- LED 보호 저항 추천
- 기본 회로 연결 검증

### 자동 오류 검출
- 미연결 단자 탐지
- 전원 누락 탐지
- GND 누락 탐지
- 회로 연결 오류 검출

---

# ✅ 초보자 친화적 기능

- 직관적인 드래그 앤 드롭 UI
- 회전 기능 지원
- 실시간 값 수정
- 기본 템플릿 제공
- 회로 저장 및 복원 기능

## 기본 템플릿 예시
- LED 점등 회로
- 직렬 저항 회로
- 병렬 저항 회로
- 전압 분배기
- RC 회로

---

# ✅ 고품질 이미지 출력

## 지원 형식
- SVG
- PNG
- JSON

## 특징
- 흰 배경 기반 출력
- 보고서 삽입 최적화
- 고해상도 이미지 저장
- SVG 벡터 기반 확대 지원

---

# 🛠️ 기술 스택

| 분야 | 사용 기술 |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| State Management | Context API + useReducer |
| Rendering | SVG |
| Styling | CSS |
| Storage | LocalStorage |
| Export | SVG / PNG / JSON |

---

# 🛠️ 개발 환경 및 실행 방법

본 프로젝트는 Node.js 기반 Vite 개발 환경에서 실행됩니다.

---

## 1. 패키지 설치

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다.

```bash
npm install
```

---

## 2. 개발 서버 실행

```bash
npm run dev
```

---

## 3. 브라우저 접속

터미널에 표시되는 URL로 접속합니다.

기본 주소:

```txt
http://localhost:5173
```

---

# 📂 프로젝트 구조

```txt
src/
├── components/
│   ├── Header.jsx
│   ├── Toolbar.jsx
│   ├── CircuitCanvas.jsx
│   ├── PropertiesPanel.jsx
│   ├── AnalysisPanel.jsx
│   ├── TemplatePanel.jsx
│   └── symbols/
│       └── ComponentSymbols.jsx
│
├── context/
│   └── CircuitContext.jsx
│
├── data/
│   ├── defaultComponents.js
│   └── circuitTemplates.js
│
├── utils/
│   └── circuitAnalysis.js
│
├── App.jsx
├── main.jsx
└── styles.css
```

---

# 📌 주요 컴포넌트 설명

| 파일 | 설명 |
|---|---|
| Header.jsx | 저장, 불러오기, 이미지 출력 |
| Toolbar.jsx | 전자 소자 추가 |
| CircuitCanvas.jsx | SVG 기반 회로 캔버스 |
| PropertiesPanel.jsx | 선택 소자 속성 수정 |
| AnalysisPanel.jsx | 실시간 회로 분석 |
| TemplatePanel.jsx | 기본 회로 템플릿 |
| ComponentSymbols.jsx | SVG 심볼 정의 |

---

# ⚡ 지원 전자 소자

- 저항 (Resistor)
- 커패시터 (Capacitor)
- 인덕터 (Inductor)
- 다이오드 (Diode)
- LED
- 전압원 (Voltage Source)
- 전류원 (Current Source)
- 스위치 (Switch)
- 접지 (GND)

---

# 📤 저장 및 내보내기 기능

## JSON 저장
현재 회로 상태를 JSON 형식으로 저장 및 복원할 수 있습니다.

## SVG 출력
- 벡터 기반 고해상도 회로도 출력
- 보고서 및 발표 자료 삽입 최적화

## PNG 출력
- 흰 배경 기반 PNG 이미지 저장
- 고해상도 출력 지원

---

# ⚠️ 유의 사항

- 본 플랫폼은 학습용 교육 툴킷입니다.
- SPICE 기반 고급 아날로그 해석은 지원하지 않습니다.
- PCB Artwork 및 Gerber 생성 기능은 포함되지 않습니다.
- 간단한 교육용 회로 설계와 분석에 초점을 맞추고 있습니다.

---

# 🚀 향후 개발 예정 기능

- 배선 자동 정렬(Auto Routing)
- 다중 선택 및 그룹 이동
- 다크 모드 지원
- 간단한 AC/DC 시뮬레이션
- 모바일 최적화
- 클라우드 저장 기능
- 회로 공유 기능

---

# 👨‍💻 개발 목적

NoobCircuit은 초보자들이 회로 설계에 쉽게 접근할 수 있도록 하기 위해 제작되었습니다.

복잡한 전문 회로 설계 툴 대신,
직관적이고 빠른 학습 환경을 제공하여:

- 회로 설계 교육
- 전자회로 학습
- 과제 제작
- 발표자료 제작
- 보고서 작성

등에 활용될 수 있도록 설계되었습니다.

---

# 📄 License

MIT License

---

# ⚡ NoobCircuit

> Beginner Friendly Circuit Design Platform