let loginForm = document.querySelector("#logInUser");

loginForm.addEventListener("submit", (e) => {

	e.preventDefault();

	let email = document.querySelector("#userEmail").value
	let password = document.querySelector("#password").value

	console.log(email);
	console.log(password);

	if (email == "" || password == ""){
		alert("Please input your email and/or password")
	} else {

		fetch('https://murmuring-meadow-95026.herokuapp.com/api/users/login', {
			method: 'POST',
			// We use content-type if there's abody in request
			headers: { 'Content-Type': 'application/json' },
			// and we need to turn the body into an object by using JSON.stringify
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {

			// add if-else statement which will verify our users that they have logged in successfully and got their tokens. If thr user cannot log in successfully, they will get an alert. If the user has logged in successfully, we will save his token into the web browser and get his details using fetch.
			// To save data into the web browser, we access the localStorage. Then localStorage is used to save data into the web browser. This storage is read only, therefore, we set our data into the local storage through JS by providing a key/value pair into the storage. The method setItem() for localStorage allows us to save data into the localStorage. This is the syntax:
			//localStorage.setItem("key", data)
			//To get an item from the localtorage, this is the syntax:
			//localStorage.getItem("key")
			if(data.accessToken) {
				// Set the token into the local storage
				localStorage.setItem("token", data.accessToken)
				// Send a fetch request to decode the JWT and obtain the user ID and is Admin property.
				// NOTE: GET requests do NOT NEED its method defined in the options
				fetch('https://murmuring-meadow-95026.herokuapp.com/api/users/details', {
					headers: {

						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data => {

						localStorage.setItem("id", data._id)
						localStorage.setItem("isAdmin", data.isAdmin)

						// window.location.replace = this allows to redirect our user to another page
						window.location.replace("./courses.html")

				})
			} else {
				alert("Login Failed.  Something went wrong.")
			}
		})
	}
})








