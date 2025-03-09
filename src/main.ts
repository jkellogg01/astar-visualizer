import { Hex_Grid } from "./hex_grid";
import "./reset.css";
import "./style.css";

let cursor = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const grid = new Hex_Grid(100, 45);

const app_root = document.querySelector<HTMLDivElement>("#app");
if (!app_root) {
  throw new Error("could not find application root!");
}

const canvas = document.createElement("canvas");
canvas.textContent = "a hexagon following the mouse cursor";
app_root.appendChild(canvas);

const ctx = canvas.getContext("2d");
if (!ctx) {
  throw new Error(
    "could not get canvas context! canvas may not be supported in this browser.",
  );
}

set_canvas_size();
draw();

addEventListener("resize", set_canvas_size);

addEventListener("mousemove", (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

function set_canvas_size() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function draw() {
  requestAnimationFrame(draw);
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, innerWidth, innerHeight);
  const cursor_grid_coord = grid.pixel_to_axial(cursor.x, cursor.y);
  
  ctx.fillStyle = "rgb(200 200 0 / 50%)";
  const hex = grid.hex_path(cursor_grid_coord.q, cursor_grid_coord.r);
  ctx.fill(hex);
}
