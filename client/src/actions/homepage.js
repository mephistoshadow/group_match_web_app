export const getAllCourses = (homeComp) => {
	const url = '/courses'

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		if (json) {
			homeComp.setState({allCourses: json})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const getStudentCourses = (homeComp, currentUser) => {
	const url = `/students/username/${currentUser}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		if (json) {
			homeComp.setState({studentCourses: json.courses})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const joinCourse = (homeComp, courseComp, courseCode, studentUsername) => {
	const request = new Request("/students/add-course", {
        method: "post",
        body: JSON.stringify({
        	courseCode: courseCode,
        	studentUsername: studentUsername
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then((result) => {
    	if (result.status === 200) {
    		return result.json()
    	}
    }).then((jsons) => {
    	if (jsons.course && jsons.student) {
    		console.log('setting state', jsons.course, jsons.student)
    		homeComp.setState({studentCourses: jsons.student.courses})
    		courseComp.setState({people: jsons.course.people})
    	}
    }).catch((error) => {
    	console.log(error)
    })
}

export const dropCourse = (homeComp, courseComp, courseCode, studentUsername) => {
	const request = new Request("/students/remove-course", {
        method: "post",
        body: JSON.stringify({
        	courseCode: courseCode,
        	studentUsername: studentUsername
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then((result) => {
    	console.log(result)
    	if (result.status === 200) {
    		return result.json()
    	}
    }).then((jsons) => {
    	if (jsons.course && jsons.student) {
			console.log('setting state', jsons.course, jsons.student)
    		homeComp.setState({studentCourses: jsons.student.courses})
    		courseComp.setState({people: jsons.course.people})
    	}
    }).catch((error) => {
    	console.log(error)
    })
}