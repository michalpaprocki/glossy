const disableButton = (button) =>{
    const span = document.createElement("span")
    span.innerText = '⚙️'
    span.classList.add("cog")
    button.append(span)
    button.setAttribute("disabled", true)
}
const enableButton = (button) =>{
    button.children[0].remove()
    button.removeAttribute("disabled")
}




export {enableButton, disableButton}