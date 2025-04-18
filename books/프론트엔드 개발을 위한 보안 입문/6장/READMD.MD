### CSRF

- 공격자가 준비한 함정에 의해 웹 애플리케이션이 원래 갖고 있는 기능이 사용자의 의도와 상관없이 호출되는 공격이다.

- 예시로 로그인한 사용자만 사용할 수 있는 기능을 타 사용자가 사용하는 것이다.

### CSRF 구조

1. 사용자가 은행 사이트에 로그인
2. 쿠키에 정보를 설정한다.
3. 사이트에 접속한다.
4. 피싱 사이트는 정보를 탈취해
5. 공격할 사이트에 보낸다.

### CSRF 대처 방안

- 토큰을 삽입하여 보낸 요청이 정상인지 아닌지를 확인합니다.

- 사용자는 CRSF 토큰을 `HTML`에 삽입해 요청마다 주고 받는다.

```html
<input type="hidden" name="csrf_token" value="123ada4" />
```

- 서버는 포함된 토큰과 세션에 저장된 토큰이 일치하는지 확인하고 일치하지 않으면 잘못된 요청으로 간주한다.

### Double Submit

- 똑같은 토큰 방식이나 서버는 토큰 정보를 가지지 않고 , 프론트에 전송 후 프론트는 쿠키와 받은 쿠키를 폼에 넣어 보내는데 이때 같은 값인지만 비교한다.

- 세션 공유가 필요 없어 분산 시스템에서 장점을 가질 수 있다.

### SameSite 쿠키를 사용하는 CSRF 방법

- 헤더에 SAME-SITE를 지정하여 동일한 사이트에서 전송한 방식인지만 확인한다.

`strict` : 아예 쿠키가 포함되지 않는다.

`Lax` : Get 매서드에는 쿠키가 포함된다 그렇기에 링크로 접속하면 접속이 가능하다.

### Origin 헤더를 사용하는 CSRF 대책

- Origin 헤더를 이용해 허가되지 않는 출처의 요청을 금지할 수 있다.

```js
app.post("/remit", (req, res) => {
  if (!req.header.origin == "어쩌구") {
    throw "에러";
  }
});
```

### 클락재킹

- 사용자의 의도와 다르게 버튼과 링크 등을 클릭하게 해 의도하지 않는 처리를 실행하도록 하는 공격이다.

#### 클락재킹 구조

1. 공격 대상의 웹 어플리케이션 페이지를 iframe을 이용해 중첩시키고
2. css를 이용해 투명하게 처리한 다음 사용자에게 보이지 않도록 한다.
3. 버튼 위치와 중첩되도록 조정해
4. 피싱 사이트에 유도한다.

#### 방지

1. `X-FRAME-OPTION`을 삽입해 페이지에 삽입하는 것을 제한한다.

DENY : 아예 제한
SAMEREIGON : 동일 출처만 제한

### 오픈 리다이렉트 구조

- 내부의 리다이렉트 구조를 통해 피싱 사이트등 공격자가 준비한 페이지로 강제로 이동시키는 기술이다.

- URL에서 리다이렉트르 허용할 때 이곳으로 이동 할떄 검증을 하지 않아 문제가 발생한다.

#### 해결법

- 이동시킬 URL을 검증한다.
