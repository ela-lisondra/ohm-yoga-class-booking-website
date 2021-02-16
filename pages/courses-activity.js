
let token = localStorage.getItem("token")
let adminUser = localStorage.getItem("isAdmin") === "true"
let addButton = document.querySelector("#adminButton")

//This if statement will allow us to show a button for adding a course;a button to redirect us to the addCourse page if the user is admin, however, if he/she is a guest or a regular user, they should not see a button.
if(adminUser === false || adminUser === null){

	addButton.innerHTML = null

} else {
	addButton.innerHTML = `

		<div class="col-md-2 offset-md-10">
			<a href="./addCourse.html" class="btn btn-block btn-primary">Add Course</a>
		</div>


	`
}

/*
	Activity:

	use the fetch Method to get all the courses and show the data into the console using console.log()

	If you are done, create a new folder (s19) in gitlab
	inside s19 folder, create a new repo: d1

	In your local machine, connect your d1 to your online repo:
	git remote add origin <url>

	Then add, commit and push it into your new repo.

	Link to boodle as:
	WD057-11 | Express.js - Booking System API Integration


*/


