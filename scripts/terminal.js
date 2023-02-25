import { processCommand, getCurrentPath, clearConsole, switchThemes } from "./lib/processCommands.js"
const terminalWindow = document.querySelector(".terminal-window")
const terminalTop = document.querySelector(".terminal-topbar")
const terminalMinimize = document.querySelector(".terminal-minimize")
const terminalScale = document.querySelector(".terminal-scale")
const terminalClose = document.querySelector(".terminal-close")
const terminalIcon = document.querySelector(".terminal-icon")
const terminalContent = document.querySelector('.terminal-content');
const terminalInput = document.querySelector('.terminal-textbox');
const terminalCurrentPath = document.querySelector('.terminal-current-path');

let pos1 = 0
let pos2 = 0
let pos3 = 0
let pos4 = 0

let lastCommands = []
let selectedCommandID = -1

terminalWindow.onclick = focusInput
terminalTop.onmousedown = dragMouseDown;
terminalScale.onclick = scaleTerminal;
terminalMinimize.onclick = showTerminal;
terminalClose.onclick = () => { showTerminal(); clearConsole(terminalContent) };
terminalIcon.onclick = showTerminal;
terminalInput.onkeydown = handleInput;

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




function createLine(output) {
  if (typeof output == "string") output = [output]
  for (let i in output) {
    const line = document.createElement('div');
    line.classList.add('terminal-line');
    line.innerText = output[i];
    terminalContent.insertBefore(line, terminalInput.parentNode);
    terminalContent.scrollTo(0, terminalContent.scrollHeight)
  }
}

function createOldInput(input) {
  const line = document.createElement('div');
  line.classList.add('terminal-line');
  const colored = document.createElement('span')
  colored.classList.add("terminal-colored")
  colored.innerText = `https://atzuki.netlify.app/${getCurrentPath()} λ `
  const inp = document.createElement('span')
  inp.innerText = input
  line.appendChild(colored)
  line.appendChild(inp)
  terminalContent.insertBefore(line, terminalInput.parentNode);
}

function handleInput(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = terminalInput.value;
    lastCommands.unshift(input)
    selectedCommandID = -1
    terminalInput.value = '';
    createOldInput(input);
    const output = processCommand(input, terminalContent);
    createLine(output);
    terminalCurrentPath.innerText = getCurrentPath()
  } else if (e.key === "ArrowUp") {
    if (selectedCommandID < lastCommands.length - 1)
      selectedCommandID++
    terminalInput.value = lastCommands[selectedCommandID]
  } else if (e.key === "ArrowDown") {
    if (selectedCommandID > 0)
      selectedCommandID--
    terminalInput.value = lastCommands[selectedCommandID]
  }
}

function focusInput(e) {
  if (!e.target.classList.contains("terminal-topbar"))
    if (terminalWindow.scrollTop >= (terminalWindow.scrollHeight - terminalWindow.clientHeight))
      terminalInput.focus();
}



function handleLoadTheme() {
  let isDarkTheme = localStorage.getItem("darkTheme") || "false"
  switchThemes(JSON.parse(isDarkTheme))
}

window.onload = handleLoadTheme