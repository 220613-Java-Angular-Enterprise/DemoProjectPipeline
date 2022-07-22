
// We can grab the element of the div we want to store the courses in
let courseContainer = document.getElementById('courses-container');


// We want to dynamically add in our courses to the webpage,
// So we'll loop through the list of courses

// For of loop for array
function populateCourses(courses) {


    for (course of courses) {
        // For each course in the course list, create a new div
        let cDiv = document.createElement('div');
        // Populate information by setting the innerHTML
        cDiv.innerHTML = `
        <h2>${course.courseNum}</h2>
        <h3>${course.name}</h3>
        <p>${course.description}</p>
        <p> Available Seats: ${course.availableSeats} </p>
    `;


        cDiv.setAttribute('class', 'course')

        // Let's append the courses to the course container
        courseContainer.append(cDiv);
    }

}

const URL = 'http://localhost:8080';

(async ()=>{
    if(sessionStorage.getItem("username") == null){
        window.location.href = "login.html"
    }
    let req = await fetch(`${URL}/courses/available`)
    let res = await req.json();

    console.log(res);

    courses = res;

    courseContainer.innerHTML = "";

    populateCourses(courses);
})();

document.getElementById("enroll-form").addEventListener('submit', submitEnroll);

function submitEnroll(event){
    event.preventDefault();
    postEnroll();
}

let postEnroll = async () =>{
    
    let id = sessionStorage.getItem("id");

    let req = await fetch(`${URL}/users/enroll/${document.getElementById('course').value}`,
    {
        method: 'POST',
        headers: {'Content-Type' : 'application/json',
                    'id': `${id}`}
    })

    let res = await req.json();

    console.log(res);

    location.reload();
}