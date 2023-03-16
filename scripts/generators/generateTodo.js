const fs = require("fs")
let data = fs.readFileSync("./ToDo.md", "utf-8").replace(/\#/g, "").split("\r\n")
fs.writeFileSync("./scripts/lib/todo.js", "export const TODO = " + JSON.stringify(data))
