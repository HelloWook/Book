# 2장

## JSX

페이스북에 xml을 쉽게 처리하기 위해 만든 문법이다. 트랜스파일을 거쳐 자바스크립트가 이해할 수 있는 코드로 변경하는 것이 목표라 볼 수 있다.

## JSX의 정의 

### JSXElement
- JSX를 구성하는 가장 기본 요소
- HTML의 element와 비슷한 역할
- HTML 태그와 구분짓기 위해 대문자로 시작 (표준은 아님)

### JSXAttributes
JSXElement에 부여할 수 있는 속성

- **JSXSpreadAttributes**
  - 전개 연산자와 동일 (`{...props}`)

- **JSXAttribute**
  - 속성
  - **JSXAttributeKey**: 속성의 키
  - **JSXAttributeValue**: 속성의 값
    - `JSXElement` - 다른 JSX 요소가 들어갈 수 있음 (잘 안 쓰임)
    - `JSXFragment` - `<>...</>`

### JSXChildren
트리 구조인 JSX에서 JSXElement의 자식 값

- **JSXStrings**
  - 큰따옴표 문자열 (`"..."`)
  - 작은따옴표 문자열 (`'...'`)
  - **JSXText** - `{`, `<`, `>`, `}` 를 제외한 문자열


### Jsx는 어떻게 변환될까 

`@babel/plugin-transform-react-jsx`  리액트에서 JSX를 변환하는 플러그인

```jsx
const ComponentA = <A required={true}>Hello</A>

const ComponentB = <>Hello</>

const ComponentC = (
    <div>
        <p>Hello</p>
    </div>
)
```

```js
'use strict'

var ComponentA = React.createElement(A, { required: true }, 'Hello')
var ComponentB = React.createElement(React.Fragment, null, 'Hello')
var ComponentC = React.createElement('div', null,React.createElement('p', null, 'Hello'))

```

## 가상 DOM과 리엑트 파이버 

### DOM과 브라우저 렌더링 과정
1. 사용자가 요청한 주소를 방문해 HTML 파일 다운로드

2. 브라우저 렌더링 엔진이 HTML 파싱 이후 DOM 트리 생성

3. 2번 과정 중 CSS 파일을 만나면 해당 파일 다운로드

4. CSSOM 트리 생성

5. 2번의 DOM 노드를 순회. 이 때 사용자 화면에 보이는 요소만 방문

6. 5번 과정 중 눈에 보이는 노드에 대한 CSS 정보를 CSSOM에서 찾아 적용

- 레이아웃(layout, reflow) - 브라우저 화면의 어느 좌표에 나타나야 하는지 계산하는 과정
- 페인팅(painting) - 레이아웃 단계를 거친 노드에 색과 같은 실제 유효한 모습을 그리는 과정




