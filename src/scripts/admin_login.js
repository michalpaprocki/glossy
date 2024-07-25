import { disableButton, enableButton } from "./button_.mjs"

const formBtn = document.getElementById("admin_login_btn")
const loginForm = document.getElementById("admin_login")
const msg = document.getElementById("login_msg")
if(loginForm){
    document.addEventListener("submit", (e)=> {
        e.preventDefault()
        handleLogin()
    })
}

const handleLogin = async () => {
    disableButton(formBtn)
    if(msg){
        msg.innerHTML =''
        msg.classList.remove('form_error')
    }
    const body = {
        login: loginForm.children[1].value,
        password: loginForm.children[3].value
    }
    try {
        const resp = await fetch('/admin/login', {
            method: "POST",
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                "content-type": 'application/json'
            } 
        })
        const data = await resp.json()

        enableButton(formBtn)
        if(!msg){
            return
        }
        if(data.error){
            msg.innerHTML = data.error
            msg.classList.add('form_error')
        } else {
            msg.innerHTML = data.info
            window.location.assign(url.slice(0, -6))
        }

    } catch (error) {
        if(msg){
            msg.innerHTML = data.error
            msg.classList.add('form_error')
        }
        console.log(error)
    }

}