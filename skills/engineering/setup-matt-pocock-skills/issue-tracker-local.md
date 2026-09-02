# 이슈 트래커: 로컬 마크다운 (Local Markdown)

이 저장소의 이슈와 스펙은 `.scratch/` 하위의 마크다운 파일로 관리됩니다.

## 사용 규약

- 기능별 디렉토리 분리: `.scratch/<기능-슬러그>/`
- 스펙 파일: `.scratch/<기능-슬러그>/spec.md`
- 구현 이슈는 티켓당 1개 파일로 분리: `.scratch/<기능-슬러그>/issues/<NN>-<슬러그>.md` (`01`부터 번호 부여)
- 트리아지 상태는 각 이슈 파일 상단의 `Status:` 라인에 기록 (`triage-labels.md` 참고)
- 댓글 및 대화 히스토리는 파일 하단의 `## Comments` 섹션에 추가

## 스킬에서 "이슈 트래커에 게시하라"고 할 때

`.scratch/<기능-슬러그>/` 하위에 새 파일을 생성합니다.

## 스킬에서 "관련 티켓을 가져오라"고 할 때

참조된 경로의 마크다운 파일을 읽습니다.

## 웨이파인딩(Wayfinding) 작업 규약

`/wayfinder` 스킬에서 사용합니다:
- **맵**: `.scratch/<작업명>/map.md`
- **자식 티켓**: `.scratch/<작업명>/issues/NN-<슬러그>.md` (`Type:` 및 `Status:` 라인 포함)
- **블로킹**: 상단에 `Blocked by: NN, NN` 라인 명시. 나열된 모든 파일이 `Status: resolved` 상태가 되면 블로킹 해제.
- **할당**: `Status: claimed`로 설정하고 저장.
- **해결**: `## Answer` 제목 아래에 답변을 추가하고 `Status: resolved`로 변경한 뒤 `map.md`의 결정 사항에 링크와 함께 요약 추가.
