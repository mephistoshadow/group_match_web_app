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
			enrolledCourses: this.props.state.enrolledCourses
		}
	}


	/*
	show = (e) => {
		if (!e) {
			return null;
		}

		return (
		<div className="popup">
			<div className="cross" onClick={this.closepop}>
			<i className="fa fa-times-circle"></i>
			</div>
			<span className="popupcontent">Changes Saved!</span>
			</div>
		);
	}*/

	closepop = () => {
		this.props.app.setState({ pop: false });
		console.log(this.state.pop);
	}
	/*
	dropCourse(courseName) {
		const newEnrolledCourses = this.state.enrolledCourses.filter(function(course) {
			return course != courseName
		})

		this.setState({
			enrolledCourses: newEnrolledCourses
		})
	}

	joinCourse(state, courseName) {
		const cur_student_name = 'user'
		const studentsList = state.props.state.students
		const student = getObjectByName(state.props.state.students, cur_student_name)

		console.log(student)
		
		const newStudentsList = studentsList.splice(studentsList.indexOf(student), 1)

		student.current_courses.push(courseName)
		console.log(student)
		console.log(studentsList)
		
		state.setState({ students: studentsList })
		console.log(state.props.state.students)
	}*/

	render() {
		const cur_student_name = 'user'
		const current_student = getObjectByName(this.props.state.students, 'user')
		const current_courses = current_student.current_courses
		
		return (
			<div className="homePageContainer"> 
				<Header enrolledCourses={current_courses} path='profile'></Header> 
			<h2 className="homePageTitle">Manage Your Courses Below</h2>
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

