let formSubmit = document.querySelector("#createCourse")

// add an event listener
formSubmit.addEventListener("submit", (e) => {
	
	// preventDefault prevents the normal behaviour of an event. In this case, the event is submit and its default behavious is to refresh the page when submitting the form
	e.preventDefault()

	// get the values of your input:
	let courseName = document.querySelector("#courseName").value
	let description = document.querySelector("#courseDescription").value
	let price = document.querySelector("#coursePrice").value

	let token = localStorage.getItem("token")
	console.log(token)

	console.log(courseName, description, price)

	fetch('https://murmuring-meadow-95026.herokuapp.com/api/courses', {
		method: 'POST',
		headers: {

			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`

		},
		body: JSON.stringify({
			name: courseName,
			description: description,
			price: price
		})

	})
	.then(res => res.json())
	.then(data => {

	// if the creation of the course is successful, redirect admin to the courses page
		if (data === true){
		// redirect the admin to the courses page
		window.location.replace('./courses.html')

		} else {

			// error while creating a course
			alert("Course Creation Failed. Something Went Wrong.")
		}


	})
	
})