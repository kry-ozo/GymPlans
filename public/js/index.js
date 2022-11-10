//form var
const forms = document.querySelectorAll('.needs-validation')
const form = document.querySelector(".needs-validation")
const password = document.querySelector("#password-reg")
const retPassword = document.querySelector("#passwordRetyped")
//flash var
const flashMessage = document.querySelector(".alert")
const flashBtn = document.querySelector(".close-flash")
//navbar var
const hamburgerToggler = document.querySelector("#hamburger")
const navbar = document.querySelector("#navbar")
const brand = document.querySelector("#navbarBrand")
const navList = document.querySelector(".navbar-nav")
const conNav = document.querySelector("#nav-flex")
const row = document.querySelector("#firstRow")

const registerBtn = document.querySelector("#register")
const loginBtn = document.querySelector("#login")
const logoutBtn = document.querySelector("#logout")
const profileBtn = document.querySelector("#profile")
const formLogout = document.querySelector("#logoutForm")
const profileDiv = document.querySelector("#profileDiv")


Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    if(password.value != retPasswordvalue){
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
}) 

function resetNav(){
  navbar.classList.remove("toggle-on")
    conNav.classList.remove("flex-column")
    conNav.classList.remove("justify-content-left")
    navList.classList.remove("d-flex")
    brand.classList.remove("mt-1")

    if(registerBtn && loginBtn){
      registerBtn.classList.add("dis")
      loginBtn.classList.add("dis")
      registerBtn.classList.add("me-3")
      registerBtn.classList.remove("me-auto")//
      loginBtn.classList.remove("me-auto")//
      loginBtn.classList.remove("mt-2")//
    }else if(profileBtn && logoutBtn){
      profileBtn.classList.add("dis")
      logoutBtn.classList.add("dis")
      logoutBtn.classList.remove("me-auto")//
      profileBtn.classList.remove("me-auto")//
      formLogout.classList.remove("me-auto")//
      profileDiv.classList.remove("me-auto")//
      profileDiv.classList.remove("pe-0")//
      profileDiv.classList.remove("mt-2")//
      profileDiv.classList.remove("ps-1")
    }
}
hamburgerToggler.addEventListener("click",()=>{

  if(!navbar.classList.contains("toggle-on")){
    navbar.classList.add("toggle-on")
    conNav.classList.add("flex-column")
    conNav.classList.add("justify-content-left")
    navList.classList.add("opacity-100")
    navList.classList.add("d-flex")
    brand.classList.add("mt-1")

    if(registerBtn && loginBtn){
      registerBtn.classList.remove("dis")
      loginBtn.classList.remove("dis")
      registerBtn.classList.remove("me-3")
      registerBtn.classList.add("me-auto")
      loginBtn.classList.add("me-auto")
      loginBtn.classList.add("mt-2")
    }else if(profileBtn && logoutBtn){
      profileBtn.classList.remove("dis")
      logoutBtn.classList.remove("dis")
      logoutBtn.classList.add("me-auto")
      profileBtn.classList.add("me-auto")
      formLogout.classList.add("me-auto")
      profileDiv.classList.add("me-auto")
      profileDiv.classList.add("pe-0")
      profileDiv.classList.add("mt-2")
      profileDiv.classList.remove("ps-1")
    }
  }else if(navbar.classList.contains("toggle-on")){
    resetNav()
  }
  

  
})


window.addEventListener("resize",()=>{
  resetNav()
})
try{
  flashBtn.addEventListener("click",()=>{
    flashMessage.classList.add("d-none")
  })
}catch(e){
  console.log(e)
}




