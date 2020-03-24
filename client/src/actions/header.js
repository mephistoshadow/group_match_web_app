export const openHamburgerMenu = (hamburgerIcon, hamburgerMenu, hamburgerCollapsedMenu) => {
	hamburgerIcon.style.transform = "rotate(90deg)";
	hamburgerMenu.style.width = "120px";
	hamburgerCollapsedMenu.style.marginLeft = "120px";
}

export const closeHamburgerMenu = (hamburgerIcon, hamburgerMenu, hamburgerCollapsedMenu) => {
	hamburgerIcon.style.transform = "rotate(0deg)";
	hamburgerMenu.style.width = "0px";
	hamburgerCollapsedMenu.style.marginLeft = "0px";
}

export const getStudentCourses = (header, currentUser) => {
	const url = `/students/username/${currentUser}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		if (json) {
			header.setState({courses: json.courses})
		}
	}).catch((error) => {
		console.log(error)
	})
}