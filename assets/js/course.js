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
fetch(`https://murmuring-meadow-95026.herokuapp.com/api/courses/${courseId}`)
  .then((res) => res.json())
  .then((data) => {
    courseName.innerHTML = data.name;
    courseDesc.innerHTML = data.description;
    coursePrice.innerHTML = data.price;
    console.log(data);
    if (adminUser == "false" && token != null) {
      enrollContainer.innerHTML = `<button id="enrollButton" class="btn btn-block">Enroll</button>`;

      document.querySelector("#enrollButton").addEventListener("click", () => {
        // add fetch request to enroll our user:
        fetch("https://murmuring-meadow-95026.herokuapp.com/api/users/enroll", {
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
        fetch("https://murmuring-meadow-95026.herokuapp.com/api/users/")
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
      enrollContainer.innerHTML = `<a href="./register.html" id="enrollButton" class="btn btn-block">Enroll</a>`;
    }
  });

