# 이슈 트래커: GitLab

이 저장소의 이슈와 스펙은 GitLab Issues로 관리됩니다. 모든 작업에 [`glab`](https://gitlab.com/gitlab-org/cli) CLI를 사용합니다.

## 사용 규약

- **이슈 생성**: `glab issue create --title "..." --description "..."`. 여러 줄 설명은 heredoc을 사용하세요. 에디터를 열려면 `--description -`을 전달합니다.
- **이슈 조회**: `glab issue view <number> --comments`. 기계 판독 가능한 출력에는 `-F json`을 사용합니다.
- **이슈 목록 조회**: 적절한 `--label` 필터와 함께 `glab issue list -O json`.
- **댓글 작성**: `glab issue note <number> --message "..."`. GitLab에서는 댓글을 'note'라고 부릅니다.
- **라벨 추가/제거**: `glab issue update <number> --label "..."` / `--unlabel "..."`. 여러 라벨은 쉼표로 구분하거나 플래그를 반복 지정할 수 있습니다.
- **이슈 닫기**: `glab issue close <number>`. `glab issue close`는 종료 댓글을 받지 않으므로, 먼저 `glab issue note <number> --message "..."`로 설명을 작성한 후 닫으세요.
- **머지 리퀘스트 (MR)**: GitLab에서는 PR을 "merge requests"라고 부릅니다. `glab mr create`, `glab mr view`, `glab mr note` 등을 사용하며, `pr` 대신 `mr`, `comment`/`--body` 대신 `note`/`--message`를 쓰는 것 외에는 `gh pr ...`과 동일한 형태입니다.

## 분류 대상으로서의 머지 리퀘스트 (MR)

**MR을 요청 표면으로 취급: no.** _(외부 머지 리퀘스트를 기능 요청으로 취급하려면 `yes`로 설정하세요. `/triage` 스킬이 이 플래그를 읽습니다.)_

`yes`로 설정된 경우 MR도 이슈와 동일한 라벨 및 상태를 거치며 해당하는 `glab mr` 명령어를 사용합니다:

- **MR 조회**: `glab mr view <number> --comments` 및 diff 확인을 위한 `glab mr diff <number>`.
- **분류를 위한 외부 MR 목록 조회**: `glab mr list -F json` 실행 후, 작성자가 프로젝트 멤버나 소유자가 아닌 MR만 유지합니다 (메인테이너의 진행 중인 작업이 아닌 기여자의 MR).
- **댓글 / 라벨 / 닫기**: `glab mr note`, `glab mr update --label`/`--unlabel`, `glab mr close`.

GitHub와 달리 GitLab은 이슈와 MR에 별도로 번호를 매기므로 메인테이너가 어느 표면을 의미하는지 알면 `#42`는 모호하지 않습니다.

## 스킬에서 "이슈 트래커에 게시하라"고 할 때

GitLab 이슈를 생성합니다.

## 스킬에서 "관련 티켓을 가져오라"고 할 때

`glab issue view <number> --comments`를 실행합니다.

## 웨이파인딩(Wayfinding) 작업 규약

`/wayfinder` 스킬에서 사용합니다. **맵(Map)** 은 단일 이슈이며, **하위(Child)** 이슈들이 개별 티켓이 됩니다.

- **맵(Map)**: `wayfinder:map` 라벨이 붙은 단일 이슈 (`glab issue create --label wayfinder:map`). 메모, 현재까지의 결정 사항, 안개(Fog) 본문을 담습니다. (네이티브 에픽을 지원하는 GitLab 플랜에서는 에픽이 대신 맵을 담을 수 있지만, 라벨이 지정된 이슈는 모든 환경에서 동작합니다.)
- **자식 티켓 (Child ticket)**: 설명 상단에 `Part of #<map>`이 명시되고 `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`) 라벨이 붙은 이슈. 할당받으면 주도하는 개발자에게 할당됩니다.
- **블로킹 (Blocking)**: GitLab의 **네이티브 블로킹 링크**, 표준적이고 UI에 표시되는 형태입니다. note로 게시되는 `/blocked_by #<n>` 퀵 액션으로 추가합니다 (`glab issue note <child> --message "/blocked_by #<blocker>"`). 네이티브 블로킹 링크는 Premium/Ultimate 기능입니다. 무료 티어(또는 미지원 환경)에서는 설명 상단의 `Blocked by: #<n>, #<n>` 줄로 대체합니다. 모든 블로커가 닫히면 티켓의 차단이 해제됩니다.
- **프론티어 쿼리 (Frontier query)**: 맵의 자식 이슈로 범위를 좁혀 `glab issue list -O json`을 실행하고, 열린 블로커(열린 이슈에 대한 네이티브 `blocked_by` 링크: `glab api projects/:id/issues/<child-iid>/links`, 또는 `Blocked by` 줄의 열린 이슈)가 있거나 담당자가 있는 항목은 제외합니다. 맵 순서상 첫 번째 항목이 우선합니다.
- **할당 (Claim)**: `glab issue update <n> --assignee @me`, 세션의 첫 번째 쓰기 작업입니다.
- **해결 (Resolve)**: `glab issue note <n> --message "<답변>"`, 그 다음 `glab issue close <n>`, 그 다음 맵의 현재까지의 결정 사항에 컨텍스트 포인터(요약 + 링크)를 추가합니다.
