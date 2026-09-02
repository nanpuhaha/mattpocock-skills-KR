# 언제 모킹(Mock)해야 하는가

오직 **시스템 경계(System boundaries)** 에서만 모킹하세요:

- 외부 API (결제, 이메일 등)
- 데이터베이스 (가급적 실제 테스트 DB 사용 권장)
- 시간 / 난수
- 파일 시스템 (필요 시)

다음과 같은 것들은 **절대 모킹하지 마세요**:
- 직접 작성한 클래스 / 모듈
- 내부 협력자
- 스스로 통제할 수 있는 모든 것

## 모킹 용이성을 위한 설계 (Designing for Mockability)

시스템 경계에서 모킹하기 쉬운 인터페이스를 설계하세요:

**1. 의존성 주입(Dependency Injection) 사용**

외부 의존성을 내부에서 직접 생성하지 말고 인자로 주입받으세요:

```typescript
// 모킹하기 쉬움
function processPayment(order, paymentClient) {
  return paymentClient.charge(order.total);
}

// 모킹하기 어려움
function processPayment(order) {
  const client = new StripeClient(process.env.STRIPE_KEY);
  return client.charge(order.total);
}
```

**2. 범용 fetcher 대신 SDK 스타일 인터페이스 선호**

조건문이 들어간 하나의 거대한 범용 함수 대신, 각 외부 작업별 전용 함수를 만드세요:

```typescript
// 좋은 예: 각 함수가 독립적으로 모킹 가능
const api = {
  getUser: (id) => fetch(`/users/${id}`),
  getOrders: (userId) => fetch(`/users/${userId}/orders`),
  createOrder: (data) => fetch('/orders', { method: 'POST', body: data }),
};

// 나쁜 예: 목 설정 내부에 조건문 분기가 필요함
const api = {
  fetch: (endpoint, options) => fetch(endpoint, options),
};
```
