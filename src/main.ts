import "./reset.css";
import "./style.css";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

const app_root = document.querySelector<HTMLDivElement>("#app");
if (!app_root) {
  throw new Error("could not find application root!");
}

const canvas_el = document.createElement("canvas");
canvas_el.width = 1280;
canvas_el.height = 720;
canvas_el.textContent =
  "this demonstration works entirely in javascript using this canvas element; please enable javascript in order to view the demonstration.";
canvas_el.role = "presentation";
app_root.appendChild(canvas_el);

const ctx = canvas_el.getContext("2d");
if (!ctx) {
  throw new Error(
    "could not get canvas context! canvas may not be supported in this browser.",
  );
}

draw(ctx);
