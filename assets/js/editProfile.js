
console.log(window.location.search)

let params = new URLSearchParams(window.location.search);

console.log(params.has('userId'))


let userId = params.get('userId')


let firstName = document.querySelector("#firstName")
let lastName = document.querySelector("#lastName")
let mobileNo = document.querySelector("#mobileNo")
let email = document.querySelector("#email")
let pwd1 = document.querySelector("#password1")
let pwd2 = document.querySelector("#password2")
let password;

fetch(`http://localhost:8000/api/users/details/${userId}`)
.then(res => res.json())
.then(data => {

	// console.log(data)

	// assign the current values as placeholders
	firstName.placeholder = data.firstName
    lastName.placeholder = data.lastName
	mobileNo.placeholder = data.mobileNo
	email.placeholder = data.email
    
	firstName.value = data.firstName
    lastName.value = data.lastName
	mobileNo.value = data.mobileNo
	email.value = data.email
    

    document.querySelector("#editUser").addEventListener("submit", (e) => {

    e.preventDefault()

    let token = localStorage.getItem('token')

    let first = firstName.value
    let last = lastName.value
    let mobileNum = mobileNo.value
    let uemail = email.value
    

    if(pwd1.value === '' && pwd2.value === '') {
        password = data.password
    } else if(pwd1.value === pwd2.value) {
        password = pwd1.value
    }


    fetch('http://localhost:8000/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            id: userId,
            firstName: first,
            lastName: last,
            email: uemail,
            mobileNo: mobileNum,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        
        console.log(data)

        if(data === true){
            
            window.location.replace("./profile.html")
        }else{
            
            alert("something went wrong")
        }

    })

})

})

// console.log()
