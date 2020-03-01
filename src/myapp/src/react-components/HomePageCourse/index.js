import { joinCourse, dropCourse } from "../../actions/HomePage";
import './style.css';
import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';




class HomePageCourse extends React.Component {
	constructor(props) {
		super(props);
	}


	popNotIn() {
		console.log("You dont have this course")
	}

	popAreadyIn() {
		console.log("You're already joined in this Course")
	}

	joinCourse(student, course) {
		//joinCourse(student, course)
		console.log("Success Join in Course")
	}

	dropCourse(student, course) {
		//dropCourse(student, course)
		console.log("Success Drop Course")
	}

	render() {
		
		const {
			course,
			student,
			joinCourse,
			dropCourse
		} = this.props;
		const isIn = student.current_courses.includes(course.name)
	
		return (
			<div className="HomePagecourseItem">
				<div className="HomePageText">Course: <span className="HomePageStateText"> {this.props.course.name}</span></div>
				<div className="HomePageText">Number Studens: <span className="HomePageStateText"> {this.props.course.people}</span></div>
				<button className="HomePageJoinButton" onClick={joinCourse} value= {isIn} >Join </button>
				<button className="HomePageDropButton" onClick={dropCourse} value= {isIn} >Drop </button>
			</div>
			);
	}

}


export default HomePageCourse;


