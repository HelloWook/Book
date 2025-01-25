### thisType

-`매서드`들에 `this`를 한번에 방법이다.

```ts
const obj = {
  data: {
    money: 0,
  },
  methods: {
    addmoney(amount: number) {
      this.moeny += amonut;
    },
    useMoney(amount: number) {
      this.money += amount;
    },
  },
};
```

- 위 예시에서 `addmoney`와 `useMoney`에서 같은 `this`를 사용하고 싶지만 이 예제서 `this`는 `data`와 `obj`를 합친 값이다.

#### 타입 추가 버전

```ts
type Data = { money: number };
type Methods = {
  addMoney(this: Data & Methods, amount: number): void;
  useMoney(this: Data & Methods, amount: number): void;
};
type Obj = {
  data: Data;
  methods: Methods;
};
const obj: Obj = {
  data: {
    money: 0,
  },
  methods: {
    addMoney(amount) {
      this.money += amount;
    },
    useMoney(amount) {
      this.money -= amount;
    },
  },
};
```

- 다만 위경우에 this를 일일히 타이핑 해줘야하는 문제가 있다 이를 방지하기 위해

```ts
type Data = { money: number };
type Methods = {
  addMoney(amount: number): void;
  useMoney(amount: number): void;
};
type Obj = {
  data: Data;
  methods: Methods & ThisType<Data & Methods>;
};
const obj: Obj = {
  data: {
    money: 0,
  },
  methods: {
    addMoney(amount) {
      this.money += amount;
    },
    useMoney(amount) {
      this.money -= amount;
    },
  },
};
```

- `ThisType`을 활용해 위처럼 사용할 수 있다.

### foreach 만들기

```ts
[1, 2, 3] = myForeach(() => {});

interface Array<T> {
  myForEach(callback: (v: T, i: number, a: T[]) => void): void;
}
```

- `lib.es5.d.ts`의 타입도 정확하진 않다. 그 이유는 실행환경마다 `this`가 변경되기 떄문이다.
- 이렇든 실행되는 환경에 맞게 타입을 작성해야한다.

### map 만들기

- 100% 정확하게 타이핑 하는것은 매우 어려운일이다.

```ts
interface Array<T> {
  (...)
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
  (...)
}
```
