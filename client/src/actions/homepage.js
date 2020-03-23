// Methods in this file modifies the courses of student/user in HomePage 

const log = console.log;

const getAllCourses = (homeComp) => {
	const url = 'http://localhost:5000/courses'

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

const getStudentCourses = (homeComp, currentUser) => {
	const url = `http://localhost:5000/students/username/${currentUser}`

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

const joinCourse = (homeComp, courseComp, courseCode, studentUsername) => {
	const request = new Request("http://localhost:5000/students/add-course", {
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

const dropCourse = (homeComp, courseComp, courseCode, studentUsername) => {
	const request = new Request("http://localhost:5000/students/remove-course", {
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

module.exports = {
	getAllCourses,
	getStudentCourses,
	joinCourse,
	dropCourse
}