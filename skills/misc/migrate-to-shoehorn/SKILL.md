---
name: migrate-to-shoehorn
description: 테스트 파일의 `as` 타입 단언을 @total-typescript/shoehorn으로 마이그레이션합니다. 테스트 코드에서 타입 안전한 부분 객체(Partial) 데이터가 필요할 때 사용합니다.
---

# Shoehorn으로 마이그레이션 (Migrate to Shoehorn)

`shoehorn`은 TypeScript의 정적 검사를 유지하면서 테스트에서 부분(Partial) 데이터를 안전하게 전달할 수 있도록 해줍니다. `as` 단언을 대체합니다.

**테스트 코드 전용입니다. 프로덕션 코드에서는 사용하지 마세요.**

## 마이그레이션 패턴

- 거대한 객체에서 일부 속성만 필요할 때: `fromPartial({ ... })`
- 의도적으로 잘못된 타입 전달(에러 테스트): `fromAny({ ... })`

## 설치

```bash
npm i @total-typescript/shoehorn
```
