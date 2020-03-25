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

export const updateUserById = (profileComp, currentId) => {
	const url = `/users/update/${currentId}`
	const body = {}

	const email = profileComp.state.newEmail
	if (email !== '') {
		body['email'] = email
	}

	const password = profileComp.state.password
	if (password !== '') {
		body['password'] = password
	}

	const updateRequest = new Request(url, {
		method: 'put',
		body: JSON.stringify(body),
		headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
	})

	console.log('sending request', url, currentId, body)

	fetch(updateRequest).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((user) => {
		if (user._id === currentId) {
			profileComp.setState({
				username: user.username,
				email: user.email,
				newEmail: '', password: ''
			})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const updateStudentById = (profileComp, currentId) => {
	const url = `/students/update/${currentId}`
	const body = {
		firstName: profileComp.state.firstName,
		lastName: profileComp.state.lastName,
		year: profileComp.state.year,
		CGPA: profileComp.state.CGPA,
		isCommuter: profileComp.state.isCommuter
	}

	const updateRequest = new Request(url, {
		method: 'put',
		body: JSON.stringify(body),
		headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
	})

	console.log('sending request', url, currentId, body)

	fetch(updateRequest).then((result) => {
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