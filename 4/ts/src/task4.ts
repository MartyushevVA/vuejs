// Явно описываем тип точки
interface Point {
  x: number;
  y: number;
}

// Перегрузки (сигнатуры, видимые снаружи)
function distance(p1: Point, p2: Point): number;
function distance(x1: number, y1: number, x2: number, y2: number): number;

// Реализация (должна покрывать все перегрузки, без any)
function distance(
  a: Point | number,
  b: Point | number,
  c?: number,
  d?: number
): number {
  if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
    // Формат: (x1, y1, x2, y2)
    return Math.sqrt((c - a) ** 2 + (d - b) ** 2);
  }

  if (typeof a === "object" && typeof b === "object") {
    // Формат: (Point, Point)
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  }

  throw new Error("Неверные аргументы функции distance");
}

// Примеры вызова
const dist1 = distance(0, 0, 3, 4);          // 5
const dist2 = distance({ x: 0, y: 0 }, { x: 3, y: 4 }); // 5
console.log(`Distance 1: ${dist1}`);
console.log(`Distance 2: ${dist2}`);