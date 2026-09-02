---
name: setup-ts-deep-modules
description: TypeScript 저장소에 dependency-cruiser를 구성하여 각 패키지가 깊은 모듈(하위 폴더 구현체는 숨기고 루트 진입점 파일을 통해서만 접근)이 되도록 강제합니다.
disable-model-invocation: true
---

# TypeScript 깊은 모듈 설정 (Setup TS Deep Modules)

저장소의 각 패키지를 **깊은 모듈(Deep module)** 로 만듭니다: 작은 인터페이스 뒤에 많은 구현을 숨깁니다. 패키지의 공개 표면은 **진입점(Entry points)** (패키지 루트의 파일들)뿐이며, 하위 폴더의 모든 것은 외부로부터 숨겨집니다.

이 스킬은 [dependency-cruiser](https://github.com/sverweij/dependency-cruiser)를 설치하고 규칙을 적용합니다.

## 강제되는 구조

```
src/packages/
  <name>/
    index.ts        ← 진입점 (공개). 외부에서 import 가능.
    client.ts       ← 또 다른 진입점. 여러 개의 진입점 노출 가능.
    lib/            ← 구현체: 외부에서 숨겨짐, 내부끼리는 자유롭게 import.
    tests/          ← 테스트 및 픽스처 (하위 폴더이므로 비공개).
```

4가지 엄격한 규칙:
1. **진입점 경계**: 패키지 외부 코드는 해당 패키지의 루트 진입점 파일만 import 가능.
2. **패키지 내부 자유**: 동일 패키지 내부 파일들끼리는 자유롭게 import 가능.
3. **진입점을 통한 테스트**: 테스트 파일도 패키지 내부 깊은 import(deep import) 금지, 공개 진입점을 통해서만 테스트.
4. **순환 참조 금지**: 의존성 사이클 금지.
