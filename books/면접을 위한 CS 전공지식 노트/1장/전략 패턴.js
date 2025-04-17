// 구매
// 컨텍스트 클래스 : 전략을 사용할 객체

class Cart {
  constructor() {
    this.carts = [];
    this.payment = null;
  }

  addCart(item) {
    this.carts = [...this.carts, item];
  }

  setPayMent(payment) {
    this.payment = payment;
  }

  printInfo() {
    console.log(this.carts.join(",") + " " + this.payment.buy());
  }
}

// 전략 패턴
// 전략의 모음

class CardPayment {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }

  buy() {
    return "카드로 구매 ";
  }
}

class MoneyPayment {
  buy() {
    return "현금으로 구매";
  }
}

const cart = new Cart();
cart.addCart("사과");
cart.addCart("포도");
cart.setPayMent(new MoneyPayment());
cart.printInfo();
cart.setPayMent(new CardPayment("010-1111-111"));
cart.printInfo();
