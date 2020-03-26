export const getStudentObj = (matchComp, currentUser) => {
    const url = '/students/username/' + currentUser
    fetch(url).then((result) => {
        if (result.status === 200) {
            return result.json()
        }
    }).then((json) => {
        console.log("JSON: ", json)
        if (json) {
            
            matchComp.setState({currProfile: json})
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const getAllMatches = (matchComp, currentUser) => {
    const url = '/matches/' + currentUser
    fetch(url).then((result) => {
        if (result.status === 200) {
            return result.json()
        }
    }).then((json) => {
        if (json) {
            console.log("JSON: ", json)
            matchComp.setState({matches: json})
        }
    }).catch((error) => {
        console.log(error)
    })

}

export const getStudentCourses = (matchComp, currentUser) => {
	const url = `/students/username/${currentUser}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		if (json) {
			matchComp.setState({courses: json.courses})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const deleteMatch = (matchComp, courseCode, sender, receiver) => {
	const url = `/matches`

	const deleteRequest = new Request(url, {
		method: "delete",
		body: JSON.stringify({
			sender: sender,
			receiver: receiver,
			courseCode: courseCode
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
            
		matchComp.setState({
			matches: matchComp.state.matches.filter((match) => JSON.stringify(match) !== JSON.stringify({sender: json.sender, receiver: json.receiver, courseCode: json.courseCode}))
		})
	}).catch((error) => {
		console.log(error)
	})
}


