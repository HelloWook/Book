// 쇼핑물 장바구니 프로그램
var shoppingCart = [];
var shoppingCartTotal = 0;

const add_item_to_card = (item, price) => {
  shoppingCart.push({ item, price });
  shoppingCartTotal += price;
};

const calc_total_price = () => {
  shoppingCartTotal = shoppingCart.reduce(
    (total, item) => total + item.price,
    0
  );

  // 돔을 업데이트 하는 함수
  //set_cart_total_dom();
  // 모든 아이콘 업이트를 위해 업데이트 함수 호출
  update_shipping_icon();
  // 세금 계산
  calc_tax();
};

// 만약 구매 버튼에 배송 아이콘을 표시해야한다면?
const update_shipping_icon = () => {
  var shoppingCart_buttons = document.getElementsByClassName(
    "shoppingCart_button"
  );
  for (var i = 0; i < shoppingCart_buttons.length; i++) {
    var button = shoppingCart_buttons[i];
    var item = button.item;

    // 만약 아이템의 가격과 장바구니의 총 가격이 100000원 이상이면 배송 아이콘을 표시
    if (item.price + shoppingCartTotal >= 100000) {
      button.innerHTML = "배송";
    } else {
      button.innerHTML = "배송 무료";
    }
  }
};

// 세금 계산
const calc_tax = () => {
  var tax = shoppingCartTotal * 0.1;
  return tax;
};

/**
 * 위 코드들은 재사용성이 좋지 않으며, 테스팅이 힘들다
 * dom 업데이트와 , 비즈니스 로직이 분리 되지 못하고 너무 많은 함수가 섞여있다.


해결 방법 액션과 계산 데이터를 구분
위 코드는 데이터가 존재하지 않고 늘 결과가 바뀌기 때문에 액션이다. 
함수에는 명시적 입출력, 암시적 입출력이 존재한다.
매개변수와 retrun 은 명시적이며, 전역 변수를 읽는 요소는 암시적이다.
암시적인 입출력이 포함되면 그 함수는 액션이 된다.

명시적 입출력은 제거하면 계산이 됨으로 테스팅이 쉬워진다.

const calc_total_price = () => {

  // 돔을 업데이트 하는 함수
  //set_cart_total_dom();
  // 모든 아이콘 업이트를 위해 업데이트 함수 호출
  update_shipping_icon();
  // 세금 계산
  calc_tax();
};

위에서 

const calc_total = () =>{
    // 지역 변수 사용 , 암묵적 출력 제거 
    var shoppingCartTotal = 0;
      shoppingCartTotal = shoppingCart.reduce(
    (total, item) => total + item.price,
    0
  );
  return shoppingCartTotal;
}

const calc_total_price = () => {

   calc_total()
  // 돔을 업데이트 하는 함수
  //set_cart_total_dom();
  // 모든 아이콘 업이트를 위해 업데이트 함수 호출
  update_shipping_icon();
  // 세금 계산
  calc_tax();
};
  로 만들어버리면 비즈니스 로직을 분리할 수 있다.

  마찬가지로 나머지 함수들도

  // 만약 구매 버튼에 배송 아이콘을 표시해야한다면?
const update_shipping_icon = (cart) => {
  val total = 0;
  for (var i = 0; i < cart.length; i++) {
    
   var item = cart[i]
   total += item.price;

    
  return total;
};

// 암묵적 입력을 제거하면 테스팅이 쉬워진다.
// 하지만 이 또한 전역 변경을 유지하니 
const add_item_to_card = (cart, item, price) => {
    cart.push({ item, price });
};

const add_item_to_card = (cart, item, price) => {
   var new_shopping_cart = cart.slice();
    cart.push({ item, price });

    return new_shopping_cart;
};

 */
