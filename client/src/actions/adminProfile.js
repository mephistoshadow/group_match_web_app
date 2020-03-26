export const getCourseNumber = (homeComp) => {
	const url = '/courses'

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		if (json) {
			homeComp.setState({ course_num: json.length})
		}
	}).catch((error) => {
		console.log(error)
	})
}


export const getStudentNumber = (homeComp) => {
	const url = '/students'

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		if (json) {
			homeComp.setState({ student_num: json.length })
		}
	}).catch((error) => {
		console.log(error)
	})
}
