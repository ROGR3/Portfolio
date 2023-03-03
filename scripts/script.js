const quotes = ["Nothing is as permanent as a temporary solution that works.", "}", "If one programmer can do it in one week \n then 2 of them can do it in 2 weeks.", "Programming is the art of adding bugs to an empty file.", "Software is like sex: it is better when it is free", "In theory, theory and practise are the same, \n in practise they are different.", "Can learn to exit Vim, if needed", "There are two types of people in this world: \n those who can extrapolate from incomplete data.", "Months of testing and bug fixes can save you hours of planning.", "We do things not because they are easy, but because we thought they would be easy.", "Having a hole in the head does not indicate an open mind", "Simplicity is prerequisite for reliability", "// TODO: insert a funny quote", "Any fool can write code that a computer can understand. \n But not everyone can write code that humans can understand"]

const quoteHeader = document.getElementById("randomQuote")
const splitter = document.getElementById("splitter")
const terminalIcon = document.querySelector(".terminal-icon")


window.onscroll = () => {
  if (window.pageYOffset > 700) {
    terminalIcon.classList.add("zoomIn")
    terminalIcon.classList.remove("zoomOut")
  } else {
    terminalIcon.classList.add("zoomOut")
    terminalIcon.classList.remove("zoomIn")
  }
}

function newQuote() {
  quoteHeader.innerText = quotes[Math.floor(Math.random() * quotes.length)]
}
newQuote()
