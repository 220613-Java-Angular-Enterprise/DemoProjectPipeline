// let courses = [
//     {
//         course: 'MATH101',
//         name: 'Intro to Math',
//         description: 'Learn the basics of math'
//     },
//     {
//         course: 'READ110',
//         name: 'Intro to Reading',
//         description: 'Learn to read'
//     },
//     {
//         course: 'SCI101',
//         name: 'Intro to Science',
//         description: 'Learn to science'
//     },
//     {
//         course: 'HIST101',
//         name: 'Intro to History',
//         description: 'Learn the wars'
//     },
//     {
//         course: 'MATH101',
//         name: 'Intro to Math',
//         description: 'Learn the basics of math'
//     }
// ]

let courses;

// We can grab the element of the div we want to store the courses in
let courseContainer = document.getElementById('courses-container');
console.log(courseContainer);

// We want to dynamically add in our courses to the webpage,
// So we'll loop through the list of courses

// For of loop for array
function populateCourses(courses) {


    for (course of courses) {
        // For each course in the course list, create a new div
        let cDiv = document.createElement('div');
        console.log(cDiv);

        // Populate information by setting the innerHTML
        cDiv.innerHTML = `
        <h2>${course.courseNum}</h2>
        <h3>${course.name}</h3>
        <p>${course.description}</p>
        <p> Available Seats: ${course.availableSeats} </p>
    `;

        console.log(cDiv);

        cDiv.setAttribute('class', 'course')

        // Let's append the courses to the course container
        courseContainer.append(cDiv);
    }

}

const URL = 'http://localhost:8080';

// Doing it the old fashioned way with the XHR Object
// For now, we'll use an iife
// There are 4 steps in making an AJAX request

/*
(()=>{
    //Step 1. Create the new XHR object
    let xhttp = new XMLHttpRequest();

    // Step 2. Create a callback function for readystatechange
    xhttp.onreadystatechange = getData = () =>{
        if (xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText)
            let res = JSON.parse(xhttp.responseText)
            populateCourse(res)
        }
    }

    let apiUrl = `${URL}/courses`

    // Step 3. Open the request
    xhttp.open('GET',apiUrl)

    // Step 4. Send the request
    xhttp.send()
})();
*/

// Basic Promise Syntax
let promise = new Promise(function (resolve, reject) {
    const x = 5;
    const y = 3;

    if (x >= y) {
        resolve(x)
    } else {
        reject();
    }
});

// Let's chain the promise with consumer functions
promise
    .then((x) => x * 2) // New value of promise is 5*2 = 10
    .then((y) => y * 3) // New values is 10*3 = 30
    .then((z) => console.log(z * 4)); // We print 30*4 = 120

// Let's look at the other cosnumer functions
promise
    .then(() => console.log("We resolved"))
    .catch(() => console.log("there was an error"))
    .finally(() => console.log("this runs no matter what"));


// Let's refactor the above AJAX with fetch and promises
/*
(() => {
    let apiUrl = `${URL}/courses`;
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => populateCourses(data));
})();


(function responseHeaders() {
    let apiUrl = `${URL}/courses`;
    fetch(apiUrl).then((res) => console.log('Headers, ', res.headers));
})();

(function requestHeaders() {
    let apiUrl = `${URL}/courses`;
    fetch(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
            'id': '3'
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
})();
*/

// Let's refactor once more using async and await
(async ()=>{
    let req = await fetch(`${URL}/courses`);
    let res = await req.json();

    console.log(res);

    courses = res;

    courseContainer.innerHTML ="";

    populateCourses(courses);
})();