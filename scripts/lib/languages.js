import {LANGUAGE_TEXT} from "./languageTexts.js"

function handleLanguage(lang){
  for(let i in LANGUAGE_TEXT){
    try{
      document.getElementById(i).innerText = LANGUAGE_TEXT[i][lang]
    }catch(er){
      console.log("Didnt find the " + i +" element")
    }
  }
}

export {handleLanguage}