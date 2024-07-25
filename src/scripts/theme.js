const darkBtn = document.getElementById("dark")
const lightBtn = document.getElementById("light")
const osBtn = document.getElementById("os")

osBtn.addEventListener("click", ()=>{
  localStorage.removeItem("theme");
  if (window.matchMedia("(prefers-color-scheme: dark)")) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})

darkBtn.addEventListener("click", ()=> {

    localStorage.setItem("theme", "dark")
    document.documentElement.classList.add('dark')
})

lightBtn.addEventListener("click", ()=> {

    localStorage.setItem("theme", "light")
    document.documentElement.classList.remove('dark')
})

// theme menu

const themeBtn = document.getElementById("theme")
const header_header = document.getElementById("theme_header")
if(themeBtn){
  themeBtn.addEventListener("click", ()=> toggleTheme())


}
const toggleTheme = () => {
  if(header_header.classList.contains("h-0")){
      header_header.classList.replace("h-0", "show_theme")
    } else {
      header_header.classList.replace("show_theme", "h-0")
      
    }
}

const closeTheme = (e) => {
    
  if(!themeBtn.contains(e.target) && header_header.classList.contains("show_theme")){
    header_header.classList.replace("show_theme", "h-0")
  }
}  
    
window.addEventListener("click", (e) => {
  closeTheme(e)
})