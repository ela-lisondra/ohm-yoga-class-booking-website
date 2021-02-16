let navItems = document.querySelector("#navSession");
let registerLink = document.querySelector("#register")
let userToken = localStorage.getItem("token");

if(!userToken) {
	navItems.innerHTML =
		`
			<li class="nav-item ">
					<a href="./pages/login.html" class="nav-link"> Login </a>
			</li>
		`

	registerLink.innerHTML =
		`

			<li class="nav-item ">
					<a href="./pages/register.html" class="nav-link"> Register </a>
			</li>
		`
} else {
	navItems.innerHTML = 
		`
			<li class="nav-item ">
					<a href="./pages/logout.html" class="nav-link"> Log out </a>
			</li>
		`

}