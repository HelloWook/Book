interface Room {
  numDoors: number;
  ceilingHeigth: number;
}
// 알려진 속성만 지정가능하다며 오류 발생
const r: Room = {
  numDoors: 1,
  ceilingHeigth: 10,
  elephant: "present",
};
const obj = {
  numDoors: 1,
  ceilingHeigth: 10,
  elephant: "present",
};
// 할당이 가능
const x: Room = obj;
