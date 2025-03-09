import { Vertex } from "./geometry";

export class Axial_Coordinate {
  q: number;
  r: number;

  constructor(q: number, r: number) {
    const q_grid = Math.round(q);
    const q_delta = q - q_grid;
    const r_grid = Math.round(r);
    const r_delta = r - r_grid;
    if (Math.abs(q_delta) >= Math.abs(r_delta)) {
      this.r = r_grid;
      this.q = q_grid + Math.round(q_delta + 0.5 * r_delta);
    } else {
      this.q = q_grid;
      this.r = r_grid + Math.round(r_delta + 0.5 * q_delta);
    }
  }
}

export class Hex_Grid {
  hex_width: number;
  hex_height: number;

  constructor(radius: number, angle: number) {
    this.hex_width = 2 * radius;
    const angle_rad = (angle * Math.PI) / 180;
    this.hex_height = Math.sqrt(3) * radius * Math.cos(angle_rad);
  }

  pixel_to_axial(x: number, y: number) {
    const q = (4 / (3 * this.hex_width)) * x;
    const r = (-2 / (3 * this.hex_width)) * x + (1 / this.hex_height) * y;
    return new Axial_Coordinate(q, r);
  }

  axial_to_pixel(q: number, r: number) {
    const x = 0.75 * this.hex_width * q;
    const y = 0.5 * this.hex_height * q + this.hex_height * r;
    return { x, y } as Vertex;
  }

  hex_path(q: number, r: number) {
    const pixel_center = this.axial_to_pixel(q, r);
    return hex_path(
      pixel_center.x,
      pixel_center.y,
      this.hex_width,
      this.hex_height,
    );
  }
}

function hex_path(
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

  result.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i += 1) {
    result.lineTo(vertices[i].x, vertices[i].y);
  }
  result.closePath();

  return result;
}
