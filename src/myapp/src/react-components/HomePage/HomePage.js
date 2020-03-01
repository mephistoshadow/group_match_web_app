import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { uid } from "react-uid";

import HomePageCourse from "../HomePageCourse/index";
import Header from "../Header/index";
import {getObjectByName } from "../../actions/BasicOperation";
import { joinCourse, dropCourse } from "../../actions/HomePage";

import './style.css';


class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop: false
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


	render() {
		const student_name = 'user'
		const student = getObjectByName(this.props.state.students, student_name)
		return (
			<div className="HomePageouter"> 
				<Header></Header> 
			<h3 className="HomePagetitle">Hi, Choose Your Course</h3>
				<div className="HomePageCourseContainer">
					{this.props.state.courses.map(course =>
						(<HomePageCourse
							key={uid(course)}
							course={course}
							student={student}
							joinCourse={() => joinCourse(this, student, course)}
							dropCourse={() => dropCourse(this, student, course)}
						/>)
				)} 
				</div>
			</div>
	)
	}

}

export default HomePage;

