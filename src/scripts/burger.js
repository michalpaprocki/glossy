window.addEventListener("click", (e) => {
    closeBurger(e)
})


const burgerBtn = document.getElementById("burger")
const nav_header = document.getElementById("nav_header")

if(burgerBtn){
    burgerBtn.addEventListener("click", ()=> toggleBurger())
}

const toggleBurger = () => {
    if(nav_header.classList.contains("h-0")){
        nav_header.classList.replace("h-0", "show_nav")
    } else {
        nav_header.classList.replace("show_nav", "h-0")

    }

}

const closeBurger = (e) => {
    
    if(!burgerBtn.contains(e.target) && nav_header.classList.contains("show_nav")){
        nav_header.classList.replace("show_nav", "h-0")
    }
}