### 타입 단언보다는 타입 선언을 사용하자

```ts
interface Person {
  name: string;
}

const alice: Person = { name: "Alice" }; // 타입선언
const bob = { name: "Bob" } as Person; // 타입할당
```

- 위와 같은 상황에선 문제가 없으나

```ts
interface Person {
  name: string;
}

const alice: Person = {}; // 타입선언
const bob = {} as Person; // 타입할당
```

- 위와 같은 상황에서 선언은 해당 인터페이스를 만족하는지 검사하여 오류가 발생하지만, 항할당은 강제적으로 타입을 지정한것임으로 오류를 발생한다.
- 안정성을 위해 타입 선언이 권장된다.

```ts
const peope = ["alice", "bob", "jan"].map((name) => ({ name }));
```

- 위와 같은 경우에 `Person` 인터페이스를 타입으로 가지는 요소들의 배열을 만들고 싶으면 할당을 이용해서 가능하다

```TS
const peope = ["alice", "bob", "jan"].map((name) => ({ name } as Person));
```

- 다만 이와 같은 문제는 객체가 비워져도 오류를 발생시키지 않음으로
- 선언을 이용하는 방식이 안정적이다.

```TS
const peope = ["alice", "bob", "jan"].map((name) => ({ const person : Person ={name}
return person } ));

// 간결한 버전
const peope = ["alice", "bob", "jan"].map((name) :Person => ({ name } ));
```

### dom에서 ts 사용

```ts
const elNull = document.getElemetById("foo"); // 타입은 HTMLElement|Null
const el = document.getElemetById("foo")!; // 타입은 HTMLElement|Null
```

- 접두사 `!`는 부정을 의미하지만 접미사 `!`는 `NULL`이 아니라는 단언문으로 해석된다.

### 꼭 타입을 할당해야한다면

```TS
const el = document.body as unknwon as Person
```
