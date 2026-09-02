# 생산성 스킬 (Productivity)

코드에 국한되지 않는 범용적인 워크플로우 도구 모음입니다.

## 사용자 호출 (User-invoked)

사용자가 직접 입력해야만 실행됩니다 (Claude Code: `disable-model-invocation: true`; Codex: `agents/openai.yaml`의 `policy.allow_implicit_invocation: false`).

- **[grill-me](./grill-me/SKILL.md)**: 계획이나 설계 트리의 모든 분기가 해결될 때까지 집요하게 인터뷰를 진행.
- **[handoff](./handoff/SKILL.md)**: 다른 에이전트가 작업을 이어받을 수 있도록 현재 대화 내용을 인수인계(Handoff) 문서로 압축 정리.
- **[teach](./teach/SKILL.md)**: 현재 디렉토리를 상태 유지 학습 공간으로 삼아 여러 세션에 걸쳐 사용자에게 개념과 스킬을 강의.
- **[to-questionnaire](./to-questionnaire/SKILL.md)**: 혼자 결정할 수 없는 문제를 담당자에게 전달할 수 있는 마크다운 설문지로 변환 (비동기 작성 또는 회의용).
- **[wait-what](./wait-what/SKILL.md)**: 설명이 잘 와닿지 않을 때 실행하면 누락된 맥락을 보충하여 `GLOSSARY.md` 어휘를 활용해 쉬운 언어로 다시 설명.

## 모델 호출 (Model-invoked)

사용자가 직접 호출하거나 모델이 상황에 따라 자율적으로 호출할 수 있습니다.

- **[grilling](./grilling/SKILL.md)**: 계획, 결정, 아이디어의 모든 분기가 해결될 때까지 사용자를 집요하게 인터뷰하는 핵심 프리미티브.
- **[writing-for-agents](./writing-for-agents/SKILL.md)**: AI 에이전트를 위한 문서(스킬, AGENTS.md/CLAUDE.md 및 참조 문서) 작성 지침.
