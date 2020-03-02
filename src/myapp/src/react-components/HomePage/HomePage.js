import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { uid } from "react-uid";

import HomePageCourse from "../HomePageCourse/index";
import Header from "../Header/index";
import { getObjectById, getObjectByName } from "../../actions/BasicOperation";

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

	dropCourse(courseName) {
		const newEnrolledCourses = this.state.enrolledCourses.filter(function(course) {
			return course != courseName
		})

		this.setState({
			enrolledCourses: newEnrolledCourses
		})
	}

	joinCourse(courseName) {
		const newEnrolledCourses = this.state.enrolledCourses.concat([courseName])

		this.setState({
			enrolledCourses: newEnrolledCourses
		})
	}

	render() {
		return (
			<div className="homePageContainer"> 
				<Header enrolledCourses={this.state.enrolledCourses}></Header> 
			<h2 className="h2Header">Manage Your Courses Below</h2>
				<div className="homePageCourseContainer">
					{this.props.state.courses.map(course =>
						(<HomePageCourse 
							key={uid(course)}
							course={course}
							student={this.props.state.students}
							enrolledCourses={this.state.enrolledCourses}
							joinCourse={this.joinCourse.bind(this)}
							dropCourse={this.dropCourse.bind(this)}>
							</HomePageCourse>)
				)} 
				</div>
			</div>
		)
	}

}

export default HomePage;

