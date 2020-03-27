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

export const getStudentCourses = (header, currentId) => {
	const url = `/students/${currentId}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((student) => {
		if (student) {
			header.setState({studentCourses: student.courses})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const getAllCourses = (header) => {
	const url = '/courses'

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((courses) => {
		if (courses) {
			header.setState({allCourses: courses})
		}
	}).catch((error) => {
		console.log(error)
	})
}