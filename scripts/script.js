let resizeHandle = document.querySelector(".resize-handle");
let isResizing = false;
let lastDownX = 0;
let lastDownY = 0;

resizeHandle.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isResizing = true;
  lastDownX = e.clientX;
  lastDownY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  let diffX = e.clientX - lastDownX;
  let diffY = e.clientY - lastDownY;

  let terminalWindow = document.querySelector(".terminal-window");
  terminalWindow.style.width = `${terminalWindow.offsetWidth + diffX}px`;
  terminalWindow.style.height = `${terminalWindow.offsetHeight + diffY}px`;

  lastDownX = e.clientX;
  lastDownY = e.clientY;
});

document.addEventListener("mouseup", (e) => {
  isResizing = false;
});