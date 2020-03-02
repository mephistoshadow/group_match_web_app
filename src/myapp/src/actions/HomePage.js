// Methods in this file modifies the courses of student/user in HomePage 

const log = console.log;

// Function to join/drop a course
export const joinCourse = (state, student, course) => {
	const current_courses = student.current_courses
	const course_name = course.name
	const isIn = current_courses.includes(course_name)
	const coursesList = state.props.state.courses
	const studentsList = state.props.state.students

	const student_index = studentsList.indexOf(student)
	const course_index = coursesList.indexOf(course)

	if (!isIn) {
		student.current_courses.push(course_name)
		coursesList[course_index].people = coursesList[course_index].people + 1
		console.log("Successful JOin In Course")
	} else {
		console.log("You have already Joined IN")
	}

	studentsList[student_index] = student
	state.setState({
		students: studentsList,
		courses: coursesList
	})

	console.log(state.props.state.students[1].current_courses)
};

export const dropCourse = (state, student, course) => {
	const current_courses = student.current_courses
	const course_name = course.name
	const isIn = current_courses.includes(course_name)
	const coursesList = state.props.state.courses
	const studentsList = state.props.state.students

	const student_index = studentsList.indexOf(student)
	const course_index = coursesList.indexOf(course)

	if (isIn) {
		student.current_courses.splice(student.current_courses.indexOf(course_name), 1)
		coursesList[course_index].people -= 1
		console.log("Successful Drop Course")
	} else {
		console.log("You cannot Drop Course before you join it")
	}
	
	studentsList[student_index] = student
	state.setState({
		students: studentsList
	})

	console.log(state.props.state.students[1].current_courses)
	
};
