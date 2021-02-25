console.log('hi from profile')
let name = document.querySelector("#userName");
let desc = document.querySelector("#userDesc");
let userCourses = document.querySelector("#enrollContainer");
let token = localStorage.getItem('token');
let courseArray = [];
let editButton = document.querySelector("#editButton");

// console.log(name,desc,userCourses);

fetch(`https://murmuring-meadow-95026.herokuapp.com/api/users/details`,{

	headers: {
		'Authorization' : `Bearer ${token}`
	}
	
})
.then(res => res.json())
.then(data =>{

	// console.log("aaa", data)
	// console.log(data.enrollments[0].courseId)
	// console.log(data.enrollments.length)

	if (data) {

		name.innerHTML =` ${data.firstName}  ${data.lastName}`
		desc.innerHTML =`Mobile Number: ${data.mobileNo} <br> Email: ${data.email}`
		editButton.innerHTML = 
								`
									<div class="col-md-2 offset-md-10">
										<a href="./editProfile.html?userId=${data._id}" value="{data._id}" class="btn">Edit Profile</a>
									</div>
								`;
	} else {

		alert("Something went wrong");
	}


	data.enrollments.forEach(course => {
		console.log(course)
	})  

	

	data.enrollments.forEach(course => {
	// for (let i = 0; i < data.enrollments.length; i++) {

		let courseId = course.courseId


		fetch(`https://murmuring-meadow-95026.herokuapp.com/api/courses/${courseId}`,{

			headers: {
				"Content-Type": 'application/json',
				'Authorization': `Bearer ${token}`
			}
			
		})
		.then(res => res.json())
		.then(data =>{		
			// console.log(data.name)	
		
			if (data) {
				userCourses.innerHTML +=
				` 
					<div class="card my-5">
						<div class="card-body">
							<h5 class="card-title">${data.name}</h5>
							<p class="card-title">${course.enrolledOn}</p>
							<p class="card-title">${course.status}</p>
						</div>
					</div>
				`
				
			} else {
				alert("Something went wrong");
			}

		})

	})	

})


