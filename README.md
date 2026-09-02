<p>
  <a href="https://www.aihero.dev/s/skills-newsletter">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skills-repo-dark_2x.png">
      <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png">
      <img alt="Skills" src="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png" width="369">
    </picture>
  </a>
</p>

# 진짜 엔지니어를 위한 AI 에이전트 스킬 (Skills For Real Engineers)

> **🇰🇷 한국어 번역 프로젝트 안내**
> 이 저장소는 [Matt Pocock](https://github.com/mattpocock)의 [mattpocock/skills](https://github.com/mattpocock/skills)를 한국어로 번역하고 매주 최신 변경사항을 자동으로 동기화하는 비공식 한국어화 포크입니다.
> - 원본 저장소: [mattpocock/skills](https://github.com/mattpocock/skills)
> - 원문 라이선스: MIT License

[![skills.sh](https://skills.sh/b/mattpocock/skills)](https://skills.sh/mattpocock/skills)

단순한 '바이브 코딩(vibe coding)'이 아닌, 실제 엔지니어링을 위해 매일 사용하는 AI 에이전트 스킬 모음입니다.

실제 프로덕션 애플리케이션을 개발하는 것은 어렵습니다. GSD, BMAD, Spec-Kit 같은 도구들은 개발 프로세스 전체를 스스로 통제하려 시도합니다. 하지만 그러는 과정에서 개발자의 통제권을 빼앗고, 프로세스 도중 발생하는 버그를 해결하기 어렵게 만듭니다.

여기에 포함된 스킬들은 작고, 쉽게 수정할 수 있으며, 조합하여 사용할 수 있도록 설계되었습니다. 모든 LLM 모델과 호환되며, 수십 년의 소프트웨어 엔지니어링 경험을 기반으로 제작되었습니다. 자유롭게 뜯어보고, 프로젝트에 맞게 수정하여 사용해보세요.

스킬 업데이트 및 새로운 스킬 소식을 받아보고 싶다면, 약 60,000명의 개발자가 구독 중인 뉴스레터에 참여할 수 있습니다:

[뉴스레터 구독하기](https://www.aihero.dev/s/skills-newsletter)

---

## 설치 방법 (30초 설정)

설치 방식은 크게 두 가지 철학으로 나뉩니다. **[Claude Code 플러그인](https://code.claude.com/docs/en/plugins)** 방식은 Anthropic 마켓플레이스가 릴리스를 반영할 때 자동 업데이트되는 관리형 읽기 전용 번들로 전체 스킬을 설치합니다(포크 대신 구독 방식). 반면 **[skills.sh](https://skills.sh/mattpocock/skills)** 방식은 프로젝트에 직접 수정 가능한 스킬 파일을 복사하여 내 입맛에 맞게 커스텀할 수 있도록 해줍니다. 둘 중 하나를 선택하세요: 둘 다 설치하면 모든 스킬이 중복 설치됩니다.

### 1. 스킬 설치하기

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude plugins install mattpocock-skills
```

또는 세션 내부에서 실행:

```
/plugin install mattpocock-skills
```

Claude Code 공식 마켓플레이스에 등록되어 있으므로 사전에 추가할 것이 없습니다. 플러그인을 찾을 수 없다고 나오면 `claude plugins marketplace update`를 실행한 후 다시 시도하세요. 업데이트는 Anthropic 마켓플레이스가 새 릴리스에 핀을 이동할 때 적용되며, 이 저장소보다 며칠 또는 몇 주 지연될 수 있습니다.

**이전 버전에 머물러 있나요?** `claude plugin list`를 실행하면 현재 설치된 버전을 확인할 수 있고, [CHANGELOG.md](./CHANGELOG.md)에서 최신 릴리스를 볼 수 있습니다. 이 저장소를 직접 추적하려면 저장소 자체 마켓플레이스로 전환하고 `/plugin` → Marketplaces에서 자동 업데이트를 활성화하세요(Anthropic 외부 마켓플레이스는 기본적으로 비활성화되어 있습니다):

```bash
claude plugin uninstall mattpocock-skills@claude-plugins-official
claude plugin marketplace add mattpocock/skills
claude plugin install mattpocock-skills@mattpocock
```

</details>

<details>
<summary><strong>Codex 및 기타 코딩 에이전트</strong></summary>

```bash
npx skills@latest add mattpocock/skills
```

원하는 스킬과 설치할 코딩 에이전트를 선택하세요. **설치 프로그램에서 스킬을 선택할 수 있으므로, 반드시 `setup-matt-pocock-skills`를 포함하여 설치해야 합니다.**

네이티브 Codex 플러그인 지원도 로드맵에 포함되어 있습니다 ([`.agents/adr/0002-ship-as-a-claude-code-plugin.md`](./.agents/adr/0002-ship-as-a-claude-code-plugin.md) 참고).

</details>

<details>
<summary><strong>직접 커스텀하고 싶은 개발자 (Tinkerers)</strong></summary>

Claude Code를 포함한 모든 에이전트에서 동일한 설치 프로그램을 사용하세요:

```bash
npx skills@latest add mattpocock/skills
```

이 명령어는 저장소에 사용자가 직접 소유하고 편집할 수 있는 일반 파일로 스킬을 작성합니다. 의도치 않게 자동으로 변경되지 않으며, 원작자의 최신 변경사항을 반영하고 싶을 때는 `npx skills update`를 실행하면 됩니다.

</details>

### 2. `/setup-matt-pocock-skills` 실행

사용 중인 에이전트에서 저장소당 1회 실행합니다. 다음 사항들을 대화형으로 설정합니다:

- 사용할 이슈 트래커 선택 (GitHub, GitLab, 로컬 파일 또는 사용자가 기술하는 다른 트래커)
- 티켓 분류 시 적용할 라벨 지정 (`/triage` 스킬에서 라벨 사용)
- 생성되는 문서들을 저장할 디렉토리 경로 지정

### 3. 설정 완료 - 이제 바로 사용할 수 있습니다!

---

## 이 스킬들이 존재하는 이유

Claude Code, Codex 및 기타 코딩 에이전트를 사용하면서 흔히 마주치는 실패 패턴들을 해결하기 위해 이 스킬들을 제작했습니다.

### #1: 에이전트가 내가 원하는 대로 작업하지 못함

> "어느 누구도 자기가 정확히 무엇을 원하는지 알지 못한다."
>
> 데이비드 토머스, 앤드루 헌트 저, [실용주의 프로그래머](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**문제점**: 소프트웨어 개발에서 가장 흔한 실패 원인은 '이해의 불일치(Misalignment)'입니다. 개발자가 내 의도를 정확히 알고 있다고 생각했지만, 만들어진 결과물을 보고 나서야 전혀 엉뚱하게 이해했음을 깨닫게 됩니다.

AI 시대에도 이는 완전히 똑같습니다. 사람과 에이전트 사이에는 여전히 소통의 간극이 존재합니다. 이에 대한 해결책은 바로 **심문(Grilling) 세션**입니다. 에이전트가 무엇을 만들고 있는지에 대해 사용자에게 아주 구체적인 질문을 끝없이 던지게 만드는 것입니다.

**해결책**:

- [`/grill-me`](./skills/productivity/grill-me/SKILL.md) - 일반/비코드 작업용 심문 스킬
- [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md) - [`/grill-me`](./skills/productivity/grill-me/SKILL.md)와 동일하지만 도메인 모델 및 문서화 기능 추가 (아래 참조)

이 스킬들은 가장 인기 있는 핵심 스킬입니다. 작업을 시작하기 전에 에이전트와 완벽하게 싱크를 맞추고, 변경하려는 내용에 대해 깊이 생각할 수 있도록 돕습니다. 코드 변경을 시작할 때마다 _항상_ 사용하세요.

---

### #2: 에이전트가 너무 장황하고 횡설수설함

> 유비쿼터스 언어(Ubiquitous Language)를 사용하면 개발자 간의 대화와 코드 표현이 모두 동일한 도메인 모델에서 파생된다.
>
> 에릭 에반스 저, [도메인 주도 설계(Domain-Driven Design)](https://www.amazon.co.uk/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

**문제점**: 프로젝트 초기에 개발자와 도메인 전문가(소프트웨어를 요청한 사람)는 대개 서로 다른 언어로 대화합니다.

AI 에이전트와의 작업에서도 동일한 긴장감이 발생합니다. 에이전트는 프로젝트에 처음 투입되어 맥락도 모른 채 전문 용어를 어림짐작해야 하므로, 단어 1개면 될 설명을 20개 단어로 늘여서 장황하게 말하게 됩니다.

**해결책**: 프로젝트 전용 '공유 언어(Shared Language)'를 정의하는 것입니다. 에이전트가 프로젝트에 쓰이는 용어를 정확히 해석할 수 있도록 돕는 문서입니다.

<details>
<summary>
실제 예시 보기
</summary>

제 `course-video-manager` 저장소의 실제 [용어집](https://github.com/mattpocock/course-video-manager/blob/076a5a7a182db0fe1e62971dd7a68bcadf010f1c/CONTEXT.md) 예시입니다(스킬 규칙이 변경되기 전 고정 커밋이므로 여전히 `CONTEXT.md`로 명명되어 있습니다). 어느 쪽이 더 읽기 쉬울까요?

- **적용 전**: "강의의 특정 섹션 안에 있는 레슨이 '실체화(즉, 파일 시스템에 실제 위치가 부여됨)'될 때 발생하는 문제가 있습니다."
- **적용 후**: "구체화 연쇄(materialization cascade)에 문제가 있습니다."

이러한 간결함은 세션이 거듭될수록 엄청난 생산성 향상으로 이어집니다.

</details>

이 기능은 [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md)에 내장되어 있습니다. 심문 세션을 진행하면서 AI와 공유 언어를 구축하고, 설명하기 까다로운 결정 사항들을 ADR(아키텍처 결정 기록)로 문서화합니다.

이 기법이 얼마나 강력한지는 직접 경험해보면 알 수 있습니다. 이 저장소에서 가장 혁신적인 테크닉 중 하나입니다.

> [!TIP]
> 공유 언어는 장황함을 줄이는 것 외에도 수많은 장점을 제공합니다:
>
> - 공유 언어를 기반으로 **변수, 함수, 파일 이름이 일관되게 명명**됩니다.
> - 그 결과, 에이전트가 **코드베이스를 훨씬 쉽게 파악하고 탐색**할 수 있습니다.
> - 더 간결한 용어를 사용하므로 에이전트가 **생각(Thinking)하는 데 소모하는 토큰을 대폭 절약**할 수 있습니다.

---

### #3: 에이전트가 작성한 코드가 작동하지 않음

> "항상 작고 신중한 단계를 밟아라. 피드백의 빈도가 곧 당신의 속도 제한선이다. 결코 감당하기 어려울 만큼 큰 작업을 한 번에 맡지 마라."
>
> 데이비드 토머스, 앤드루 헌트 저, [실용주의 프로그래머](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**문제점**: 에이전트와 무엇을 만들지 완전히 합의했다고 칩시다. 그런데도 에이전트가 엉터리 코드를 작성한다면 어떻게 해야 할까요?

피드백 루프(Feedback Loop)를 점검해야 합니다. 자신이 작성한 코드가 실제로 어떻게 실행되는지 즉각적인 피드백을 받지 못하면 에이전트는 눈을 감고 비행하는 것과 같습니다.

**해결책**: 정적 타입 시스템, 브라우저 접근, 자동화된 테스트 등 탄탄한 피드백 루프 세트를 마련해야 합니다.

자동화 테스트에서는 Red-Green-Refactor 루프가 핵심입니다. 에이전트가 먼저 실패하는 테스트를 작성하고, 그 테스트를 통과시키는 방식으로 작업하도록 유도합니다. 이를 통해 에이전트가 일관된 피드백을 받아 훨씬 완성도 높은 코드를 생산할 수 있습니다.

- **[`/tdd`](./skills/engineering/tdd/SKILL.md)**: Red-Green-Refactor 루프를 강제하며 좋은 테스트와 나쁜 테스트에 대한 지침을 제공하는 스킬입니다.
- **[`/diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md)**: 까다로운 버그 디버깅을 체계적인 단계별 루프로 해결하는 스킬입니다.

---

### #4: 거대한 진흙탕 코드(Ball of Mud)가 만들어짐

> "시스템의 설계에 _매일_ 투자하라."
>
> 켄트 벡 저, [익스트림 프로그래밍(Extreme Programming Explained)](https://www.amazon.co.uk/Extreme-Programming-Explained-Embrace-Change/dp/0321278658)

> "가장 좋은 모듈은 '깊은(Deep)' 모듈이다. 단순한 인터페이스를 통해 방대한 기능을 제공할 수 있어야 한다."
>
> 존 오스터하우트 저, [소프트웨어 설계의 철학(A Philosophy Of Software Design)](https://www.amazon.co.uk/Philosophy-Software-Design-2nd/dp/173210221X)

**문제점**: AI 에이전트로 작성된 대부분의 애플리케이션은 복잡하고 수정하기 어렵습니다. 에이전트가 코딩 속도를 극적으로 높여주는 만큼, 소프트웨어 엔트로피(무질서도) 역시 가속화되기 때문입니다. 코드베이스의 복잡도가 전례 없이 빠른 속도로 증가합니다.

**해결책**: AI 기반 개발에서도 '코드 설계(Design)'에 진지하게 관심을 기울이는 것입니다.

이 설계 철학은 스킬의 모든 계층에 녹아 있습니다:

- [`/to-spec`](./skills/engineering/to-spec/SKILL.md)은 스펙을 작성하기 전 어떤 모듈을 수정할 것인지 질문합니다.
- [`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md)는 코드베이스 전체를 조사하여 모듈을 더 깊고 견고하게 개선할 기회를 찾아 시각적 HTML 리포트로 제공합니다. (며칠에 한 번씩 실행하는 것을 권장합니다.)

---

### 요약

소프트웨어 엔지니어링의 기본 원칙은 그 어느 때보다 중요해졌습니다. 이 스킬들은 엔지니어링 기본기를 반복 가능한 실천법으로 압축하여, 여러분이 최고의 소프트웨어를 개발할 수 있도록 돕습니다.

---

## 스킬 레퍼런스 (Skill Reference)

이 스킬들은 호출 주체에 따라 2가지로 분류됩니다.
- **사용자 호출(User-invoked)** 스킬: 사용자가 직접 명령어를 입력해야만 실행됩니다 (예: `/grill-me`). 전체 흐름을 조율(오케스트레이션)하는 역할을 합니다.
- **모델 호출(Model-invoked)** 스킬: 사용자가 직접 호출할 수도 있고, 에이전트가 작업 상황에 맞춰 자율적으로 호출할 수도 있습니다. 재사용 가능한 엔지니어링 원칙과 규율을 담고 있습니다.

> 사용자 호출 스킬은 모델 호출 스킬을 하위로 호출할 수 있지만, 다른 사용자 호출 스킬을 직접 호출하지는 않습니다.

### 엔지니어링 스킬 (Engineering)

실제 코드 작업을 위해 매일 사용하는 스킬 모음입니다.

#### 사용자 호출 (User-invoked)

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)**: 현재 상황에 어떤 스킬이나 워크플로우가 적합한지 안내해주는 라우터 스킬.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)**: 심문 세션을 통해 프로젝트의 도메인 모델을 구축하고 용어를 다듬으며 `GLOSSARY.md` 및 ADR을 함께 작성·업데이트.
- **[triage](./skills/engineering/triage/SKILL.md)**: 이슈를 체계적인 분류 역할 상태 머신에 따라 분류하고 라벨링.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)**: 코드베이스를 스캔하여 모듈 심화(Deepening) 기회를 탐색하고, 시각적 HTML 리포트로 제시한 뒤 선택한 대상에 대해 심문 진행.
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)**: 엔지니어링 스킬 사용에 필요한 저장소 설정(이슈 트래커, 분류 라벨, 도메인 문서 구조 등)을 구성 (저장소당 1회 실행).
- **[to-spec](./skills/engineering/to-spec/SKILL.md)**: 현재 대화 내용을 체계적인 기술 스펙(Spec)으로 정리하여 이슈 트래커에 등록 (별도 인터뷰 없이 대화 내용 종합).
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)**: 계획, 스펙, 대화 내용을 블로킹 의존 관계가 명시된 트레이서 불릿(Tracer-bullet) 티켓 세트로 분할하여 로컬 파일이나 실제 이슈 트래커에 등록.
- **[implement](./skills/engineering/implement/SKILL.md)**: 스펙이나 티켓에 정의된 작업을 구현하며, 사전 합의된 경계에서 `/tdd`를 실행하고 커밋 전 `/code-review`로 마무리.
- **[implement-spec](./skills/engineering/implement-spec/SKILL.md)**: 단일 통합 브랜치에서 전체 스펙을 구현. 티켓을 작업 그래프로 다루며, 준비된 프론티어 전반에 걸쳐 구현자 서브에이전트를 실행하여 동시성을 극대화한 후 `/code-review`로 마무리.
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)**: 단일 에이전트 세션에 담기 어려운 대규모 작업을 이슈 트래커의 결정 티켓 맵으로 설계하고 단계별로 해결.
- **[retro](./skills/engineering/retro/SKILL.md)**: 세션 종료 후 코딩 에이전트 환경(탐색, 자동화된 검사, 코딩 표준, 가이드 파일, 도구 등)의 개선 사항을 심각도가 높은 순서대로 제안.

#### 모델 호출 (Model-invoked)

- **[prototype](./skills/engineering/prototype/SKILL.md)**: 설계 의문을 검증하기 위한 1회용 프로토타입 제작 (단일 HTML 상태/로직 프로토타입 또는 토글 가능한 다중 UI 프로토타입).
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)**: 난해한 버그와 성능 저하를 위한 규율 있는 진단 루프 (실패 재현 → 최소화 → 가설 수립 → 계측 → 수정 → 회귀 테스트).
- **[research](./skills/engineering/research/SKILL.md)**: 신뢰할 수 있는 1차 출처를 조사하여 출처가 명시된 마크다운 보고서로 작성 (백그라운드 에이전트로 실행).
- **[tdd](./skills/engineering/tdd/SKILL.md)**: Red-Green-Refactor 루프를 통한 테스트 주도 개발. 기능을 수직 슬라이스 단위로 안전하게 개발.
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)**: 프로젝트 도메인 모델을 구축하고 용어집과 대조 검증하며, 엣지 케이스 시나리오를 스트레스 테스트하고 `GLOSSARY.md` 및 ADR 갱신.
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)**: 깊은 모듈 설계를 위한 공유 규율 및 어휘 (작은 인터페이스 뒤에 많은 동작을 은닉하고 명확한 경계에서 인터페이스를 통해 테스트 가능하도록 설계).
- **[code-review](./skills/engineering/code-review/SKILL.md)**: 기준점(commit/branch) 이후의 diff를 2개 축으로 병렬 리뷰: **Standards**(코드 표준 및 파울러 코드 스멜 준수 여부)와 **Spec**(원래 요구사항 충실 구현 여부).
- **[pr](./skills/engineering/pr/SKILL.md)**: 풀 리퀘스트 본문의 바람직한 구조를 정의: 변경 사항을 명확히 전달하는 가장 간결한 시각적 요약, 동작을 증명하는 전/후 근거 자료, 병합 위험도 판단(단방향/양방향 결정, 폭발 반경).
- **[wizard](./skills/engineering/wizard/SKILL.md)**: 사람이 직접 수행해야 하는 작업(인프라 프로비저닝, 자격증명/비밀값 설정, 대시보드 조작, 마이그레이션 등)을 안내하는 대화형 Bash 위저드 생성.

---

### 생산성 스킬 (Productivity)

코드에 국한되지 않는 범용적인 워크플로우 도구입니다.

#### 사용자 호출 (User-invoked)

- **[grill-me](./skills/productivity/grill-me/SKILL.md)**: 계획이나 설계 트리의 모든 분기가 해결될 때까지 집요하게 질문을 던지는 심문 인터뷰 스킬.
- **[handoff](./skills/productivity/handoff/SKILL.md)**: 다른 에이전트가 작업을 즉시 이어받을 수 있도록 현재 대화 내용을 핸드오프 인수인계 문서로 압축 정리.
- **[teach](./skills/productivity/teach/SKILL.md)**: 현재 디렉토리를 상태 유지 학습 작업 공간으로 활용하여 여러 세션에 걸쳐 사용자에게 새로운 개념과 스킬을 강의.
- **[to-questionnaire](./skills/productivity/to-questionnaire/SKILL.md)**: 혼자 결정할 수 없는 문제를 담당자에게 보낼 수 있는 마크다운 설문지 형태로 변환(비동기 작성 또는 회의 시 활용). 주제 자체가 아니라 전달 대상과 받아야 할 피드백에 대해 심문 진행.
- **[wait-what](./skills/productivity/wait-what/SKILL.md)**: 에이전트의 설명이 와닿지 않을 때 즉시 실행하면 누락된 맥락을 `GLOSSARY.md` 어휘를 활용해 알기 쉽게 다시 설명.

#### 모델 호출 (Model-invoked)

- **[grilling](./skills/productivity/grilling/SKILL.md)**: 계획, 결정, 아이디어의 모든 분기가 해결될 때까지 사용자를 집요하게 인터뷰하는 핵심 심문 프리미티브 (`grill-me`, `grill-with-docs`, `triage`, `wayfinder`, `improve-codebase-architecture`의 기반).
- **[writing-for-agents](./skills/productivity/writing-for-agents/SKILL.md)**: AI 에이전트를 위한 문서 작성 지침 (스킬 문서, AGENTS.md/CLAUDE.md 및 포인터 참조 문서 작성법).
