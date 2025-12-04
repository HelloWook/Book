## any 타입 지향하기

- 타입스크립트의 타입 시스템은 점진적이고, 선택적이다.
- 코드에 타입을 조금씩 추가할 수 있기 때문에 점진적이고, 언제든지 타입 체크를 해제할 수 있기 때문에 선택적이다.

```ts
let age: number;
// as를 이용해 런타임 환경에 any로 규정해 오류를 해결할 수 있다.
age = "12" as any;
```

- 다만 이러한 방식은 문제가 발생한다.

### any 타입에는 타입 안전성이 없다.

- `age`는 `number` 타입으로 선언되어있다. 그러나 `as`를 사용하면 `string` 타입을 할당할 수 있게 되고 타입체커는 선언에 따라 `number` 타입으로 판단하게 되며 문제는 발생한다.

### any는 함수 시그니처를 무시해버린다.

- 함수를 작성시에는 시그니처를 작성해야한다. `any` 타입을 사용하면 이러한 시그니처 약속을 어길 수 있다.

```ts
function calc(x: number): number {
  return x + 1;
}
let a: any = "1";
// 타입을 무시하고 값을 넣을 수 있게된다.
calc(a);
```

### any 타입에는 언어 서비스가 적용되지 않는다.

- 자동완성 기능과 적절한 도움말을 제공하는데 `any` 키워드는 이를 지원받지 못한다.

### 타입스크립트는 리펙토링시 버그를 감춘다.

```ts
interface ComponentProps {
  onSelectItme: (item: any) => void;
}

function renderSelector(props: ComponentProps) {}

let selectId: number = 0;

function handleSelectItem(item: any) {
  selectId = item.id;
}
renderSelector({ onSelectItme: handleSelectItem });
```

- 컴포넌트를 수정하고, 타입 체크를 모두 통과했다.
- 그럼에도 불구하고 위 코드는 에러를 생성한다.

### any는 타입의 설계를 감춘다.

- 깔끔 정확한 명료 코드 작성을 위해선 제대로 된 타입의 설계는 필수인데 상태 객체의 설께를 감춰버린다.

### any는 타입 시스템의 신뢰도를 떨어트린다.

- `any` 키워드는 타입 체커에서 걸리지 않기 때문에 런타임 환경에서 타입 체커의 도움을 받지 못한다.
