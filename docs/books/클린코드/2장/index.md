### 의도를 충분히 밝혀라

- 이름을 지을때는 존재 이유, 수행 기능, 사용방법이 드러나야한다.

```js
let d; // 좋지 못한 네이밍

let daysSinceCreation; // 좋은 네이밍
```

- 밑 코드는 의도가 드러나지 않아 짐작이 어렵다.

```js
const getTheme = () => {
  let list = [];

  for (let i = 0; i < list.length; i++) {
    if (list[0] === 4) {
      list.add(i);
    }
  }
  return list;
};
```

- 위 코드를 밑처럼 리펙토링 해보자
- 위 코드가 지뢰차기 코드임을 가정한다
- 의미를 명확하게 해 코드가 명확해졌다.

```js
const getFlagged = () => {
  let flaggedCells = [];

  flaggedCells.forEach((element, index) => {
    if (index === STATUS_VALUE) {
      if (element === Flagged) {
        flaggedCells.push(element);
      }
    }
  });
  return list;
};
```

### 그릇된 정보를 피해라

- 프로그래머는 코드에 그릇된 단서를 남겨서는 안된다.
- 여러 계정을 묶을 때 실제 List가 아니라면 accountLisft라 명명하지 마라 이는 그릇된 정보이다
- 올바른 네이밍은 `accountGroup`이나` bunchOfAccounts`라 명명하는것이 좋다
- 네이밍을 잘 짓는것 하나만으로 생산성을 크게 향상 시킬 수 있다.

### 의미 있게 구분하라

- 컴파일러나 인터프리터만 통과하려 하지마라
- 통과를 위해 불용어를 추가하는 방식은 적절치 못하다.
- 함수 이름으로 `source`와 `destination`을 사용한다면 코드 읽기가 훨씬 더 쉬워진다.

### 발음하기 쉬운 이름을 사용하라

- 발음하기 쉬운 이름은 기억력을 상승시킨다.

### 검색하기 쉬운 이름을 사용하라

- MAX_CLASSEDS_PER_STUDENT는 찾기 쉽지만 7은 어렵다
- 이름의 길이는 범위의 크기에 비례해야한다.
- 특정 숫자가 중복된다면 숫자를 분석해 알맞는 상수명을 붙여줘라

### 인코딩을 피하라

- 헝가리안 방식은 이전에 ide가 코드의 타입오류를 찾지 못할때 매우 유용했다.
- 다만 현대에서 들어선 불필요하다.

### 자신의 기억력을 믿지마라

- 프로그래밍에서는 명료함이 최고이다.

### 클래스와 매서드 네이밍

- 클래스는 명사 `ex) Customer`
- 매서드(함수)는 동사가 적절하다 `ex) getCustomers`

### 기발한 이름은 피해라

- 유머감각에 의해서 이름을 짓지마라
- `getMoney` 대신 `showMeTheMoney` 와 같은 네이밍은 좋지 않다.

### 한 개념에 한 단어를 사용해라

- 똑같은 클래스마다 `fetch`, `retrieve`, `get` 이런 네이밍은 좋지 않다.

### 말장난을 하지마라

- 지금까지 개념을 기존 값 2개를 더하는 개념을`add`로 정하고 코드를 작성하다가 집합에 특정 요소를 추가하는 것을 `add`라 칭하는것은 말장난이다. 이 경우네는 `insert`나 `append`가 더욱 적절하다.

### 해법 영역에서 가져온 이름을 사용하라

- 코드를 읽는 사람도 프로그래머이니 , 전산용어, 패턴 이름, 수학용어등을 사용해도 좋다

### 문제 영역에서 가져온 이름을 사용해라

- 적절한 해법영역의 네이밍이 존재하지 않으면 문제영역에서 가져와도 좋다.

- 둘의 구분이 잘 이해가 안가 찾아본 차이

```
해법 영역 이름은 프로그래머 사이에서 잘 알려진 기술적 용어를 사용.
예: enqueue, hashMap, binarySearch.

문제 영역 이름은 비즈니스 로직 또는 문제 도메인에서 친숙한 단어를 사용.
예: processOrder, calculateTax, updateAccountBalance.
```

### 의미 있는 맥락을 추가하라

- address,city 좋은 변수명이지만 이때 접두어를 붙여서 사용한다면 더욱 맥락적으로 분명해질 수 있다

### 불필요한 맥락을 없에라

- 일반적으로 짧은 이름이 긴이름보다 좋다.
- `GSDgsdAdress`와 `GSDMailingAdress` 둘은 필요한 중복을 가진다. `mailingAddress` 와 `accountAdress`가 더욱 직관적이고 좋은 이름이다.
