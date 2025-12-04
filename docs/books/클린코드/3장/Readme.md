### 작게 만들어라

- 함수에서 들어쓰기를 1단에서 2단을 넘기지마라
- 또 적은 줄 수의 코드를 작성하라
- 하나의 함수는 한 가지의 일만 해야한다.
- TO문단과(함수의 행동을 나열해서 함수의 단계를 추상화한다.)
- 섹션으로 나눔을 통해(함수에서 사용되는 키워드를 추출한다, `save`,`declartion`)
- 추상화 수준을 섞으면 헷갈린다. 그렇기에 함수를 나눌때 추상화수준을 동일시 해야한다.
- 함수는 위에서 아래로 내려가는 형식이여야한다.

### switch 문

```js
// 급여 계산 함수
function calculatePay(e) {
  switch (e.type) {
    case "COMMISSIONED":
      return calculateCommissionedPay(e); // 실제 급여 계산 함수 호출
    case "HOURLY":
      return calculateHourlyPay(e); // 실제 급여 계산 함수 호출
    case "SALARIED":
      return calculateSalariedPay(e); // 실제 급여 계산 함수 호출
    default:
      throw new InvalidEmployeeType(e.type); // 유효하지 않은 직원 타입 처리
  }
}

// 예외 처리 클래스 정의
class InvalidEmployeeType extends Error {
  constructor(type) {
    super(`Invalid employee type: ${type}`);
    this.name = "InvalidEmployeeType";
  }
}
```

- 위 함수는 함수가 긴 문제가 있다. 이 경우 다른 유형을 추가시 더 길어진다.
- `'한 가지'` 작업만 수행하지 않는다.
- SRP를 위반한다. (타입에 따라 다른 함수를 호출하기 때문)
- 네째 `OCP`를 위반한다. (직원을 추가시 마다 코드를 변경하기 때문 )
- 위를 완벽?하진 않지만 `추상팩토리`로 해결할 수 있다. (애초에 switch 자체가 ocp를 위반하지만 저자는 한번의 사용은 참는다고 말한다.)

참고 : https://refactoring.guru/ko/design-patterns/abstract-factory

```js
class Employee {
  isPayday() {
    throw new Error("isPayday()는 구현되어야 합니다.");
  }

  calculatePay() {
    throw new Error("calculatePay()는 구현되어야 합니다.");
  }

  deliverPay(pay) {
    throw new Error("deliverPay(pay)는 구현되어야 합니다.");
  }
}

class EmployeeFactory {
  makeEmployee(record) {
    throw new Error("makeEmployee(record)는 구현되어야 합니다.");
  }
}

// 팩토리는 생성의 역활만 맞게 되어 단 하나만의 책임을 가지게 되었다.
class EmployeeFactoryImpl extends EmployeeFactory {
  makeEmployee(record) {
    switch (record.type) {
      case "COMMISIONED":
        return new CommissionedEmployee(record);
      case "HOURLY":
        return new HourlyEmployee(record);
      case "SALARIED":
        return new SalariedEmployee(record);
      default:
        throw new Error(`InvalidEmployeeType: ${record.type}`);
    }
  }
}

class CommissionedEmployee extends Employee {
  constructor(record) {
    super();
    this.record = record;
  }
}

class HourlyEmployee extends Employee {
  constructor(record) {
    super();
    this.record = record;
  }
}

class SalariedEmployee extends Employee {
  constructor(record) {
    super();
    this.record = record;
  }
}
```

### 서줄적인 이름을 사용하라

- 함수가 하는 일을 좀 더 잘 표현할 수 있다.
- 길고 서술적인 이름이 짧고 어려운 이름보다 좋다.

### 함수 인수

- 이상적인 인수의 갯수는 `0~2`개이다.
- 플래그 인수는 좋지않다. 대놓고 여러가지를 처리한다고 공표하는 셈이기 때문이다.
- 객체를 생성해 인수를 줄이는 방법은 코드도 간결해지고, 의도도 더 명확해진다.

### 명령과 조회를 분리하라

- 함수는 뭔가에 답하거나 수행하는 역활만 가져야한다.

### 오류보다 예외를 사용해라

- 명령 함수에서 오류 코드를 반환하는 방식은 명령/조회 분리 규칙을 미묘하게 위반한다.

### try/catch 블록 뽑아내기

- try/catch는 코드 구조에 혼란을 일으키며 정상동작과, 오류 처리 동작을 뒤섞는다. 그러므로 try/catch 블록을 별도 함수로 뽑아내는 것이 구조적으로 좋다.

### 함수를 반복하지마라, 구조적 프로그래밍

- 구조적 프로그래밍은 좋은 방식이지만 큰 함수에서 효과가 좋지 작은 함수에서는 `break/continue` 사용이 상관없다.

### 함수를 짜는법

- 글짓기 처럼 짜라 함수는 읽기 좋게 하나의 흐름에 맞춰 짜야한다.

### 느낀 소감

- 현재 진행중인 프로젝트에서 테마에 따라 편지의 테마를 바꾸는 프로그램이 존재하는데 위 책을보며 내가 작성한 코드가 `ocp`와 `srp` 위반함을 깨달았다. 어서 빨리 리펙토링을 진행해야겠다.
