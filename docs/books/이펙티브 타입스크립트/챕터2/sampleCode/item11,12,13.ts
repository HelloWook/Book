type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a: number, b: number) => {
  return a + b;
};
const sub: BinaryFn = (a: number, b: number) => {
  return a - b;
};
const mul: BinaryFn = (a: number, b: number) => {
  return a * b;
};
const div: BinaryFn = (a: number, b: number) => {
  return a / b;
};

interface IState {
  name: string;
  capital: string;
}

interface IState {
  population: number;
}

const wyoming: IState = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 500,
};
