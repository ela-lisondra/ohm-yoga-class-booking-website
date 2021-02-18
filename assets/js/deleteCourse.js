
let params = new URLSearchParams(window.location.search);


let courseId = params.get('courseId')

// console.log(courseId)

let token = localStorage.getItem('token')

fetch(`https://murmuring-meadow-95026.herokuapp.com/api/courses/${courseId}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(res => res.json())
.then(data => {

	//creation of new course successful
    if(data === true){
        //redirect to courses index page
        window.location.replace('./courses.html')
    } else {
        //error in creating course, redirect to error page
        alert('Something went wrong')
    }

})











