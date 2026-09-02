---
name: setup-pre-commit
description: 현재 저장소에 Husky, lint-staged (Prettier), 타입 검사, 테스트 pre-commit 훅을 설정합니다.
---

# Pre-Commit 훅 설정 (Setup Pre-Commit Hooks)

저장소에 Husky 기반의 Pre-commit 훅과 lint-staged(Prettier), 타입 검사, 테스트 파이프라인을 구축합니다.

## 구성 내용

- **Husky** pre-commit 훅
- **lint-staged**: 스테이징된 파일에 대한 Prettier 포맷팅
- **Prettier** 설정 파일
- **typecheck** 및 **test** 실행

## 단계

1. 패키지 매니저 감지
2. `husky lint-staged prettier` 설치
3. `npx husky init` 실행
4. `.husky/pre-commit`, `.lintstagedrc`, `.prettierrc` 생성
5. `npx lint-staged` 및 커밋으로 검증
