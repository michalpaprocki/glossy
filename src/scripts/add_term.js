

const form = document.getElementById("add_term")
const inputField = document.getElementById("term")
const textareaField = document.getElementById("definition")

form.addEventListener("submit", (e) => {
    e.preventDefault()
if (inputField && textareaField) {
     const termString = inputField.value
     const definition = textareaField.value
     
     addTerm(termString, definition)
}

})

const spawnSpinner = () =>{
    const spinner = document.createElement("div")
    spinner.id="spinner"
    spinner.classList.add("spinner")
    textareaField.parentElement.insertAdjacentElement("afterend", spinner)
}
const destroySpinner = () =>{
    const spinner = document.getElementById("spinner")
    if(spinner){
        spinner.remove()
    }
}   

const addTerm = async (term, def) => {
    const errorEl = document.getElementById("error")
    if(errorEl){
        errorEl.innerText = ''
    }
    spawnSpinner()
    try {
        const resp = await fetch("/api/term/create", {
            method: "POST", 
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({payload:{term, def}})
        })

       
        const data = await resp.json()
        console.log(data)
        destroySpinner()
        if(data.error) {
            if(!errorEl){
                const error = document.createElement("span")
                error.innerText = data.error
                error.id = "error"
                error.classList.add("form_error")
                textareaField.parentElement.insertAdjacentElement("afterend", error)
            } else {
                errorEl.innerText = data.error
            }

        }
      
    } catch (error) {
        console.log(error)
    }
}