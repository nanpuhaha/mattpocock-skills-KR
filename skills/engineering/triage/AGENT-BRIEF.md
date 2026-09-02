# 에이전트 브리프 작성법 (Writing Agent Briefs)

에이전트 브리프(Agent Brief)는 이슈나 PR이 `ready-for-agent` 상태로 이동할 때 작성되는 구조화된 댓글입니다. 자리를 비운(AFK) 에이전트가 작업의 근간으로 삼을 권위 있는 스펙입니다. 원본 이슈 본문과 토론은 맥락일 뿐이며, 에이전트 브리프가 실제 작업 계약서입니다.

## 원칙

### 정밀함보다 지속성 (Durability over precision)
이슈가 며칠 또는 몇 주 동안 대기할 수 있습니다. 그동안 파일이 이동하거나 이름이 바뀌더라도 유효하게 유지되도록 작성하세요:
- 인터페이스, 타입, 동작 계약을 기술하세요.
- 파일 경로(`src/foo/bar.ts`)나 줄 번호는 쉽게 구식이 되므로 명시하지 마세요.

### 절차가 아닌 동작 중심 (Behavioral, not procedural)
어떻게 구현할지가 아니라 시스템이 **무엇을** 해야 하는지를 기술하세요.

### 완전한 인수 조건 (Complete acceptance criteria)
에이전트가 작업 완료를 스스로 판단할 수 있도록 구체적이고 독립적으로 테스트 가능한 인수 조건을 작성하세요.

### 명시적인 범위 제외 (Explicit scope boundaries)
이번 작업에서 다루지 *말아야* 할 사항을 명확히 정의합니다.

## 기본 템플릿

```markdown
## Agent Brief

**Category:** bug / enhancement
**Summary:** 해야 할 작업의 한 줄 요약

**Current behavior (현재 동작):**
현재 어떤 일이 일어나는지 기술.

**Desired behavior (기대 동작):**
작업 완료 후 어떻게 동작해야 하는지 기술 (엣지 케이스 및 오류 조건 포함).

**Key interfaces (핵심 인터페이스):**
- `TypeName`: 변경되어야 할 부분과 이유
- `functionName()` 반환 타입: 현재 반환값 vs 기대 반환값

**Acceptance criteria (인수 조건):**
- [ ] 구체적이고 테스트 가능한 조건 1
- [ ] 구체적이고 테스트 가능한 조건 2

**Out of scope (범위 제외):**
- 이번 이슈에서 변경하지 말아야 할 대상
```
