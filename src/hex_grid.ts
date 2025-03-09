import { Vertex } from "./geometry";

export class Hex_Grid {
  hex_width: number;
  hex_height: number;

  constructor(radius: number, angle: number) {
    this.hex_width = 2 * radius;
    const angle_rad = (angle * Math.PI) / 180;
    this.hex_height = Math.sqrt(3) * radius * Math.cos(angle_rad);
  }
}

export function hex_path(
  center_x: number,
  center_y: number,
  width: number,
  height: number,
) {
  const vertices: Array<Vertex> = [
    { x: 0.5 * width, y: 0 },
    { x: 0.25 * width, y: -0.5 * height },
    { x: -0.25 * width, y: -0.5 * height },
    { x: -0.5 * width, y: 0 },
    { x: -0.25 * width, y: 0.5 * height },
    { x: 0.25 * width, y: 0.5 * height },
  ].map((offset) => ({
    x: offset.x + center_x,
    y: offset.y + center_y,
  }));

  let result = new Path2D();

  result.moveTo(vertices[0].x, vertices[0].y)
  for ( let i = 1; i < vertices.length; i += 1) {
    result.lineTo(vertices[i].x, vertices[i].y)
  }
  result.closePath();

  return result;
}
