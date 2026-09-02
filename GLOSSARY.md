# Matt Pocock Skills 도메인 모델 (CONTEXT.md)

Claude Code 및 호환 AI 코딩 에이전트에서 로드하여 사용하는 에이전트 스킬(슬래시 커맨드 및 행동 양식) 모음입니다. 스킬들은 카테고리별로 구성되며, `/setup-matt-pocock-skills`를 통해 생성된 저장소별 설정 문서에 의해 관리됩니다.

## 도메인 언어 (Ubiquitous Language)

**이슈 트래커 (Issue tracker)**:
저장소의 이슈를 호스팅하는 도구: GitHub Issues, Linear, 로컬 `.scratch/` 마크다운 규약 등. `to-tickets`, `to-spec`, `triage` 등의 스킬이 이 이슈 트래커를 읽고 씁니다.
_지양할 표현_: 백로그 매니저, 백로그 백엔드, 이슈 호스트

**이슈 (Issue)**:
**이슈 트래커** 내에서 추적되는 단일 작업 단위: 버그, 작업(Task), 스펙(Spec), 또는 `to-tickets`에 의해 생성된 슬라이스.
_지양할 표현_: 티켓 (외부 시스템 용어를 직접 인용하거나, 아래의 **결정 티켓**을 지칭할 때만 예외적으로 허용)

**결정 티켓 (Decision ticket)**:
`wayfinder` 스킬의 작업 단위: `wayfinder:map`의 하위 **이슈**로서, 구현할 작업 조각이 아니라 '결정해야 할 질문'을 담고 있습니다. '결정(decision)'이라는 한정자를 통해 일반 구현 티켓과 명확히 구분됩니다.

**트리아지 역할 (Triage role)**:
이슈 분류(Triage) 과정에서 **이슈**에 부여되는 표준 상태 머신 라벨 (예: `needs-triage`, `ready-for-afk`). 각 역할은 `docs/agents/triage-labels.md`를 통해 **이슈 트래커**의 실제 라벨 문자열에 매핑됩니다.

## 관계 (Relationships)

- 하나의 **이슈 트래커**는 여러 개의 **이슈**를 보유합니다.
- 하나의 **이슈**는 한 번에 하나의 **트리아지 역할**을 가집니다.
- **결정 티켓**은 `wayfinder:map`의 자식인 하나의 **이슈**입니다.

## 해결된 모호성 (Flagged Ambiguities)

- "backlog"는 이전에 이슈를 호스팅하는 *도구*와 그 안의 *작업 뭉치*를 모두 지칭하는 데 쓰였습니다. → 해결: 도구는 **이슈 트래커**로 통일하며, "backlog"는 도메인 용어로 더 이상 사용하지 않습니다.
- "backlog backend" / "backlog manager" → 해결: **이슈 트래커**로 단일화되었습니다.
