let loginButton = document.getElementById("login-form").addEventListener("submit", submitLogin);

const URL = "http://localhost:8080"

function submitLogin(event){
    event.preventDefault();
    postLogin();
}



let postLogin = async () =>{
    // First thing we should do is capture the information from the form
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    let loginObj = {
        username,
        password
    }

    console.log(loginObj);

    let req = await fetch(`${URL}/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginObj)
    });

   let res = await req.json();

   console.log(res);

   // The question becomes how do we store this information??
   // We can do it a couple ways inlcuding things like cookies

   // Today we're going to utilize the sessionStorage
   sessionStorage.setItem("id", `${res.id}`)
   sessionStorage.setItem("username", `${res.username}`)

   window.location.href = "home.html"
}

function toggleForm(){
    let registerForm = document.getElementById("register-form");
    if( registerForm.hasAttribute("hidden")){
        registerForm.removeAttribute("hidden");
    } else{
        registerForm.setAttribute("hidden", "true");
    }
}

let registerButton = document.getElementById("register-form").addEventListener("submit", submitRegister);


function submitRegister(event){
    event.preventDefault();
    postRegister();
}

let postRegister = async () =>{
    // First thing we should do is capture the information from the form
    let first = document.getElementById('first').value;
    let last = document.getElementById('last').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;

    let registerObj = {
        first,
        last,
        username,
        password,
        email
    }

    console.log(registerObj);

    let req = await fetch(`${URL}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(registerObj)
    });

   let res = await req.json();

   console.log(res);

   // The question becomes how do we store this information??
   // We can do it a couple ways inlcuding things like cookies

   // Today we're going to utilize the sessionStorage
   sessionStorage.setItem("id", `${res.id}`)
   sessionStorage.setItem("username", `${res.username}`)

   window.location.href = "home.html"
}