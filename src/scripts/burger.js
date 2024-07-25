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
        burgerBtn.children[0].classList.remove("burger_top_close")
        burgerBtn.children[0].classList.add("burger_top_open")

        burgerBtn.children[1].classList.add("opacity-0")

        burgerBtn.children[2].classList.remove("burger_bottom_close")
        burgerBtn.children[2].classList.add("burger_bottom_open")
   
    } else {
        nav_header.classList.replace("show_nav", "h-0")

        burgerBtn.children[0].classList.remove("burger_top_open")
        burgerBtn.children[0].classList.add("burger_top_close")

        burgerBtn.children[1].classList.remove("opacity-0")

        burgerBtn.children[2].classList.remove("burger_bottom_open")
        burgerBtn.children[2].classList.add("burger_bottom_close")
        // burgerBtn.classList.remove("burger_opened")
        // burgerBtn.classList.add("burger_closed")
    }

}

const closeBurger = (e) => {
    
    if(!burgerBtn.contains(e.target) && nav_header.classList.contains("show_nav")){
        nav_header.classList.replace("show_nav", "h-0")
        
        burgerBtn.children[0].classList.remove("burger_top_open")
        burgerBtn.children[0].classList.add("burger_top_close")

        burgerBtn.children[1].classList.remove("opacity-0")

        burgerBtn.children[2].classList.remove("burger_bottom_open")
        burgerBtn.children[2].classList.add("burger_bottom_close")
    }
}