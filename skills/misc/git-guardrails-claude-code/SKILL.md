---
name: git-guardrails-claude-code
description: 위험한 Git 명령어(push, reset --hard, clean, branch -D 등) 실행을 사전에 차단하는 Claude Code 훅을 설정합니다.
---

# Git 안전 가드레일 설정 (Setup Git Guardrails)

Claude가 위험한 Git 명령어를 실행하기 전에 이를 가로채서 차단하는 PreToolUse 훅을 설정합니다.

## 차단 대상 명령어

- `git push` (`--force` 포함 전체)
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .` / `git restore .`

## 단계

1. **적용 범위 질문**: 현재 프로젝트 전용(`.claude/settings.json`) vs 전체 프로젝트 전역(`~/.claude/settings.json`)
2. **스크립트 복사**: 대상 위치로 `scripts/block-dangerous-git.sh` 복사 후 `chmod +x`
3. **설정에 훅 등록**: `.claude/settings.json`에 `PreToolUse` 훅 추가
4. **커스텀 여부 확인**: 추가로 차단하거나 허용할 패턴 수정
5. **검증**: 테스트 명령어로 차단(Exit code 2 및 BLOCKED 메시지) 확인
