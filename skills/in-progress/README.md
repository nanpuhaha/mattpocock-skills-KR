# 개발 진행 중인 스킬 (In Progress)

베타 단계입니다. 공개 피드백을 받기 위해 의도적으로 공개되어 있습니다. 공식 플러그인 번들 및 최상위 README에는 아직 포함되지 않으며 예고 없이 변경되거나 제거될 수 있습니다.

개별 설치 방법:

```bash
npx skills@latest add mattpocock/skills --skill=<스킬이름>
```

- **[loop-me](./loop-me/SKILL.md)**: 현재 디렉토리를 상태 유지 작업 공간으로 삼아 여러 세션에 걸쳐 구현 가능한 워크플로우 스펙을 도출하는 심문 진행. 사용자 호출.
- **[writing-beats](./writing-beats/SKILL.md)**: 게임북 스타일로 글을 비트(단락 흐름)의 여정으로 설계. 시작 비트를 고르고 해당 비트만 작성한 뒤 다음 비트로 전환하여 자연스럽게 글을 완성.
- **[writing-fragments](./writing-fragments/SKILL.md)**: 심문 세션을 통해 다양한 글쓰기 조각(파편)들을 발굴하여 향후 글의 원자재가 될 단일 문서에 추가.
- **[writing-shape](./writing-shape/SKILL.md)**: 원자재 마크다운 파일을 가져와 각 단계에서 서식 선택을 조율하며 문단별로 한 편의 글로 구체화.
- **[claude-handoff](./claude-handoff/SKILL.md)**: 현재 대화를 `claude --bg`를 통해 핸드오프 요약과 함께 즉시 작업을 이어받는 새로운 백그라운드 에이전트에 인수인계. 사용자 호출.
- **[setup-ts-deep-modules](./setup-ts-deep-modules/SKILL.md)**: 각 패키지가 깊은 모듈이 되도록 TypeScript 저장소에 dependency-cruiser를 연결(하위 폴더에 구현 은닉, 진입점 파일을 통해서만 접근, 진입점을 통한 테스트 실행). 사용자 호출.
