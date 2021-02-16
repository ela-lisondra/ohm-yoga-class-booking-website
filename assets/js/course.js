// console.log("hi from course.js")

// let params = new URLSearchParams(window.location.search)

// let courseId = params.get('courseId')

// // get the token from localStorage
// let token = localStorage.getItem("token");

// //Edit Feb 14, this is to get the Admin status and later use if for condition
// let adminUser = localStorage.getItem("isAdmin") === "true"
//  console.log(adminUser)
//  //End of Edit

// /*
//     undefined = variable was declared without initial value
//     not defined = the variable does not exist
// */

// let courseName = document.querySelector("#courseName")
// let courseDesc = document.querySelector("#courseDesc")
// let coursePrice = document.querySelector("#coursePrice")
// let enrollContainer = document.querySelector("#enrollContainer")

// console.log(courseName, courseDesc, coursePrice, enrollContainer)

// if (adminUser === true) {
// 	fetch(`http://localhost:8000/api/courses/${courseId}`)
// 	.then(res => res.json())
// 	.then(data => {
// 		console.log(data)
// 		courseName.innerHTML = data.name
// 		courseDesc.innerHTML = data.description
// 		coursePrice.innerHTML = data.price
// 		// console.log(data.price)


// 		if (data.enrollees.length === 0) {
// 			enrollContainer.innerHTML = `<h5 class="card-title">No Enrollees Available</h5>`

// 		} else {
// 			data.enrollees.forEach(enrollee => {
// 				console.log(enrollee)
// 				console.log(enrollee.enrolledOn)
			
// 				let userId = enrollee.userId

// 				fetch(`http://localhost:8000/api/users/details/${userId}`)
// 				.then(res => res.json())
// 				.then(data => {


// 					let enrolleeName = `${data.firstName} ${data.lastName}`;

// 					if (data) {
// 						// console.log('qq', data)
// 						enrollContainer.innerHTML +=
// 							` 
// 								<div class="card">
// 									<div class="card-body">
// 										<h5 class="card-title">${enrolleeName}</h5>
// 										<p class="card-text text-center">${enrollee.enrolledOn}
// 										</p>
// 									</div>
// 								</div>
// 							`
// 					} else {
// 						alert("Something went wrong");
// 					}
// 				})
// 			})
// 		}

// 	});
		
// } else{
	

// //get course id from routes
// fetch(`http://localhost:8000/api/courses/${courseId}`)
// .then(res=> res.json())
// .then(data =>{
// 	console.log(data)
	
// 	courseName.innerHTML = data.name
// 	courseDesc.innerHTML = data.description
// 	coursePrice.innerHTML = data.price
// 	enrollContainer.innerHTML = `<button id="enrollButton" class="btn btn-block btn-primary">Enroll</button>`
	

// 	document.querySelector("#enrollButton").addEventListener("click",()=>{

// 		//add fetch request to enroll our user
// 		fetch('http://localhost:8000/api/users/enroll',{
// 			method: 'POST',
// 			headers: {
				
// 				'Content-Type' : 'application/json',
// 				'Authorization' : `Bearer ${token}`
// 			},
// 			body: JSON.stringify({
// 				courseId: courseId
// 			})
// 		})
// 		.then(res => res.json())
// 		.then(data => {
// 			//redirect the user to the courses page after enrolling
			

// 			if(data === true ){

// 				alert('Thank you for enrolling to the course')
// 				window.location.replace('./courses.html')
// 			}else{

// 					alert("Please Register or Log in")
// 					window.location.replace('./register.html')
// 			}
    
// 		})

// 	})
// })

// }

// course.html?courseId=601cd461569ec51ec8f7188f
// URL Query parameters
// ? - start of query string
// courseId -=(parameter)
// 601cd461569ec51ec8f7188f = value

// window.location.search retuurn the query string in the URL
// console.log(window.location.search)

// instatiate or create a new URLSearchParams object
// This object, URLSearchParams, is used an interface to gain access to methods that allow us to specific parts of the query string.

let params = new URLSearchParams(window.location.search);

// the has method for URLSearchParams checks if the courseId key exists in our URL Query String.
// console.log(params.has('courseId'))

// the get method for URLSearchParams returns the value of the key passed in as an argument.

// console.log(params.get('courseId'))

// store the courseId from the URL Query string in a variable:
let courseId = params.get("courseId");

let adminUser = localStorage.getItem("isAdmin");

// get the taken from localStorage
let token = localStorage.getItem("token");

let courseName = document.querySelector("#courseName");
let courseDesc = document.querySelector("#courseDesc");
let coursePrice = document.querySelector("#coursePrice");
let enrollContainer = document.querySelector("#enrollContainer");

// get the details fo a single course.
fetch(`http://localhost:8000/api/courses/${courseId}`)
  .then((res) => res.json())
  .then((data) => {
    courseName.innerHTML = data.name;
    courseDesc.innerHTML = data.description;
    coursePrice.innerHTML = data.price;
    console.log(data);
    if (adminUser == "false" && token != null) {
      enrollContainer.innerHTML = `<button id="enrollButton" class="btn btn-block btn-primary">Enroll</button>`;

      document.querySelector("#enrollButton").addEventListener("click", () => {
        // add fetch request to enroll our user:
        fetch("http://localhost:8000/api/users/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: courseId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data === true) {
              alert("Thank you for enrolling to the course.");
              window.location.replace("./courses.html");
            } else {
              alert("Something Went Wrong.");
            }
          })
          .catch((err) => {
            alert("Course has been already enrolled");
          });
      });
    } else if (token != null) {
      if (data.enrollees.length < 1) {
        enrollContainer.innerHTML = "No Enrollees Available";
      } else {
        fetch("http://localhost:8000/api/users/")
          .then((res) => res.json())
          .then((users) => {
            data.enrollees.forEach((enrollee) => {
              users.forEach((user) => {
                if (enrollee.userId === user._id) {
                  enrollContainer.innerHTML += `

							<div class="card">
								<div class="card-body">
									<h5 class="card-title">${user.firstName} ${user.lastName}</h5>
									<p class="card-text text-center">${enrollee.enrolledOn}</p>
								</div>
							</div>

					`;
                }
              });
            });
          });
      }
    } else {
      enrollContainer.innerHTML = `<a href="./register.html" id="enrollButton" class="btn btn-block btn-primary">Enroll</a>`;
    }
  });

