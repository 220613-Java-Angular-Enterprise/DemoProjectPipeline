// Get the container for user info
let personContainer = document.getElementById("user-container")

function populatePerson(person){
    let courseInfo = "";
    for(course of person.courses){
        courseInfo += `<h3>${course.courseNum}</h3>
                        <h4>${course.name}</h4>
                        <br>`
    }

    personContainer.innerHTML = `
    <h1> Name: ${person.first} ${person.last} </h1>
    <h2> Username: ${person.username} </h2>
    <h2> Email: ${person.email} </h2>
    <h2> Courses Enrolled: </h2>
    <br>
    ${courseInfo}
    `
};

const URL = 'http://localhost:8080';

// Fetch function to get the information for the user
(async () =>{
    // Normally you could redirect to a 403 page for forbidden  but 
    // we're just rerouting to login for now
    if(sessionStorage.getItem("username") == null){
        window.location.href = "login.html"
    }

    let req = await fetch(`${URL}/users/${sessionStorage.getItem("username")}`);
    let res = await req.json();
    personContainer.innerHTML = "";
    populatePerson(res);
    populateUpdate(res);
})();

function toggleUpdateForm(){
    let form = document.getElementById("update-form")
    if (form.hasAttribute("hidden")){
        form.removeAttribute("hidden")
    } else {
        form.setAttribute("hidden", "true");
    }
}

function populateUpdate(person){
    document.getElementById("first").setAttribute("value", `${person.first}`)
    document.getElementById("last").setAttribute("value", `${person.last}`)
    document.getElementById("username").setAttribute("value", `${person.username}`)
    document.getElementById("password").setAttribute("value", `${person.password}`)
    document.getElementById("email").setAttribute("value", `${person.email}`)
}

// Now we need to prep for sending our PUT request

document.getElementById("update-form").addEventListener("submit", update);

function update(event){
    event.preventDefault();
    putUser();
}

let putUser = async () => {
    let id = sessionStorage.getItem("id");
    let first = document.getElementById("first").value
    let last = document.getElementById("last").value
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let email = document.getElementById("email").value


    let updateObj = {
        id,
        first,
        last,
        username,
        password,
        email
    }

    console.log(updateObj)

    let req = await fetch(`${URL}/users`,{
        method: "PUT",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(updateObj)
    });

    let res = await req.json();

    sessionStorage.setItem("username" , `${res.username}`)

    location.reload();

}