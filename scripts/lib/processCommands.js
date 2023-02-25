import { VIRTUAL_FS } from "./virtualfs.js";

let currentPath = []
let currentFolder = VIRTUAL_FS


function processCommand(input, terminalContent) {
  let output = ""
  let commands = input.split(" ")
  const command = commands[0]
  const arg = commands.filter(e => !e.includes("-"))[1]
  const flags = commands.filter(e => e.includes("-"))
  console.log(flags)
  switch (command) {
    case "ls":
      output = Object.keys(currentFolder)
      break;
    case "cd":
      if (arg == "..") {
        currentPath.pop()
        currentFolder = getCurrentFolder(currentPath)
      } else if (currentFolder[arg]) {
        currentPath.push(arg)
        currentFolder = currentFolder[arg]
      } else {
        output = "The directory name is invalid."
      }
      break;
    case "clear":
    case "cls":
      clearConsole(terminalContent)
      break;
    case "theme":
      if (flags[0] == "-dark" || flags[0] == "-d") {
        switchThemes(true)
        localStorage.setItem("darkTheme", JSON.stringify(true))
      }
      else if (flags[0] == "-light" || flags[0] == "-l") {
        switchThemes(false)
        localStorage.setItem("darkTheme", JSON.stringify(false))
      } else {
        output = "Unknown flag"
      }
      break;
    case "reload":
      window.location.reload()
      break;
    default:
      output = "Uknown command: " + command
      break;

  }
  return output
}

function joinPath(_arr) {
  return _arr.join("/")
}

function getCurrentFolder(_path) {
  let obj = VIRTUAL_FS
  for (let i in _path) {
    obj = obj[_path[i]]
  }
  return obj
}

function getCurrentPath() {
  return joinPath(currentPath)
}

function clearConsole(el) {
  removeChildren(el)
}
function removeChildren(parent) {
  while (parent.childElementCount > 1) {
    parent.removeChild(parent.firstChild);
  }
};

function switchThemes(isDark) {
  document.body.classList.remove("light")
  document.body.classList.remove("dark")
  if (isDark)
    document.body.classList.add("dark")
  else
    document.body.classList.add("light")
}


export { processCommand, getCurrentPath, clearConsole, switchThemes }