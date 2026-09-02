---
name: setup-matt-pocock-skills
description: "엔지니어링 스킬을 사용하기 위해 이 저장소를 설정합니다: 이슈 트래커, 분류 라벨 어휘, 도메인 문서 구조를 구성합니다. 다른 엔지니어링 스킬을 처음 사용하기 전에 1회 실행하세요."
disable-model-invocation: true
---

# Matt Pocock 스킬 환경 설정 (Setup Matt Pocock's Skills)

엔지니어링 스킬들이 전제하는 저장소별 설정을 구성합니다:

- **이슈 트래커 (Issue tracker)**: 이슈가 호스팅되는 위치 (기본값: GitHub, 로컬 마크다운도 기본 지원)
- **트리아지 라벨 (Triage labels)**: 5가지 표준 분류 역할에 사용할 라벨 문자열
- **도메인 문서 (Domain docs)**: `GLOSSARY.md` 및 ADR의 위치와 에이전트의 읽기 규칙

이 스킬은 기계적인 스크립트가 아니라 프롬프트 기반의 대화형 가이드입니다. 저장소 상태를 탐색하고, 발견한 내용을 제시하며, 사용자와 확인한 후 설정 문서를 작성합니다.

## 프로세스

### 1. 탐색

저장소의 현재 시작 상태를 파악합니다:
- `git remote -v` 및 `.git/config`: GitHub 저장소인가? 어느 저장소인가?
- 루트의 `AGENTS.md` 및 `CLAUDE.md`: 파일이 존재하는가? 이미 `## Agent skills` 섹션이 있는가?
- 루트의 `GLOSSARY.md` 및 `GLOSSARY-MAP.md`
- `docs/adr/` 및 `src/*/docs/adr/` 디렉토리
- `docs/agents/`: 이전에 이 스킬로 생성된 설정 파일이 이미 있는가?
- `.scratch/`: 로컬 마크다운 이슈 트래커 규약이 이미 사용 중인가?
- `triage` 스킬이 설치되어 있는가? (이 스킬 폴더 옆의 `triage` 스킬 폴더 또는 사용 가능한 스킬 목록 내 `triage`) B 섹션 실행 여부를 결정합니다.
- 모노레포 신호 확인: `pnpm-workspace.yaml`, `package.json`의 `workspaces` 필드, 독립된 `src/`를 가진 `packages/*`. 이는 매우 큰 다중 패키지 저장소에만 존재하며, 없다면 거의 모든 저장소에 해당하는 단일 컨텍스트입니다.

### 2. 발견 사항 제시 및 질문

현재 상태를 요약하고 순서대로 섹션을 진행합니다.

**A 섹션: 이슈 트래커 (Issue tracker)**
`to-tickets`, `triage`, `to-spec` 등의 스킬이 실제로 작업 티켓을 읽고 쓸 위치를 결정합니다:
- **GitHub**: GitHub Issues 사용 (`gh` CLI 활용)
- **GitLab**: GitLab Issues 사용 (`glab` CLI 활용)
- **로컬 마크다운**: `.scratch/<기능>/` 하위의 마크다운 파일로 관리 (개인 프로젝트나 리모트가 없는 경우에 적합)
- **기타** (Jira, Linear 등): 사용자가 작업 방식을 한 문단으로 설명하면 자유 형식 문서로 기록

선택 결과를 `docs/agents/issue-tracker.md`에 기록합니다.

**B 섹션: 트리아지 라벨 어휘 (Triage label vocabulary)**
`triage` 스킬이 설치되지 않은 경우 이 섹션은 건너뜁니다.
설치된 경우 기본 라벨을 사용할지 묻습니다:
> 기본 트리아지 라벨을 그대로 사용하시겠습니까? (권장: **예**)

기본값은 5가지 표준 역할이며, 각 라벨 문자열은 역할 이름과 동일합니다: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. **예**를 선택하면 있는 그대로 작성합니다. 사용자가 아니오라고 답하는 경우(보통 트래커에서 이미 `bug:triage`와 같은 다른 이름을 사용하는 경우)에만 재정의할 라벨을 수집하여 `triage`가 중복을 만드는 대신 기존 라벨을 적용하도록 합니다.

**C 섹션: 도메인 문서 (Domain docs)**
기본적으로 **단일 컨텍스트 (Single-context)** (루트의 `GLOSSARY.md` + `docs/adr/`)로 설정합니다. 거의 모든 저장소에 적합하므로 묻지 않고 바로 작성합니다.

탐색에서 모노레포 신호가 발견된 경우에만 **다중 컨텍스트** (각 컨텍스트별 `GLOSSARY.md` 파일을 가리키는 루트 `GLOSSARY-MAP.md`)를 제안하고 원하는 구조를 확인합니다.

### 3. 확인 및 수정

작성될 파일들의 초안을 사용자에게 보여주고 확인을 받습니다:
- 수정 중인 `CLAUDE.md` 또는 `AGENTS.md`에 추가될 `## Agent skills` 블록 (선택 규칙은 4단계 참조)
- `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, `docs/agents/triage-labels.md`의 내용 (`triage`가 설치된 경우에만 마지막 파일 포함)

파일을 작성하기 전에 사용자가 편집할 수 있도록 합니다.

### 4. 파일 작성

**수정할 파일 선택:**
- `CLAUDE.md`가 존재하면 이를 수정합니다.
- 그렇지 않고 `AGENTS.md`가 존재하면 이를 수정합니다.
- 둘 다 없으면 사용자에게 어느 것을 생성할지 묻고, 임의로 선택하지 않습니다.

`CLAUDE.md`가 이미 있을 때 `AGENTS.md`를 생성하거나 그 반대로 하지 마세요. 항상 이미 존재하는 파일을 수정합니다.

선택한 파일에 `## Agent skills` 블록이 이미 있다면 중복 추가하지 않고 해당 위치의 내용을 갱신합니다. 주변 섹션에 사용자가 작성한 수정 사항을 덮어쓰지 마세요.

블록 형태:

```markdown
## Agent skills

### Issue tracker

[이슈가 추적되는 위치에 대한 한 줄 요약]. `docs/agents/issue-tracker.md` 참조.

### Triage labels

[라벨 어휘에 대한 한 줄 요약]. `docs/agents/triage-labels.md` 참조.

### Domain docs

[문서 구조에 대한 한 줄 요약: "single-context" 또는 "multi-context"]. `docs/agents/domain.md` 참조.
```

`### Triage labels` 하위 블록을 포함하고 `docs/agents/triage-labels.md`를 작성하는 것은 `triage`가 설치되어 B 섹션이 실행된 경우에만 해당합니다. 그렇지 않은 경우 둘 다 생략합니다.

GitHub 또는 GitLab에서 B 섹션이 실행된 경우, 트래커에 없는 구성된 각 라벨을 생성합니다 (`gh label create` / `glab label create`).

그런 다음 이 스킬 폴더의 시드 템플릿을 시작점으로 사용하여 문서 파일들을 작성합니다:

- [issue-tracker-github.md](./issue-tracker-github.md): GitHub 이슈 트래커
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md): GitLab 이슈 트래커
- [issue-tracker-local.md](./issue-tracker-local.md): 로컬 마크다운 이슈 트래커
- [triage-labels.md](./triage-labels.md): 라벨 매핑 (`triage`가 설치된 경우에만)
- [domain.md](./domain.md): 도메인 문서 사용 규칙 및 레이아웃

"기타" 이슈 트래커의 경우 사용자의 설명을 바탕으로 `docs/agents/issue-tracker.md`를 처음부터 새로 작성합니다.

### 5. 완료 안내

설정이 완료되었음을 알리고 이제 어떤 엔지니어링 스킬들이 이 파일들을 읽어 작업하게 되는지 안내합니다. 나중에 설정을 변경하고 싶을 때는 `docs/agents/*.md` 파일을 직접 수정하면 된다는 점을 알립니다. 이슈 트래커를 바꾸거나 처음부터 다시 시작하려는 경우가 아니라면 이 스킬을 다시 실행할 필요는 없습니다.
