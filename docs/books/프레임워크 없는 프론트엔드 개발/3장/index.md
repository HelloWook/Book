### YAGNI 법칙

- **You ain't gonna need it** : 필요하기전에 하지마라
- 프레임워크 또한 마찬가지다 필요할 떄 사용해라. 필요하지 않는 프레임워크를 과도하게 설계해 관리하는 것은 좋지 못하다.

### DOM 이번트 법칙

- 이벤트는 웹 어플리케이션에서 발생하는 동작으로 트리거 한 DOM요소에 연결되어 사용한다.

#### 속성에 핸들러 연결

- 이벤트 헨들러를 DOM 요소에 연결하는 방법으로 `on` 속성을 사용한다.

```js
const button = document.querySelector("button");
button.onClick = () => {
  console.log("클릭");
};
```

- 다만 이 방법은 onClick() 핸들러를 덮어 쓰면 원래 핸들러가 손실되기 떄문에 좋지 않은 방식이다
- 이를 해결하기 위해 `addEvnetListner`를 사용한다.
- 이벤트 핸들러는 이벤트 객체를 가진다.

- 이벤트 핸들러는 기본적으로 `버블링`이다. 즉 하위 요소 이벤트가 호출하면 조상의 요소도 호출하는 것이다.

```js
<div>
  <button>나 자식</button>
</div>;

const button = document.querySelector("button");
button.onClick = () => {
  console.log("버튼 클릭");
  // 버블링을 방지
  stop.progation();
};

const div = document.querySelector("div");
div.onClick = () => {
  console.log("디브 클릭");
};

//버튼 클릭
// 디브 클릭
```

- `addEventListner`에서 `true`로 사용하면 `캡쳐링`으로 진행된다.

### 이벤트 처리 아키텍처

- 프레임워크는 이벤트 처리 엔진은 다음과 같다.

---

초기 상태 => 렌더링 => 이벤트 => 새로운 상태 => 렌더링

---

### 이벤트 위임

- 버블링을 활용하여 부모요소에 이벤트를 위임해 이벤트 위임을 처리한다.
