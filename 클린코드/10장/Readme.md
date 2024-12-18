### 클래스는 작아야한다.

- 클래스의 크기의 기준은 맡은 책임을 기준으로 잡는다.
- 클래스의 작명에서 클래스의 크기를 줄이는 첫 번째 관문이다.
- `srp` 단일 책임원책으로 클래스는 단 하나의 책임만을 가져야한다.

##### 밑 코드는 너무 많은 책임을 가직 있다.

- 한 클래스에서 버전도 다루고 자바스윙도 다룬다.

```java
public class SuperDashboard extends JFrame implements MetaDataUser {
  public Component getLastFocusedComponent()
  public void setLastFocused(Component lastFocused)
  public int getMajorVersionNumber()
  public int getMinorVersionNumber()
  public int getBuildNumber()
}
```

- 너무 많은 책임때문에 간결한 클래스 네이밍이 잡히지도 않는다
- 클래스 네이밍의 모호한 책임은 클래스명에서 나타난다
  `ex) Manager, Processor, Supe`
- 클래스 설명은 `if`, `and` `or`, `but`을 사용하지 않고 25 단어 내외로 가능해야된다.

##### 위 코드의 버전 부분을 클래스 분리

```java
// 목록 10-3, 단일 책임 클래스
// 버전 정보를 다루는 메서드 3개를 따로 빼서 Version 이라는 독자적인 클래스를 만들어 다른 곳에서 재사용하기 쉬워졌다.
public class Version {
  public int getMajorVersionNumber()
  public int getMinorVersionNumber()
  public int getBuildNumber()
}
```

### 응집도

- 클래스는 인스턴스 변수 수가 작아야한다.
- 각 클래스 매서드는 클래스 인스턴스 변수를 하나 이상 사용해야한다.
- 일반적으로 매서드가 변수를 더 많이 이용할 수록 매서드와 클래스의 응집도는 높다.
- 함수를 작게, 매개변수 목록을 짧게라는 전략을 따르다 보면 때때로 몇몇 메서드만이 사용하는 인스턴스 변수가 아주 많아진다.
- 이는 십중 팔구 새로운 클래스를 쪼개야 한다는 신호다.
- 응집도가 높아지도록 변수와 메서드를 적절히 분리해 새로운 클래스로 쪼개주면된다.

### 변경으로부터 격리

- 객체지향 프로그래밍에는 Concrete 클래스(구현)와 Abstract 클래스(개념)가 있다.
- 상세한 구현에 의존하는 클라이언트 클래스는 구현이 바뀌면 위험에 빠진다.
- 따라서 인터페이스와 abstract 클래스를 사용해 구현이 미치는 영향을 격리시켜야 한다.
