# 엔지니어링 스킬 (Engineering)

실제 코드 작업을 위해 매일 사용하는 스킬 모음입니다.

## 사용자 호출 (User-invoked)

사용자가 직접 입력해야만 실행됩니다 (Claude Code: `disable-model-invocation: true`; Codex: `agents/openai.yaml`의 `policy.allow_implicit_invocation: false`).

- **[ask-matt](./ask-matt/SKILL.md)**: 현재 상황에 어떤 스킬이나 워크플로우가 적합한지 묻는 라우터 스킬.
- **[grill-with-docs](./grill-with-docs/SKILL.md)**: 심문 세션을 통해 프로젝트 도메인 모델을 구축하고, 용어를 명확히 하며, `GLOSSARY.md` 및 ADR을 함께 작성·업데이트.
- **[triage](./triage/SKILL.md)**: 이슈를 체계적인 분류 역할 상태 머신에 따라 분류하고 라벨링.
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)**: 코드베이스를 스캔하여 모듈 심화(Deepening) 기회를 탐색하고, 시각적 HTML 리포트로 제시한 뒤 선택한 대상을 심문.
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)**: 엔지니어링 스킬에 필요한 저장소 설정(이슈 트래커, 분류 라벨, 도메인 문서 구조 등)을 구성 (저장소당 1회 실행).
- **[to-spec](./to-spec/SKILL.md)**: 현재 대화 내용을 기술 스펙(Spec)으로 정리하여 이슈 트래커에 등록.
- **[to-tickets](./to-tickets/SKILL.md)**: 계획, 스펙, 대화 내용을 블로킹 의존 관계가 명시된 트레이서 불릿(Tracer-bullet) 티켓 세트로 분할하여 등록 (로컬 파일 또는 실제 트래커).
- **[implement](./implement/SKILL.md)**: 스펙이나 티켓에 정의된 작업을 구현하며, 사전 합의된 경계에서 `/tdd`를 실행하고 커밋 전 `/code-review`로 마무리.
- **[implement-spec](./implement-spec/SKILL.md)**: 단일 통합 브랜치에서 전체 스펙을 구현. 티켓을 작업 그래프로 다루며, 준비된 프론티어 전반에 걸쳐 구현자 서브에이전트를 실행하여 동시성을 극대화한 후 `/code-review`로 마무리.
- **[wayfinder](./wayfinder/SKILL.md)**: 단일 세션에 담기 어려운 대규모 작업을 이슈 트래커의 결정 티켓 맵으로 설계하고 단계별로 해결.
- **[retro](./retro/SKILL.md)**: 세션 종료 후 코딩 에이전트 환경(탐색, 자동화된 검사, 코딩 표준, 가이드 파일, 도구 등)의 개선 사항을 심각도가 높은 순서대로 제안.

## 모델 호출 (Model-invoked)

사용자가 직접 호출하거나 모델이 작업 상황에 맞춰 자율적으로 호출할 수 있습니다.

- **[prototype](./prototype/SKILL.md)**: 설계 의문을 검증하기 위한 1회용 프로토타입 제작 (단일 HTML 상태/로직 프로토타입 또는 토글 가능한 다중 UI 프로토타입).
- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)**: 난해한 버그와 성능 저하를 위한 규율 있는 진단 루프 (실패 재현 → 최소화 → 가설 수립 → 계측 → 수정 → 회귀 테스트).
- **[research](./research/SKILL.md)**: 신뢰할 수 있는 1차 출처를 조사하여 출처가 명시된 마크다운 보고서로 작성 (백그라운드 에이전트로 실행).
- **[tdd](./tdd/SKILL.md)**: Red-Green-Refactor 루프를 통한 테스트 주도 개발. 기능을 수직 슬라이스 단위로 안전하게 개발.
- **[domain-modeling](./domain-modeling/SKILL.md)**: 도메인 모델을 구축하고 용어집과 대조 검증하며, 엣지 케이스 시나리오를 스트레스 테스트하고 `GLOSSARY.md` 및 ADR 갱신.
- **[codebase-design](./codebase-design/SKILL.md)**: 깊은 모듈 설계를 위한 공유 규율 및 어휘 (작은 인터페이스, 깔끔한 경계, 인터페이스를 통한 테스트 가능성).
- **[code-review](./code-review/SKILL.md)**: 기준점 이후의 diff를 2개 축으로 병렬 리뷰: **Standards**(코드 표준 및 파울러 코드 스멜 준수 여부)와 **Spec**(원래 요구사항 충실 구현 여부).
- **[pr](./pr/SKILL.md)**: 풀 리퀘스트 본문의 바람직한 구조를 정의: 변경 사항을 명확히 전달하는 가장 간결한 시각적 요약, 동작을 증명하는 전/후 근거 자료, 병합 위험도 판단(단방향/양방향 결정, 폭발 반경).
- **[wizard](./wizard/SKILL.md)**: 사람이 직접 수행해야 하는 작업(인프라 프로비저닝, 자격증명 설정, 대시보드 조작, 마이그레이션 등)을 안내하는 대화형 Bash 위저드 생성.
