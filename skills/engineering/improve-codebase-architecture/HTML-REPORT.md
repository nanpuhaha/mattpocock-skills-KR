# HTML 아키텍처 리포트 작성 형식

아키텍처 검토 결과는 OS 임시 디렉토리에 독립 실행형 단일 HTML 파일로 렌더링됩니다. Tailwind와 Mermaid는 CDN을 통해 로드됩니다. Mermaid는 그래프 형태의 다이어그램을 신뢰성 있게 처리하며, 직접 작성한 div 및 SVG는 보다 자유로운 시각화(전체 구조도, 단면도 등)를 처리합니다. 둘을 적절히 혼합하여 사용하세요.

## 기본 골격 (Scaffold)

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>{{저장소 이름}} 아키텍처 리뷰</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "neutral", securityLevel: "loose" });
    </script>
    <style>
      .seam { stroke-dasharray: 4 4; }
      .leak { stroke: #dc2626; }
      .deep { background: linear-gradient(135deg, #0f172a, #1e293b); }
    </style>
  </head>
  <body class="bg-stone-50 text-slate-900 font-sans">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <header>...</header>
      <section id="candidates" class="space-y-10">...</section>
      <section id="top-recommendation">...</section>
    </main>
  </body>
</html>
```

## 헤더 (Header)

저장소 이름, 날짜, 간결한 범례: 실선 상자 = 모듈, 점선 = 경계선(Seam), 빨간 화살표 = 누출(Leakage), 굵은 어두운 상자 = 깊은 모듈(Deep module). 서론 문단 없이 바로 후보 목록으로 진입합니다.

## 후보 카드 (Candidate card)

다이어그램이 핵심을 전달합니다. 글은 간결하고 명확해야 하며 `/codebase-design` 스킬의 용어들을 자연스럽게 사용합니다.

각 후보는 하나의 `<article>`로 구성됩니다:
- **제목 (Title)**: 모듈 심화 내용을 명시 (예: "주문 접수 파이프라인 단일화")
- **배지 행 (Badge row)**: 추천 강도 (`Strong` = 에메랄드, `Worth exploring` = 황색, `Speculative` = 회색) 및 의존성 분류 태그 (`in-process`, `local-substitutable`, `ports & adapters`, `mock`)
- **대상 파일 (Files)**: 고정폭 폰트 목록 (`font-mono text-sm`)
- **전/후 다이어그램 (Before / After diagram)**: 2개 열 좌우 나란히 배치
- **문제점 (Problem)**: 1문장으로 무엇이 고통을 주는지 설명
- **해결책 (Solution)**: 1문장으로 무엇이 바뀌는지 설명
- **이점 (Wins)**: 6단어 이내의 불릿 포인트 (예: "테스트가 단일 인터페이스를 겨냥", "가격 책정 로직 누출 방지", "얕은 래퍼 4개 삭제")
- **ADR 콜아웃** (해당 시): 황색 배경 박스 한 줄

다이어그램을 설명하기 위해 긴 문단을 쓰지 마세요. 다이어그램 자체로 이해될 수 있어야 합니다.

## 다이어그램 패턴

후보에 맞는 패턴을 선택하여 다양하게 구성하세요.

### Mermaid 그래프 (의존성 및 호출 흐름)
호출 구조와 누출 지점을 보여줄 때 사용합니다. Tailwind 스타일 카드 안에 감싸서 배치합니다.

```html
<div class="rounded-lg border border-slate-200 bg-white p-4">
  <pre class="mermaid">
    flowchart LR
      A[OrderHandler] --> B[OrderValidator]
      B --> C[OrderRepo]
      C -.누출.-> D[PricingClient]
      classDef leak stroke:#dc2626,stroke-width:2px;
      class C,D leak
  </pre>
</div>
```

### 직접 작성한 상자 및 화살표 (Hand-built boxes-and-arrows)
Mermaid 레이아웃으로 표현하기 어려운 굵은 테두리의 깊은 모듈과 내부 은닉 요소를 표현할 때 사용합니다.

### 레이어 단면도 (Cross-section)
호출이 통과하는 불필요하게 얇은 계층들을 표현할 때 유용합니다. 적용 전: 아무 일도 하지 않는 6개의 얇은 계층 → 적용 후: 하나의 통합된 책임을 지닌 굵은 단일 밴드.

### 질량 다이어그램 (Mass diagram)
인터페이스 면적과 구현체 면적의 비율을 사각형으로 표현. 적용 전: 인터페이스가 구현체만큼 큼 (얕음) → 적용 후: 인터페이스는 작고 구현체는 큼 (깊음).

## 스타일 가이드

- 넉넉한 여백과 절제된 색상 사용 (에메랄드/인디고 포인트, 누출은 빨강, 경고는 황색).
- 다이어그램 높이는 약 320px 내외로 유지하여 스크롤 없이 좌우 비교가 편하도록 구성.
- 다이어그램 내 모듈 라벨은 `text-xs uppercase tracking-wider` 사용.

## 어조 및 용어 규율

`/codebase-design` 스킬의 용어를 엄격히 사용하세요:
- **반드시 사용할 용어**: module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality.
- **대체 금지 용어**: component, service, unit (모듈 대신) · API, signature (인터페이스 대신) · boundary (경계선 대신).
- "더 깔끔한 코드", "유지보수하기 쉬움" 같은 모호한 표현 대신 *"응집성: 버그가 하나의 모듈에 집중됨"*, *"레버리지: 1개의 인터페이스, N개의 호출 위치"* 와 같이 구체적인 도메인 어휘로 이점을 기술하세요.
