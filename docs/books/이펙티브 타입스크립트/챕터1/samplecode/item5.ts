let age: number;
// as를 이용해 런타임 환경에 any로 규정해 오류를 해결할 수 있다.
age = "12" as any;

function calc(x: number): number {
  return x + 1;
}
let asf: any = "1";
// 타입을 무시하고 값을 넣을 수 있게된다.
console.log(calc(asf));
