console.log("hi register")
let registerForm = document.querySelector("#registerUser")

// let firstName = document.querySelector("#firstName")
// let lastName = document.querySelector("#lastName")
// let mobileNumber = document.querySelector("#mobileNumber")
// let email = document.querySelector("#userEmail")
// let password1 = document.querySelector("#password1")
// let password2 = document.querySelector("#password2")


// console.log(firstName, lastName, mobileNumber, email, password1, password2)

// addEventListener("event", function)
	// Allows us to add a specific event into an element. This event can trigger a function for our page to do.

// Submit event allows us to submit a form. It's default behaviour is that it sends your form and refreshes the page
// (e) = event object. 


registerForm.addEventListener("submit", (e) => {
	// preventDefault() = prevents the submit event of its default behaviour, wont disappear nor refresh
 	e.preventDefault()

	// console.log("I triggered the submit event")

	let firstName = document.querySelector("#firstName").value
	// .value to get the input of user ex. Tristan
	// can also use it in the console log
	let lastName = document.querySelector("#lastName").value
	let mobileNumber = document.querySelector("#mobileNumber").value
	let email = document.querySelector("#userEmail").value
	let password1 = document.querySelector("#password1").value
	let password2 = document.querySelector("#password2").value


	if((password1 !== '' && password2 !== '') && (password1 === password2) && (mobileNumber.length === 11)){
		// console.log("pw1 and pw2 are not blank and matches each other")

		fetch('https://murmuring-meadow-95026.herokuapp.com/api/users/email-exists', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {

			// console.log(data)

			if (data === false) {

				fetch('https://murmuring-meadow-95026.herokuapp.com/api/users', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json'},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password1,
						mobileNo: mobileNumber
					})
				})
				.then(res => res.json())
				.then(data => {

					// console.log(data);

					if(data === true){
						alert("registered successfully")

						// redirect to login page
						window.location.replace("./login.html")
					} else {
						// error in creating registration
						alert("something went wrong")
					}
				})
			}
		})
	}

})












