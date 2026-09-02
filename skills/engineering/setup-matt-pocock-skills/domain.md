# 도메인 문서 (Domain Docs)

코드베이스를 탐색할 때 엔지니어링 스킬들이 이 저장소의 도메인 문서를 활용하는 방법입니다.

## 탐색 전 확인 사항

- 저장소 루트의 **`GLOSSARY.md`**, 또는
- 루트의 **`GLOSSARY-MAP.md`** (존재하는 경우: 컨텍스트별 `GLOSSARY.md`를 가리킴. 현재 주제와 관련된 파일들을 읽음).
- **`docs/adr/`**: 작업하려는 영역과 관련된 ADR을 확인. 다중 컨텍스트 저장소의 경우 `src/<context>/docs/adr/`의 컨텍스트별 결정도 확인.

이 파일들이 존재하지 않더라도 **조용히 계속 진행**하세요. 파일 부재를 문제 삼지 말고 미리 만들자고 제안하지도 마세요. `/domain-modeling` 스킬(`/grill-with-docs` 및 `/improve-codebase-architecture`를 통해 호출됨)이 용어나 결정이 실제로 합의될 때 지연 생성합니다.

## 파일 구조

단일 컨텍스트 저장소 (대부분의 저장소):

```
/
├── GLOSSARY.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

다중 컨텍스트 저장소 (루트에 `GLOSSARY-MAP.md` 존재):

```
/
├── GLOSSARY-MAP.md
├── docs/adr/                          ← 시스템 전역 결정 사항
└── src/
    ├── ordering/
    │   ├── GLOSSARY.md
    │   └── docs/adr/                  ← 컨텍스트별 결정 사항
    └── billing/
        ├── GLOSSARY.md
        └── docs/adr/
```

## 용어집 어휘 준수

출력물(이슈 제목, 리팩터링 제안, 가설, 테스트명 등)에서 도메인 개념을 명명할 때는 `GLOSSARY.md`에 정의된 표준 용어를 사용하세요. 용어집이 명시적으로 피하도록 한 유의어를 사용하지 마세요.

필요한 개념이 용어집에 없다면, 프로젝트가 쓰지 않는 언어를 임의로 발명하고 있거나 실제 용어 공백이 있는 것입니다.

## ADR 충돌 명시

출력물이 기존 ADR과 상충되는 경우 조용히 덮어쓰지 말고 명시적으로 드러내세요:

> _ADR-0007(이벤트 소싱 주문)과 충돌하지만, 다음과 같은 이유로 재검토할 가치가 있습니다…_
