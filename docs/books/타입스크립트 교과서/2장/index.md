### 타입스크립트의 에러 코드로 검색하자

- 타입스크릅티의 에러 메시지에는 항상 숫자가 있다.
- 위 숫자에 맞춰 검색을 하면 원하는 정보를 얻을 수 있다.

### 함수에 기능을 추가하는 데코레이터 함수가 있다.

```ts
function startAndEnd<This, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  function replacementMethod(this: This, ...args: Args): Return {
    console.log("start");
    const result = originalMethod.call(this, ...args);
    console.log("end");
    return result;
  }
  return replacementMethod;
}
```

#### contenxt 종류

- 어떤 문법을 장식하냐에 따라 context의 타입을 교체하면 됩니다.

```
• ClassDecoratorContext: 클래스 자체를 장식할 때

• ClassMethodDecoratorContext: 클래스 메서드를 장식할 때

• ClassGetterDecoratorContext: 클래스의 getter를 장식할 때

• ClassSetterDecoratorContext: 클래스의 setter를 장식할 때

• ClassMemberDecoratorContext: 클래스 멤버를 장식할 때

• ClassAccessorDecoratorContext: 클래스 accessor를 장식할 때

• ClassFieldDecoratorContext: 클래스 필드를 장식할 때
```

### 앰비언트 선언도 선언 병합이 가능하다

- `앰비언트 선언(declare)`을 위해서는 `declare` 예약어를 사용해야 한다.

#### 각 타입 표현방법

```ts
declare namespace NS {
  const v: string;
}
declare enum Enum {
  ADMIN = 1,
}
declare function func(param: number): string;
declare const variable: number;
declare class C {
  constructor(p1: string, p2: string);
}

new C(func(variable), NS.v);
```

![alt text](image.png)
