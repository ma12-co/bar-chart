import _ from "lodash"
import "./index.css"

function component() {
  let element = document.createElement("div")

  element.innerHTML = _.join(["Hello", "webpackkkkkkkkkk"], " ")

  return element
}

document.body.appendChild(component())

console.log("working")
