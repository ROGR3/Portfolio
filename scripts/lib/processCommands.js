import { VIRTUAL_FS } from "./virtualfs.js";
import { TODO } from "./todo.js";
import { newQuote } from "./quotes.js";
import { LANGUAGE_MESSAGES } from "./languageTexts.js"
import { handleLanguage } from "./languages.js"
import { EMAIL, GITHUB } from "./contact.js"

const briefHelp = [
  "Some of the available commands:",
  "",
  { name: "cd <directory>", description: "Change the current directory to the specified one." },
  { name: "ls", description: "List files and folders in the current directory." },
  { name: "clear", description: "Clear the console window." },
  { name: "theme", description: "Switch themes." },
  { name: "newquote", description: "Generate a new random quote." },
  { name: "reload", description: "Reload the page." },
  { name: "lang <lang>", description: "Change the language" },
  { name: "about <project>", description: "Detailed info about certain project" },
  { name: "resume", description: "Display the resumé" },
  { name: "contact", description: "Contact me!" },
  { name: "todo", description: "Show the todo plan of this page!" },
  "",
  "Good luck finding others!"
]

let currentPath = []
let currentFolder = VIRTUAL_FS

let quoteText = document.getElementById("randomQuote")
newQuote(quoteText)

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
      output = changeDir(arg)
      break;
    case "..":
    case "../":
      output = changeDir("..")
      break
    case "clear":
    case "cls":
      clearConsole(terminalContent)
      break;
    case "theme":
      if (flags[0] == "-dark" || flags[0] == "-d") {
        switchThemes(true)
        localStorage.setItem("darkTheme", JSON.stringify(true))
      } else if (flags[0] == "-light" || flags[0] == "-l") {
        switchThemes(false)
        localStorage.setItem("darkTheme", JSON.stringify(false))
      } else {
        output = "Unknown flag"
      }
      break;
    case "newquote":
      newQuote(quoteText)
      break;
    case "sudo":
      output = "You do not need sudo permissions, you are the owner of the world!"
      break;
    case "mv":
    case "mkdir":
    case "touch":
    case "rm":
    case "cp":
      output = ["You can not modify the website structure. Yet!", `But.. you can implement it!`, `${GITHUB}/Portfolio/pulls`]
      break;
    case "lang":
    case "language":
      let langName = flags[0].replace("-", "")
      if (LANGUAGE_MESSAGES["langChanged"][langName]) {
        handleLanguage(langName)
        output = LANGUAGE_MESSAGES["langChanged"][langName]
      } else {
        output = "Language not supported"
      }
      break;
    case "email":
      output = EMAIL
      break;
    case "github":
    case "gh":
      output = GITHUB
      break;
    case "contact":
      if (!arg)
        output = ["Fell free to contact me via email or GitHub.", "Or contact me directly from here!", "For direct message use: ", "contant  <your-email> <message>"]
      else if (arg == "email") {
        output = "Email send successfully!"
      }
      output
      break;
    case "todo":
      output = TODO
      break
    case "reload":
      window.location.reload()
      break;
    case "":
      break;
    case "help":
      if (!arg)
        output = briefHelp
      else
        displayHelpForCmd(arg)
      break;
    default:
      output = "Uknown command: " + command
      break;

  }
  return output
}

function changeDir(dir) {
  dir = dir.endsWith("/") ? dir : dir + "/"
  if (dir == "../") {
    currentPath.pop()
    currentFolder = getCurrentFolder(currentPath)
  } else if (currentFolder[dir] && !currentFolder[dir].size) {
    currentPath.push(dir)
    currentFolder = currentFolder[dir]
  } else {
    return "The directory name is invalid."
  }
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
  if (isDark) {
    document.querySelector(".terminal-icon").style.backgroundImage = "url(../assets/terminal-white.svg)"
    document.body.classList.add("dark")

  }
  else {
    document.querySelector(".terminal-icon").style.backgroundImage = "url(../assets/terminal.svg)"
    document.body.classList.add("light")

  }
}

function displayHelpForCmd(cmd) {
  console.log(cmd)
}


export { processCommand, getCurrentPath, clearConsole, switchThemes }