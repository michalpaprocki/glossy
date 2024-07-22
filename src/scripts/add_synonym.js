import { disableButton, enableButton } from "./button_.mjs"

const form = document.getElementById("add_synonym")
const inputField = document.getElementById("synonym")
const button = document.getElementById("add_synonym_btn")
const url = document.location.href
const term = url.split("/").at(-1)


if(form){

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        if (inputField) {
            const synonym = inputField.value
            addSynonym(term, synonym)
        }
        
    })
}


const addSynonym = async (term, synonym) => {
    console.log(term, synonym)
    try {
        const resp = await fetch(`/api/synonym/add/${term}`, {
            method: "POST", 
            body: JSON.stringify({synonym}),
            headers:{
            "content-type":"application/json"
        }})
        const data = await resp.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}