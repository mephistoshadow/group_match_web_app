export const getStudent = (matchComp, currentId) => {
    const url = `/students/${currentId}`

    fetch(url).then((result) => {
        if (result.status === 200) {
            return result.json()
        }
    }).then((student) => {
        if (student._id === currentId) {
        	matchComp.setState({student: student})
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const getStudentCourses = (matchComp, currentId) => {
	const url = `/students/courses/${currentId}`

	console.log()
	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((courses) => {
		if (courses) {
			matchComp.setState({courses: courses})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const getStudentMatches = (matchComp, currentId) => {
    const url = `/matches/${currentId}`

    fetch(url).then((result) => {
        if (result.status === 200) {
            return result.json()
        }
    }).then((matches) => {
        if (matches) {
        	matchComp.setState({matches: matches})
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const deleteMatch = (matchComp, courseId, sender, receiver) => {
	const url = '/matches'

	const deleteRequest = new Request(url, {
		method: "delete",
		body: JSON.stringify({
			sender: sender,
			receiver: receiver,
			course: courseId
		}),
		headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
	})

	fetch(deleteRequest).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		if (json) {
			const deletedMatch = {sender: json.sender, receiver: json.receiver, course: json.course}
			matchComp.setState({
				matches: matchComp.state.matches.filter((match) => JSON.stringify(match) !== JSON.stringify(deletedMatch))
			})
		}
	}).catch((error) => {
		console.log(error)
	})
}