# NoobCircuit ⚡

초보자를 위한 웹 기반 회로 설계 및 실시간 분석 플랫폼입니다.  
**NoobCircuit**은 복잡하고 어려운 전문 EDA(Electronic Design Automation)의 진입장벽을 낮춰 학구적이고 직관적인 환경(Blueprint Light 테마)에서 기초 전자 회로를 손쉽게 실습할 수 있도록 도와줍니다.

---

## 🎨 주요 특징 및 디자인 가이드라인

- **Blueprint Light 테마 적용**: `design/DESIGN.md` 및 `screen.png`에 입각한 화이트/연회색 계열의 세련되고 눈이 편안한 아카데믹 스타일링.
- **순수 SVG 기반 캔버스**: 16px 그리드 스냅 지원, 마우스 드래그 앤 드롭 이동, 직관적인 포인트 투 포인트(2회 클릭) 와이어 연결 및 오쏘고날(90도) 배선 스타일.
- **실시간 기초 회로 분석**:
  - 합성 저항 자동 계산 (직렬/병렬)
  - 옴의 법칙 (V = I * R) 계산 및 개별 소자 소비 전력 도출
  - LED 구동 시 적절한 직렬 보호저항 추천 (최소 220Ω 안전성 검증)
  - 미연결 단자, 전원 및 접지(GND) 누락 검출 경고
- **초보자 전용 템플릿**: LED 점등, 전압 분배기, 직렬 저항, 병렬 저항, RC 회로 등 원클릭 로드 지원.
- **내보내기 및 복구**:
  - 현재 설계를 JSON 파일로 다운로드 및 업로드(복원)
  - 보고서 및 발표 자료에 즉시 사용할 수 있는 고해상도 백색 배경 **SVG 및 PNG 이미지 추출**
  - 페이지 새로고침 시 자동 복원을 위한 브라우저 Local Storage 연동.

---

## 🛠️ 개발 환경 및 실행 방법

이 프로젝트는 **Vite + React** 환경에서 동작합니다. Node.js 패키지 매니저(`npm`)를 통해 간편하게 로컬 서버를 가동할 수 있습니다.

### 1. 패키지 설치
터미널을 열고 프로젝트 루트 경로에서 다음 명령을 실행합니다.
```bash
npm install
```

### 2. 로컬 개발 서버 실행
설치가 완료되면 개발 서버를 띄웁니다.
```bash
npm run dev
```

### 3. 브라우저 접속
서버 가동 후 터미널에 표시되는 URL(기본: `http://localhost:5173`)을 통해 브라우저에서 회로 설계를 즉시 시작할 수 있습니다.

---

## 📂 파일 구조 설명

```
src/
  ├── components/
  │    ├── Header.jsx           # 상단 헤더 (새 회로, 저장, 이미지 출력 등 핵심 액션)
  │    ├── Toolbar.jsx          # 좌측 컴포넌트 추가 영역 (소자 팰릿 & 템플릿 로더)
  │    ├── CircuitCanvas.jsx    # 중앙 회로 영역 (SVG 기반 캔버스 및 인터랙션)
  │    ├── PropertiesPanel.jsx  # 우측 속성 영역 (선택 소자 이름/값/단위/회전 조절)
  │    ├── AnalysisPanel.jsx    # 하단 분석 결과 패널 (실시간 옴의 법칙 및 에러 검출)
  │    ├── TemplatePanel.jsx    # 초보자 교육용 프리셋 회로 로더
  │    └── symbols/
  │         └── ComponentSymbols.jsx # 각 전자 소자별 SVG 드로잉 심볼
  ├── context/
  │    └── CircuitContext.jsx   # Context API + useReducer를 활용한 회로 상태 및 저장소
  ├── data/
  │    ├── defaultComponents.js # 각 소자 초기 속성 및 단자 위치 데이터
  │    └── circuitTemplates.js  # 사전 정의된 프리셋 회로 데이터
  ├── utils/
  │    └── circuitAnalysis.js   # 실시간 저항 합성, 옴의법칙 및 에러 검증 비즈니스 로직
  ├── App.jsx                   # 전체 레이아웃 3단 프레임 워크 어셈블리
  ├── main.jsx                  # React 진입점
  └── styles.css                # Blueprint Light 테마 및 컴포넌트별 고밀도 스타일 시트
```

---

## ⚠️ 유의 사항
- 본 플랫폼은 학습용 교육 툴킷으로서 고난도 SPICE 아날로그 과도 해석(Transient)이나 PCB 레이아웃(Artwork) 설계는 지원하지 않습니다.
- 흑백 테마 기반의 선명한 회로 심볼로 디자인되어 인쇄 및 보고서 삽입용에 탁월한 결과물을 만들어냅니다.
# NoobCircuit
