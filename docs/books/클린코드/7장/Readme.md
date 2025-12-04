### try-catch-finally 문부터 작성하라

- 발생한 코드의 흐름인 try-catch-finally 흐름을 먼저 작성해라.
- 이후 TDD를 사용해 필요한 나머지 논리의 흐름을 추가하는 것이 좋다.

| **구분**          | **Checked Exception**                          | **Unchecked Exception**                       |
| ----------------- | ---------------------------------------------- | --------------------------------------------- |
| **확인 시점**     | 컴파일 시점                                    | 런타임 시점                                   |
| **처리 여부**     | 반드시 처리해야 함 (`try-catch` 또는 `throws`) | 명시적으로 처리하지 않아도 됨                 |
| **트랜잭션 처리** | Roll-back 하지 않음                            | Roll-back 함                                  |
| **예시**          | `IOException`, `ClassNotFoundException`        | `NullPointerException`, `ArithmeticException` |

### 미확인 예외를 사용해라

- 확인된 예외는 OCP를 위반한다. 매서드에서 확인된 예외를 던졌는데 catch 블록이 세 단계 위에 있는경우
- 선언부서 해당 예외를 정의해야하고 하위단계에서 수정시 위 부분을 모두 수정해야한다.

### 예외에 의미를 제공하라

- 오류 메시지에 정보를 담아 예외를 던져야 catch 블록에서 오류를 기록하도록 할 수있다.

### 정상 흐름을 정의하라

중단이 적합하지 않은 때도 있다. **"특수 사례 패턴"**을 사용해 예외를 캡슐화하면 클라이언트 코드가 예외를 처리할 필요가 없다.

---

#### **Before (예외를 직접 처리하는 코드)**

```javascript
try {
  const expenses = getMeals(employeeId);
  total += expenses.total;
} catch (e) {
  total += getDefaultMealCost(); // 기본 식비 처리
}
```

#### **After (정상 흐름을 기술)**

```JS
function getMeals(employeeId) {
  const expenses = fetchExpensesFromDB(employeeId);
  return expenses || new DefaultMealExpenses(); // 특수 객체 반환
}

class DefaultMealExpenses {
  get total() {
    return 20; // 기본값 반환
  }
}
```

### null을 전달하지말라

- `NULL` 을 전달하게되면 `IF`로 검사를 해줘야하는 문제가 발생한다.

```JS

function processUser(user) {
  if (user == null) {
    console.error("Invalid user");
    return;
  }
  console.log(user.name);
}

processUser(null);
```

#### **After (기본 값을 제공해라)**

```JS
function processUser(user = { name: 'Guest' }) {
  console.log(user.name);
}

processUser(); // 기본 객체 사용
```

### 소감

- `try-catch` 흐름을 다시금 되새겨 볼 수 있어서 매우 유익했다.
- 미확인 에러 부분은 자바스크립트에서는 에러가 대부분이 미확인 예외 에러라서 그냥 참고용으로 알고 있으면 좋을 것 같다.

### 경계 살피고 익히기

- 외부 코드를 사용하면 적은 시간에 더 많은 기능을 출시하기 쉬워진다.
- 외부 코드의 테스트는 우리 책임이 아니지만 우리 자신을 위해 사용할 코드를 테스트하는 편이 바람직 하다.
