### 암묵적 입력과 출력은 적을수록 좋다.

- 인자가 아닌 모든 입력과 리턴은 암묵적이며 이는 없을 수록 좋다.

- 암묵적 입력과 출력은 다른 컴포넌트와 강하게 연결되었음을 의미하며, 다른 곳에서 사용할 수 업식에 모듈이 아니다.

### 카피온 라이트 빼내기

```js
const new_cart = cart.slice();
new_cart.push(item);
return new_cart;
```

- 위 함수는 재사용성이 좋지만 이름은 장바구니에서만 써야할 것 같습니다.
- 이를 공통성 있는 함수로 변경을 위해선 네이밍을 수정한다.

```js

const add_element_last (array, elem) =>{
    var new_array = array.slice();
    new_array.push(elem);
    return new_array
}
```

- 이름을 바꾼것만으로도 이 함수는 재사용성이 극대화된 utilty 함수가 되었음을 알 수 있다.
- 이를 바탕으로 이 함수를 포팅해 사용이 가능하다.
- 이를 이용해 각 함수는 데이터의 구조를 알지 않아도 되는 형식으로 바꼈다.

```js
const add_new_cart = (cart, item) = > {
    return add_element_last(cart,item)
}
```

## 모든 동작 불변형으로 만들기

### 에시

#### 장바구니 동작

1. 제품 갯수 가져오기
2. 제품 이름으로 제품 가져오기
3. 제품 추가하기
4. 제품 이름으로 제품 빼기
5. 제품 이름으로 제품 구매 수량 바꾸기

#### 제품에 대한 동작

1. 가격 설정하기
2. 가격 가져오기
3. 이름 가져오기

- 동작에는 크게 `읽기` `쓰기`가 있습니다. `쓰기` 동작은 불면성을 지켜야 하며 이를 카피온라이트라 칭합니다.
- 카피온 라이트를 이용하면 `쓰기` 동작을 `읽기`로 바꿀 수 있습니다.

```js
const remove_item_by_name(cart, name)=>{
    var idx = null
    for (var i = 0 ; i < cart.length; i++)
    {
        if(cart[i].name === name ) idx = i ;
    }
    if(idx !== null ) cart.splice(idx,1 )
}
```

를 `카피온 라이트`를 이용해 복사본을 생성해 제거할 수 있다.

```js
//before
const remove_item_by_name = (cart, name) => {
  var new_cart = cart.slice();
  var idx = null;

  new_cart.forEach((element) => {
    if (new_cart[i].name === name) {
      idx = i;
    }
  });
  if (idx !== null) new_cart.splice(idx, 1);

  return new_cart;
};

//after
const removeImtems (array,idx,count) {
    var copy = array.slice()
    copy.splice(idx,count);
    return copy
}


const remove_item_by_name = (cart, name) => {
  var idx = null;
  new_cart.forEach((element) => {
    if (new_cart[i].name === name) {
      idx = i;
    }
  });
  if (idx !== null) removeImtems(cart, idx, 1);

  return new_cart;
};
```

- 이또한 공통 유틸을 하나 만들어 내부 복제를 줄일 수 있습니다.
- 이를 이용해 객체를 복사하는 패턴을 반복해서 쓰지 않아도 된다.

### 자바스크립트 배열 흟어보기

- 자바스크립트 배열은 기본적으로 `컬렉션`이다. 자바스크립트 배열은 순서 있는 값을 나타내는 컬렉션이다.
- 인덱스로 접근할 수 있고, 값을 찾고 넣을 수 있습니다.

### 쓰기도 하면서 읽기도 하는 동작

- js 내장 함수 `shift`는 값을 리턴과 동시에 값을 변경합니다.
- 이를 구현하기 위해선 2가지 방법이 있습니다.

1. 읽기와 쓰기 함수로 분리
2. 함수에서 값 두개를 리턴

### 불변 데이터 구조를 읽는 것은 계산이다.

- 변경 가능합 값을 읽는 것이 액션이라면
- 불변 데이터 구조를 읽는 것은 계산이다.
