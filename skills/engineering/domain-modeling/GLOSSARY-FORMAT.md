# GLOSSARY.md 작성 형식

## 구조

```md
# {컨텍스트 이름}

{이 컨텍스트가 무엇이고 왜 존재하는지에 대한 1~2개 문장의 설명.}

## 도메인 언어 (Language)

**주문 (Order)**:
{해당 용어에 대한 1~2개 문장의 명확한 설명}
_지양할 표현_: 구매(Purchase), 트랜잭션(transaction)

**청구서 (Invoice)**:
배송 완료 후 고객에게 발송되는 결제 요청서.
_지양할 표현_: 계산서(Bill), 결제 요청(payment request)

**고객 (Customer)**:
주문을 접수하는 개인 또는 조직.
_지양할 표현_: 클라이언트(Client), 바이어(buyer), 계정(account)
```

## 작성 규칙

- **주관을 명확히 하세요.** 동일한 개념에 여러 단어가 쓰일 때는 최선의 단어 하나를 선택하고 나머지는 `_지양할 표현_`에 명시합니다.
- **정의는 간결하게 유지하세요.** 최대 1~2문장으로 끝냅니다. 무엇을 하는지가 아니라 그것이 *무엇인지(IS)* 를 정의합니다.
- **오직 이 프로젝트 도메인에 고유한 용어만 포함하세요.** 일반적인 프로그래밍 개념(타임아웃, 에러 타입, 유틸리티 패턴 등)은 프로젝트에서 자주 쓰이더라도 여기에 포함하지 않습니다.
- 자연스러운 묶음이 생기면 **소제목으로 그룹화**하세요.

## 단일 컨텍스트 vs 다중 컨텍스트 저장소

**단일 컨텍스트 (대부분의 저장소):** 저장소 루트에 단 하나의 `GLOSSARY.md` 생성.

**다중 컨텍스트:** 저장소 루트의 `GLOSSARY-MAP.md`에 각 컨텍스트의 위치와 상호 관계를 정의:

```md
# 용어집 맵 (Glossary Map)

## 컨텍스트 목록

- [Ordering](./src/ordering/GLOSSARY.md): 고객 주문 접수 및 추적
- [Billing](./src/billing/GLOSSARY.md): 청구서 발행 및 결제 처리
- [Fulfillment](./src/fulfillment/GLOSSARY.md): 물류 창고 피킹 및 배송 관리

## 관계

- **Ordering → Fulfillment**: Ordering이 `OrderPlaced` 이벤트를 발행하면 Fulfillment가 이를 수신하여 피킹 시작
- **Fulfillment → Billing**: Fulfillment가 `ShipmentDispatched` 이벤트를 발행하면 Billing이 수신하여 청구서 발행
- **Ordering ↔ Billing**: `CustomerId` 및 `Money` 공통 타입 공유
```

스킬은 적용할 구조를 다음과 같이 추론합니다:

- `GLOSSARY-MAP.md`가 존재하면 이를 읽어 컨텍스트들을 파악합니다
- 루트에 `GLOSSARY.md`만 존재하면 단일 컨텍스트입니다
- 둘 다 없으면 첫 번째 용어가 합의될 때 지연 생성(lazy create) 방식으로 루트 `GLOSSARY.md`를 만듭니다

여러 컨텍스트가 존재할 때는 현재 주제가 어떤 컨텍스트와 관련되어 있는지 추론합니다. 불명확한 경우 질문하세요.
