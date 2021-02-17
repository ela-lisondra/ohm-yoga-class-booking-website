console.log(window.location.search)

let params = new URLSearchParams(window.location.search);

let courseId = params.get('courseId')

let name = document.querySelector("#courseName")
let price = document.querySelector("#coursePrice")
let description = document.querySelector("#courseDescription")

fetch(`https://murmuring-meadow-95026.herokuapp.com/api/courses/${courseId}`)
.then(res => res.json())
.then(data => {

	console.log(data)

	name.placeholder = data.name
	price.placeholder = data.price
	description.placeholder = data.description
	name.value = data.name
	price.value = data.price
	description.value = data.description

})

document.querySelector("#editCourse").addEventListener("submit", (e) => {

	e.preventDefault()

	let courseName = name.value
	let desc = description.value
	let priceValue = price.value

	let token = localStorage.getItem('token')

	fetch('https://murmuring-meadow-95026.herokuapp.com/api/courses', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            id: courseId,
            name: courseName,
            description: desc,
            price: priceValue
        })
    })
    .then(res => res.json())
    .then(data => {
        
    	console.log(data)

    	//creation of new course successful
    	if(data === true){
    	    //redirect to courses index page
    	    window.location.replace("./courses.html")
    	}else{
    	    //error in creating course, redirect to error page
    	    alert("something went wrong")
    	}

    })

})

/*let token = localStorage.getItem()

let name = document.querySelector('#name')
let email = document.querySelector('#email')
let mobileNo = document.querySelector('#mobileNo')

fetch(, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(res => res.json())
.then(data => {

    console.log(data);

    if(data){
        name.innerHTML = data.name
    }

})*/
