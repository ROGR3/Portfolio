import { processCommand, getCurrentPath, clearConsole, switchThemes } from "./lib/processCommands.js"
const terminalWindow = document.querySelector(".terminal-window")
const terminalTop = document.querySelector(".terminal-topbar")
const terminalMinimize = document.querySelector(".terminal-minimize")
const terminalScale = document.querySelector(".terminal-scale")
const terminalClose = document.querySelector(".terminal-close")
const terminalContent = document.querySelector('.terminal-content');
const terminalInput = document.querySelector('.terminal-textbox');
const terminalCurrentPath = document.querySelector('.terminal-current-path');
const terminalIcon = document.querySelector(".terminal-icon")


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
  const alignWidth = 25;
  if (typeof output == "string") output = [output]
  for (let i in output) {
    const line = document.createElement('div');
    line.classList.add('terminal-line');
    if (output[i].name) {
      const indentStr = '\u00A0'.repeat(alignWidth - output[i].name.length);
      line.textContent = `${output[i].name}${indentStr} - ${output[i].description}`;
    } else {
      line.innerText = output[i];
    }
    terminalContent.insertBefore(line, terminalInput.parentNode);
    terminalContent.scrollTo({ top: terminalContent.scrollHeight, behavior: 'smooth' })
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
  terminalContent.insertBefore(line, terminalInput.parentNode);
  line.appendChild(colored)
  line.appendChild(inp)
  terminalContent.insertBefore(line, terminalInput.parentNode);
  terminalContent.scrollTo({ top: terminalContent.scrollHeight, behavior: 'smooth' })
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
    if (window.getSelection().toString().length == 0) {
      terminalInput.scrollIntoView({ behavior: "smooth" });
      requestAnimationFrame(() => {
        terminalInput.focus();
      });
    }
}




window.onscroll = () => {
  if (window.pageYOffset > 700) {
    terminalIcon.classList.add("zoomIn")
    terminalIcon.classList.remove("zoomOut")
  } else {
    terminalIcon.classList.add("zoomOut")
    terminalIcon.classList.remove("zoomIn")
  }
}


function handleLoadTheme() {
  let defaultTheme = undefined
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    defaultTheme = event.matches ? "dark" : "light";
  });
  let isDarkTheme = defaultTheme || localStorage.getItem("darkTheme") || "true"

  switchThemes(JSON.parse(isDarkTheme))
}

window.onload = handleLoadTheme