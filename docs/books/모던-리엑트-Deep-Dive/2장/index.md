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

이처럼 렌더링 과정에선 비용이 발생하는 spa 특성상 ssr처럼 처음부터 불러오는 방식이 아닌 방식은 변경된 위치를 기억해야하는 요구또한 존재하여 

큰 비용이 발생하게된다. 이를 해결하기 위해 리엑트는 가상돔을 구축했다.

### 리엑트 파이버란?

리엑트에서 관리하는 js 객체로 리엑트, 재조정자를 관리한다.

리엑트 파이버는 재조정요소에 대해 우선순 위를 매기거나, 이전의 작업을 재사용하고 폐기하는 작업을 비동기적으로 처리한다.

이전의 리엑트는 스택을 이용해서 동기적 처리를 했으나 이는 병목현상이 발생했고 이를 해결하기 위해 비동기적으로 처리하는 방식으로 변경했다.

## 클래스형 컴포넌트와 함수형 컴포넌트 

### 클래스형 컴포넌트 

클래스형 컴포넌트를 사용하면서 가장 자주 언급되는 것이 `생명주기(life cycle)`이다. 

함수형 컴포넌트의 훅과 달리 생명주기에 많이 의존해서 사용된다.

`render` : 생명주기 매서드 중 하나로 리엑트 클래스형컴포넌트의 유일한 필수 값으로 쓰인다. ui를 렌더링 하기 위해 쓰인다.

`componentDidMount` : 마운트 되었다면 그 다음으로 호출 되는 생명주기이다.

`componentDidUpdate` : 컴포넌트가 업데이트가 일어난 후 바로 실행 된다.

`componentWillUMount` : 컴포넌트가 언마운트되거나 더 이상 사용되지 않을시 호출된다.

`shouldCompoentUpdate` : 컴포넌트가 다시 리렌더링 되는 것을 막고 싶다면 사용한다.






