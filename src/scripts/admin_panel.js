import { disableButton, enableButton } from "./button_.mjs"

const changePassBtn = document.getElementById("change_password_btn")
const changePassForm = document.getElementById("admin_change_password")
const msg = document.getElementById("change_password_msg")
const show_old = document.getElementById("visibility_old_password")
const show_new = document.getElementById("visibility_new_password")
const show_confirm = document.getElementById("visibility_confirm_password")

if(show_old){
    show_old.addEventListener("click", (e)=> {
        handleShowInput(e)
    })
}
if(show_new){
    show_new.addEventListener("click", (e)=> {
        handleShowInput(e)
    })
}
if(show_confirm){
    show_confirm.addEventListener("click", (e)=> {
        handleShowInput(e)
    })
}
if(changePassForm){
    document.addEventListener("submit", (e)=> {
        e.preventDefault()
        handleChangePassword()

    })
}

const handleChangePassword = async () => {
    disableButton(changePassBtn)
    if(msg){
        msg.innerHTML =''
        msg.classList.remove('form_error')
    }
    const body = {
        oldPassword: changePassForm.children[0].children[1].children[0].value,
        newPassword: changePassForm.children[1].children[1].children[0].value,
        confirmPassword: changePassForm.children[2].children[1].children[0].value
    }
    try {
        const resp = await fetch('/admin/change_password', {
            method: "POST",
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                "content-type": 'application/json'
            } 
        })
        const data = await resp.json()
        enableButton(changePassBtn)
        if(!msg){
            return
        }
        if(data.error){
            msg.innerHTML = data.error
            msg.classList.add('form_error')
        } else {
            msg.innerHTML = data.info
            // window.location.assign(window.location.href.slice(0, -6))
        }

    } catch (error) {
        if(msg){
            msg.innerHTML = error
            msg.classList.add('form_error')
        }
        console.log(error)
    }

}

const handleShowInput = (e) =>{

    
    const inputField = e.target.parentElement.children[0]

    const type = inputField.getAttribute("type")

    if(type === "password"){
        inputField.setAttribute("type", "text")
        e.target.innerHTML = "hide"
    } else {
        inputField.setAttribute("type", "password")
        e.target.innerHTML = "show"
    }


}