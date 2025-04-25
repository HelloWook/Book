### 렌더링

- 웹 용 렌더링 엔진을 설계할 때는 `가독성`과 `유지 관리성`을 염두에 둬야한다.

- 렌더링 성능을 측정해보고 싶다면 `requestAnimationFrame`을 이용해 현재 렌더링 사이클과 다음 사이클 사이의 시간을 추적하고 콜백이 1초내에 호출되는 횟수를 추적하면 된다.

### 렌더링 함수

```js
view = f(state);
```

### 순수 함수 렌더링

```js
const { currentFilter, todos } = state;

const element = targetElement.cloneNode(true);

const list = element.querySelector(".todo-list");
const counter = element.querySelector(".todo-count");
const filters = element.querySelector(".filters");

list.innerHTML = todos.map(getTodoElement).join("");
counter.textContent = getTodoCount(todos);

Array.from(filters.querySelectorAll("li a")).forEach((a) => {
  if (a.textContent === currentFilter) {
    a.classList.add("selected");
  } else {
    a.classList.remove("selected");
  }
});
```

- 위 코드는 가상의 `DOM`을 이용해 UI를 업데이트 하는 코드이다.
- `CloneNode` 매서드를 이용해 기존 노드를 복사 후
- `requestAnimationFrame`을 이용한 렌더링 엔진을 기반으로 `DOM`을 조작한다.

---

`requestAnimationFrame` 인 이유 :이벤트 루프 렌더링 주기를 맞추기 위해

자세한 설명은 벨로그에 작성 해놓음
https://velog.io/@asdasdzf/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EB%9E%80%EC%99%80-%EB%A0%8C%EB%8D%94%EB%A7%81

---

#### 흐름

브라우저 렌더링 -> 렌더링 대기 -> 가상 노드 생성 -> DOM 조작 -> 브라우저 렌더링

### 동적인 데이터 렌더링

- 그렇다면 만일 5초마다 상태를 변경하는 경우에는 어떻게 되는가

```js
const render() =>{
    window.requestAnimationFrame(()=>{
        const main = doucument.querySelector('.todoapp')
        const newMain = registry.renderRoot(main,state)
        main.replaceWith(newMain)
    })
}

window.setInterval(()=>{
    state.todos. = getTodos()
    render()
},5000)

```

- 다음과 같이 5초마다 수정하면 될까?
- 이는 프로젝트의 성능을 저하시키는 좋지 않는 생각이다.

### 가상DOM

- 이를 위해 사용하는 것이 가상 `DOM`이다. 실제 `DOM`과 동기화를 가져가며 조정을 진행한다.

```
<ul>
<li/>
<li/>
</ul>
```

- 이전의 코드는 모든 `ul`을 바꿨다면 가상 `dom`에선 필요한 부분의 `li`만 변경한다.

- 이를 위해 `diff 알고리즘` 을 사용한다.

```js
const render() =>{
       window.requestAnimationFrame(()=>{
        const main = doucument.querySelector('.todoapp')
        const newMain = registry.renderRoot(main,state)
       apply.diff(document.body, main, new Main)
    })
}
```

### apply diff 함수

```js
const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;

  // 속성수가 다를 경우
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }
  // 하나 이상의 속성이 변경된 경우
  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) {
    return true;
  }

  // 노드에는 자식이 없으며 텍스트 컨텐트가 다를경우
  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

const applyDiff = (parentNode, realNode, virtualNode) => {
  // 새 노드가 정의되지 않은 경우 실제 노드를 삭제한다.
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }
  // 가상 노드가 존재하는 경우 부모 노드에 추가한다.
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // 두 노드가 모두 정의된 경우 두 노드간의 차이가 있는지 확인한다.
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
```
