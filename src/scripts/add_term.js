import { disableButton, enableButton } from "./button_.mjs"

const form = document.getElementById("add_term")
const inputField = document.getElementById("term")
const textareaField = document.getElementById("definition")
const msg_box = document.getElementById("msg-box")
const button = document.getElementById("form_btn")

form.addEventListener("submit", (e) => {

    e.preventDefault()
    if (inputField && textareaField) {
        const termString = inputField.value
        const definition = textareaField.value
        addTerm(termString, definition)
    }

})

const addTerm = async (term, def) => {
    disableButton(button)
    msg_box.innerText = ""
    msg_box.classList.remove("form_error")
    msg_box.classList.remove("form_info")


    try {
        const resp = await fetch("/api/term/create", {
            method: "POST", 
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({payload:{term, def}})
        })
      
        const data = await resp.json()
        enableButton(button)
        if(data.info){
            msg_box.innerText = data.info
            msg_box.classList.add("form_info")
        }
      
        if(data.error) {
            if(!errorEl){
                msg_box.innerText = data.error
                msg_box.classList.add("form_error")
            } else {
                errorEl.innerText = data.error
            }
        }
      
    } catch (error) {
        if(error){
            console.log(error)
            msg_box.innerText = "Something went wrong"
            msg_box.classList.add("form_error")
        }
    }
}