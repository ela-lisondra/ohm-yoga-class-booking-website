let token = localStorage.getItem("token")
let adminUser = localStorage.getItem("isAdmin") === "true"
let addButton = document.querySelector("#adminButton")
let cardFooter

//This if statement will allow us to show a button for adding a course;a button to redirect us to the addCourse page if the user is admin, however, if he/she is a guest or a regular user, they should not see a button.
if(adminUser === false || adminUser === null){
	addButton.innerHTML = null
} else {
	addButton.innerHTML = `
		<div class="col-md-2 offset-md-10">
			<a href="./addCourse.html" class="btn btn-block">Add Course</a>
		</div>
	`
}

fetch('https://murmuring-meadow-95026.herokuapp.com/api/courses/')
.then(res => res.json()) //string to json
.then(data => {
	// console.log("array of courses:")
	// console.log(data)

	// a variable that wil store the data to be rendered
	let courseData;

	if (data.length < 1) {
		courseData = "No courses available at this time."
	} else {
		courseData = data.map(course => {
			// console.log(course);
			//regular user
			if(adminUser == false || !adminUser) {
				if (course.isActive === true) {
					cardFooter = 
						`
							<a href="./course.html?courseId=${course._id}" value={course._id} class="btn text-white btn-block editButton">Select Class</a>
						`
					return(
						`
							<div class="col-md-6 my-3">
								<div class="card">
									<div class="card-body">
										<h5 class="card-title">
											${course.name}
										</h5>
										<p class="card-text text-left">
											${course.description}
										</p>
										<p class="card-text text-right">
											₱${course.price}
										</p>
									</div>
									<div class="card-footer">
										${cardFooter}
									</div>
								</div>
							</div>
						`
					)	
				}
			//admin
			} else {
				if (course.isActive === true) {				
					cardFooter =
						`
							<a href="./course.html?courseId=${course._id}" value={course._id} class="btn btn-success text-white btn-block viewButton">
								View
							</a>
							<a href="./editCourse.html?courseId=${course._id}" value={course._id} class="btn btn-primary text-white btn-block editButton">
								Edit
							</a>
							<a href="./disableCourse.html?courseId=${course._id}" value={course._id} class="btn btn-danger text-white btn-block deleteButton">
								Disable
							</a>
						`
				} else {
						cardFooter =
						`
							<a href="./course.html?courseId=${course._id}" value={course._id} class="btn btn-success text-white btn-block viewButton">
								View
							</a>
							<a href="./editCourse.html?courseId=${course._id}" value={course._id} class="btn btn-primary text-white btn-block editButton">
								Edit
							</a>
							<a href="./enableCourse.html?courseId=${course._id}" value={course._id} class="btn btn-warning text-white btn-block deleteButton">
								Enable
							</a>
						`
				}
				return(
					`
						<div class="col-md-6 my-3">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">
										${course.name}
									</h5>
									<p class="card-text text-left">
										${course.description}
									</p>
									<p class="card-text text-right">
										₱${course.price}
									</p>
								</div>
								<div class="card-footer">
									${cardFooter}
								</div>
							</div>
						</div>
					`
				)
			}

		}).join("") //<- to remove the , every after element caused by .map().
	}
	let container = document.querySelector("#coursesContainer")

	container.innerHTML = courseData;
})






