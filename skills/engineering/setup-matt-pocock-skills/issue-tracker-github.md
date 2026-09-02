# 이슈 트래커: GitHub

이 저장소의 이슈와 스펙은 GitHub Issues로 관리됩니다. 모든 작업에 `gh` CLI를 사용합니다.

## 사용 규약

- **이슈 생성**: `gh issue create --title "..." --body "..."` (여러 줄 본문은 heredoc 사용)
- **이슈 조회**: `gh issue view <number> --json number,title,body,labels,comments`
- **이슈 목록 조회**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` (필요 시 `--label`, `--state` 필터 적용)
- **부모의 서브 이슈로 만들기**: `gh issue create --parent <parent> ...`, 또는 생성 후 `gh issue edit <parent> --add-sub-issue <child>` (`gh` 2.94+). 구버전 `gh`: `gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>` (아래 **블로킹**의 데이터베이스 id와 동일). 서브 이슈를 지원하지 않는 경우 자식 본문 상단에 `Part of #<parent>`를 명시합니다.
- **댓글 작성**: `gh issue comment <number> --body "..."`
- **라벨 추가/제거**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **이슈 닫기**: `gh issue close <number> --comment "..."`

`git remote -v`로부터 저장소 위치를 자동 인식합니다 (`gh`는 클론 내부에서 자동 처리).

## 분류 대상으로서의 Pull Request (PR)

**PR을 요청 표면으로 취급: no.** _(외부 PR을 기능 요청으로 취급하려면 `yes`로 변경하세요. `/triage` 스킬이 이 플래그를 읽습니다.)_

`yes`로 설정된 경우 PR도 동일한 라벨 및 상태 머신을 통과하며 `gh pr` 명령어를 사용합니다.

- **PR 조회**: `gh pr view <number> --comments` 및 diff 확인을 위한 `gh pr diff <number>`.
- **분류를 위한 외부 PR 목록 조회**: `gh api --paginate 'repos/{owner}/{repo}/pulls?state=open' --jq '.[] | select(.author_association | IN("OWNER","MEMBER","COLLABORATOR") | not) | {number, title, author: .user.login, author_association, labels: [.labels[].name]}'`.
- **댓글 / 라벨 / 닫기**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

## 스킬에서 "이슈 트래커에 게시하라"고 할 때

GitHub 이슈를 생성합니다.

## 스킬에서 "관련 티켓을 가져오라"고 할 때

위의 **이슈 조회** 방식으로 읽습니다.

## 웨이파인딩(Wayfinding) 작업 규약

`/wayfinder` 스킬에서 사용합니다. **맵(Map)** 은 단일 이슈이며, **하위(Child)** 이슈들이 개별 티켓이 됩니다.

- **맵(Map)**: `wayfinder:map` 라벨이 붙은 단일 이슈 (`gh issue create --label wayfinder:map`). 메모, 현재까지의 결정 사항, 안개(Fog) 본문을 담습니다.
- **자식 티켓 (Child ticket)**: 맵에 GitHub 서브 이슈로 연결된 이슈 (위의 **부모의 서브 이슈로 만들기** 참조). 서브 이슈를 사용할 수 없는 경우 맵 본문의 작업 목록에 자식을 추가하고 자식 본문 상단에 `Part of #<map>`을 표기합니다. 라벨: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). 티켓을 할당받으면 주도하는 개발자에게 할당됩니다.
- **블로킹 (Blocking)**: GitHub의 **네이티브 이슈 의존성**, 표준적이고 UI에 표시되는 형태입니다. `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`로 엣지를 추가합니다. 여기서 `<blocker-db-id>`는 블로커의 숫자형 **데이터베이스 id**입니다 (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, `#number`나 `node_id`가 아님). GitHub는 `issue_dependencies_summary.blocked_by`를 보고합니다 (열린 블로커만 해당, 실시간 게이트). 의존성을 사용할 수 없는 경우 자식 본문 상단의 `Blocked by: #<n>, #<n>` 줄로 대체합니다. 모든 블로커가 닫히면 티켓의 차단이 해제됩니다.
- **프론티어 쿼리 (Frontier query)**: 맵의 열린 자식 이슈를 나열하고(`gh issue list --state open`, 맵의 서브 이슈 / 작업 목록으로 범위 제한), 열린 블로커(`issue_dependencies_summary.blocked_by > 0` 또는 `Blocked by` 라인의 열린 이슈)가 있거나 담당자가 있는 것은 제외합니다. 맵 순서상 첫 번째 항목이 우선합니다.
- **할당 (Claim)**: `gh issue edit <n> --add-assignee @me`, 세션의 첫 번째 쓰기 작업입니다.
- **해결 (Resolve)**: `gh issue comment <n> --body "<답변>"`, 그 다음 `gh issue close <n>`, 그 다음 맵의 현재까지의 결정 사항에 컨텍스트 포인터(요약 + 링크)를 추가합니다.
