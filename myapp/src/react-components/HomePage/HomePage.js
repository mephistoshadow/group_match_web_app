import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { uid } from "react-uid";

import HomePageCourse from "../HomePageCourse/index";
import Header from "../Header/index";
import { getObjectByName } from "../../actions/BasicOperation";
import { joinCourse, dropCourse } from "../../actions/HomePage";

import './style.css';


class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop: false,
			enrolledCourses: this.props.state.enrolledCourses,
		}
	}

	componentDidMount() {
		console.log(this.props.state.notificationCounter);
	}

	render() {
		// We need to read from server to get the current login in student name and 
		// other data, such as the user lists: students, the course lists: courses
		// In fact, for the most of time when we're using this.props.state in every page, 
		//we need to read data From server. The smaller component will not need server call.
		const cur_student_name = 'user'
		const current_student = getObjectByName(this.props.state.students, cur_student_name)
		const current_courses = current_student.current_courses

		return (
			<div className="homePageContainer"> 
				<Header enrolledCourses={current_courses} path='user-profile' notificationCounter={this.props.state.notificationCounter} ></Header>
				<h2 className="h2Header">Manage Your Courses Below</h2>
				<div className="homePageCourseContainer">
					{this.props.state.courses.map(course =>
						(<HomePageCourse 
							key={uid(course)}
							course={course}
							student={this.props.state.students}
							enrolledCourses={current_courses}
							joinCourse={() => joinCourse(this, current_student, course)}
							dropCourse={() => dropCourse(this, current_student, course)}>
							</HomePageCourse>)
				)} 
				</div>
			</div>
		)
	}

}

export default HomePage;

