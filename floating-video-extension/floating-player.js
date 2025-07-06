const container = document.getElementById("container");
let isDragging = false;
let offset = { x: 0, y: 0 };

container.addEventListener("mousedown", (e) => {
  isDragging = true;
  offset = { x: e.clientX, y: e.clientY };
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const iframe = window.frameElement;
  const dx = e.clientX - offset.x;
  const dy = e.clientY - offset.y;

  const rect = iframe.getBoundingClientRect();
  iframe.style.left = rect.left + dx + "px";
  iframe.style.top = rect.top + dy + "px";
  iframe.style.bottom = "auto";
  iframe.style.right = "auto";

  offset = { x: e.clientX, y: e.clientY };
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
