interface Vector2D {
  x: number;
  y: number;
}

interface NamedVector2D {
  name: string;
  x: number;
  y: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

const obj: NamedVector2D = {
  x: 1,
  y: 2,
  name: "hello",
};

console.log(calculateLength(obj));

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function nomallize(v: Vector3D) {
  const length = calculateLength(v);
  return { x: v.x / length, y: v.y / length, z: v.z / length };
}

console.log(nomallize({ x: 3, y: 4, z: 5 }));
