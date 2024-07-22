const spawnSpinner = (parent) =>{
    const spinner = document.createElement("div")
    spinner.id="spinner"
    spinner.classList.add("spinner")
    parent.parentElement.insertAdjacentElement("afterend", spinner)
}
const destroySpinner = () =>{
    const spinner = document.getElementById("spinner")
    if(spinner){
        spinner.remove()
    }
}   

export {spawnSpinner, destroySpinner}