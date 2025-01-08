interface Person {
  first: string;
  last: string;
}

const p: Person = { first: "JANE", last: "JACOBS" };

// typeof는 타입으로 쓰일 때와 값으로 쓰일 때가 다른 기능을 한다.
type T1 = typeof p; // 타입은 Person8

const v1 = typeof p; // 값은 'object' => 런타임의 typeof 연산자

console.log(v1);
