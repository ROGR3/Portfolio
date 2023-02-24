const terminalWindow = document.querySelector(".terminal-window")
const terminalTop = document.querySelector(".terminal-topbar")
const terminalClose = document.querySelector(".terminal-close")
const terminalScale = document.querySelector(".terminal-scale")
const terminalIcon = document.querySelector(".terminal-icon")


let pos1 = 0
let pos2 = 0
let pos3 = 0
let pos4 = 0

terminalTop.onmousedown = dragMouseDown;
terminalScale.onclick = scaleTerminal;
terminalClose.onclick = showTerminal;
terminalIcon.onclick = showTerminal;

function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmousemove = elementDrag;
  document.onmouseup = closeDragElement;
}

function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  terminalWindow.style.top = (terminalWindow.offsetTop - pos2) + "px";
  terminalWindow.style.left = (terminalWindow.offsetLeft - pos1) + "px";
}

function closeDragElement() {
  document.onmouseup = null;
  document.onmousemove = null;
}


function showTerminal() {
  terminalWindow.classList.toggle("hidden")
}

function scaleTerminal() {
  if (terminalWindow.style.width == "90%" && terminalWindow.style.height == "90%") {
    terminalWindow.style.width = "500px"
    terminalWindow.style.height = "300px"
  } else {
    terminalWindow.style.width = "90%"
    terminalWindow.style.height = "90%"
  }
}

const terminalContent = document.querySelector('.terminal-content');
const terminalInput = document.querySelector('.terminal-textbox');

function processCommand(input) {
  const output = `Doing: ${input}\n`;
  return output;
}

function createLine(output) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.textContent = output;
  terminalContent.insertBefore(line, terminalInput.parentNode);
}

function handleInput(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = terminalInput.value;
    terminalInput.value = '';
    createLine(`$ ${input}`);
    const output = processCommand(input);
    createLine(output);
  }
}

terminalWindow.addEventListener('click', (e) => {
  if (!e.target.classList.contains("terminal-topbar"))
    terminalInput.focus();
});

terminalInput.addEventListener('keydown', handleInput);


