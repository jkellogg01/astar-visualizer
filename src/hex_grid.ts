export class Hex_Grid {
  hex_width: number;
  hex_height: number;

  constructor(radius: number, angle: number) {
    this.hex_width = 2 * radius;
    const angle_rad = angle * Math.PI / 180;
    this.hex_height = Math.sqrt(3) * radius * Math.cos(angle_rad);
  }
}
