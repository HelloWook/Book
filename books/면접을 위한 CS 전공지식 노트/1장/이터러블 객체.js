const set = new Set();
set.add("1");
set.add("2");
set.add("3");

for (let x of set) {
  console.log(x);
}

const map = new Map();
map.set("a", "1");
map.set("b", "2");
map.set("c", "3");

for (let k of map) {
  console.log(k);
}
