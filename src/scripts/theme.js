if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

const darkBtn = document.getElementById("dark")
const lightBtn = document.getElementById("light")
const osBtn = document.getElementById("os")

darkBtn.addEventListener("click", ()=> {

    localStorage.setItem("theme", "dark")
    document.documentElement.classList.add('dark')
})
lightBtn.addEventListener("click", ()=> {

    localStorage.setItem("theme", "light")
    document.documentElement.classList.remove('dark')
})