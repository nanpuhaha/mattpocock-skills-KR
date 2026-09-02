스킬들은 `skills/` 하위의 버킷 폴더별로 구성됩니다:

- `engineering/`: 일상적인 코드 작업용
- `productivity/`: 일상적인 비코드 워크플로우 도구
- `misc/`: 보관 중이나 자주 사용되지 않으며 홍보되지 않음
- `in-progress/`: 베타: 공개 피드백 수렴 목적, 플러그인 번들에는 미포함
- `deprecated/`: 더 이상 사용되지 않음

`engineering/` 또는 `productivity/`(공식 홍보 버킷)의 모든 스킬은 최상위 `README.md`에 참조되어야 하고 `.claude-plugin/plugin.json`의 `skills` 배열에 등록되어야 합니다(Claude Code 플러그인은 정확히 이 두 버킷 세트만 배포합니다). `misc/`, `in-progress/`, `deprecated/`의 스킬은 여기에 포함되지 않아야 합니다.

설치 명령어는 [.agents/install-block.md](./.agents/install-block.md)의 내용을 그대로 따릅니다. `.claude-plugin/marketplace.json`은 이 저장소 자체를 단일 플러그인 마켓플레이스로 만듭니다. 매니페스트를 수정한 후에는 `claude plugin validate . --strict`를 실행하세요. 왜 Claude 플러그인으로 먼저 배포하고 Codex 플러그인은 나중에 하는지는 [.agents/adr/0002-ship-as-a-claude-code-plugin.md](./.agents/adr/0002-ship-as-a-claude-code-plugin.md)에 정리되어 있습니다.

최상위 `README.md`의 각 스킬 항목은 스킬 이름을 해당 `SKILL.md`로 링크해야 합니다.

각 버킷 폴더에는 해당 버킷 내 모든 스킬과 한 줄 설명을 나열하고 `SKILL.md`로 링크하는 `README.md`가 있습니다. 공식 홍보 버킷의 `README.md`와 최상위 `README.md`는 항목을 **User-invoked(사용자 호출)** 와 **Model-invoked(모델 호출)** 로 분류하며, 비홍보 버킷(`misc/`, `in-progress/`)은 단순 목록을 사용합니다.

`engineering/` 및 `productivity/`의 스킬은 `docs/<bucket>/<skill-name>.md`에 사용자용 문서 페이지도 가집니다(docs 트리는 `skills/` 하위의 두 버킷 폴더를 그대로 미러링합니다). 공개 URL은 버킷과 무관하게 `https://aihero.dev/skills-<skill-name>`입니다(docs 경로는 저장소 구성용일 뿐입니다). `engineering/` 또는 `productivity/`의 스킬을 추가, 이름 변경 또는 동작 변경할 때는 [.agents/writing-docs.md](./.agents/writing-docs.md)에 따라 문서 페이지를 생성하거나 동기화하세요. 완성된 페이지는 네 가지 섹션을 포함합니다: **What it does(하는 일)**, **When to reach for it(사용해야 할 때)**, **Common questions(자주 묻는 질문)**, **It's working if(정상 작동 기준)**. `writing-docs.md`에는 템플릿, 섹션 순서, 질문을 찾는 방법이 포함되어 있습니다. 비홍보 버킷(`misc/`, `in-progress/`, `deprecated/`)의 스킬은 별도 문서 페이지를 만들지 않습니다. 유일한 예외는 완전히 제거된 공식 홍보 스킬입니다: 해당 페이지는 보관됨(archived)으로 표시된 채 유지됩니다(`writing-docs.md` 참조).

모든 `SKILL.md`는 사용자 호출(인간만 접근 가능)이거나 모델 호출(모델 또는 사용자 모두 접근 가능)입니다. 자세한 내용은 [.agents/invocation.md](./.agents/invocation.md)를 참조하세요.

[`ask-matt`](./skills/engineering/ask-matt/SKILL.md)는 모든 사용자 접근 가능 스킬과 그 관계를 매핑하는 라우터입니다. 사용자 접근 가능 스킬을 추가, 이름 변경, 제거하거나 흐름을 변경할 때마다 `ask-matt`의 `SKILL.md`를 다시 읽고 업데이트하여 라우터가 항상 정확한 정보를 유지하도록 해야 합니다.

`deprecated/` 및 `misc/` 외부의 모든 스킬을 로컬 하네스 스킬 디렉토리(`~/.claude/skills`, `~/.agents/skills`)에 (재)연결하려면 `scripts/link-skills.sh`를 실행하세요. 각 항목은 이 저장소를 가리키는 심볼릭 링크이므로 `git pull`을 통해 설치된 스킬을 최신 상태로 유지할 수 있습니다. 스킬을 추가, 제거하거나 이름을 변경한 후에는 스크립트를 다시 실행하세요.

이 저장소의 모든 글(`SKILL.md` 파일, 문서, `README.md`, `CHANGELOG.md`, ADR, changeset, 코드 주석)에서 em-dash(—)를 사용하지 마십시오. em-dash가 필요한 문장은 기계적인 문자 치환 대신 쉼표, 콜론, 마침표, 괄호, 접속사 등을 활용하여 문맥에 맞게 자연스럽게 다시 작성하세요.

## 에이전트 스킬

### 분류(Triage) 라벨

표준 명칭은 변경되지 않습니다. `docs/agents/triage-labels.md`를 참조하세요. 이슈는 [`SCOPE.md`](./SCOPE.md)를 기준으로 판단합니다.
