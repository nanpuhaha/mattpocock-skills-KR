# 좋은 테스트와 나쁜 테스트

## 좋은 테스트 (Good Tests)

**통합 스타일 (Integration-style)**: 내부 부품 모킹이 아니라 실제 공개 인터페이스를 통해 테스트합니다.

```typescript
// 좋은 예: 관찰 가능한 동작을 테스트함
test("유효한 장바구니로 결제를 완료할 수 있다", async () => {
  const cart = createCart();
  cart.add(product);
  const result = await checkout(cart, paymentMethod);
  expect(result.status).toBe("confirmed");
});
```

특징:
- 사용자나 호출자가 관심 있는 동작을 테스트
- 오직 공개 API만 사용
- 내부 리팩터링 후에도 깨지지 않고 유지됨
- '어떻게(HOW)'가 아니라 '무엇을(WHAT)' 하는지 기술
- 테스트당 하나의 논리적 단언

## 나쁜 테스트 (Bad Tests)

**구현 세부사항 결합 테스트 (Implementation-detail tests)**: 내부 구조에 종속적임.

```typescript
// 나쁜 예: 구현 세부사항을 테스트함
test("checkout이 paymentService.process를 호출한다", async () => {
  const mockPayment = jest.mock(paymentService);
  await checkout(cart, payment);
  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});
```

위험 신호 (Red flags):
- 내부 협력자 모킹
- 프라이빗 메서드 테스트
- 호출 횟수나 순서에 대한 단언
- 동작 변경이 없는데 리팩터링만으로 테스트가 깨짐
- 인터페이스를 우회하여 외부 수단으로 검증 (예: DB 직접 쿼리)

```typescript
// 나쁜 예: 인터페이스를 우회하여 검증
test("createUser가 데이터베이스에 저장한다", async () => {
  await createUser({ name: "Alice" });
  const row = await db.query("SELECT * FROM users WHERE name = ?", ["Alice"]);
  expect(row).toBeDefined();
});

// 좋은 예: 공개 인터페이스를 통해 검증
test("createUser로 생성된 사용자를 조회할 수 있다", async () => {
  const user = await createUser({ name: "Alice" });
  const retrieved = await getUser(user.id);
  expect(retrieved.name).toBe("Alice");
});
```

**동어반복 테스트 (Tautological tests)**: 기댓값이 구현 코드를 그대로 재계산하여 구조적으로 항상 통과함.

```typescript
// 나쁜 예: 코드가 계산하는 방식을 기댓값에서 똑같이 재계산
test("calculateTotal이 항목들을 합산한다", () => {
  const items = [{ price: 10 }, { price: 5 }];
  const expected = items.reduce((sum, i) => sum + i.price, 0);
  expect(calculateTotal(items)).toBe(expected);
});

// 좋은 예: 기댓값은 독립된 기지의 리터럴 값
test("calculateTotal이 항목들을 합산한다", () => {
  expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15);
});
```
