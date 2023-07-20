let inputs = document.getElementById("inp")

let text = document.querySelector(".text")

function Add(){


    newitem = document.createElement("ul")
    newitem.innerHTML = `${inputs.value}`
    text.appendChild(newitem)
    inputs.value= ""


}