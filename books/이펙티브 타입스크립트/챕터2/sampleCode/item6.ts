function add(a: number, b: number): number {
  return a + b;
}

add(1, 4);

function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  // 분기문이 Null일 가능성이 존재하여 에러를 발생시킨다.
  if (typeof elOrId === "object") {
    return elOrId;
  }
}

const response = fetch("http://example");
