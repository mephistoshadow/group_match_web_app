export const getUserById = (profileComp, currentId) => {
	const url = `/users/${currentId}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((user) => {
		if (user._id === currentId) {
			profileComp.setState({
				username: user.username,
				email: user.email
			})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const getStudentById = (profileComp, currentId) => {
	const url = `/students/${currentId}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((student) => {
		if (student._id === currentId) {
			profileComp.setState({
				firstName: student.firstName,
				lastName: student.lastName,
				year: student.year,
				CGPA: student.CGPA,
				isCommuter: student.isCommuter
			})
		}
	}).catch((error) => {
		console.log(error)
	})
}