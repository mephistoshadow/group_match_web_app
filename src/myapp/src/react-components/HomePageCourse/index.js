
import './style.css';
import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 

class HomePageCourse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			people: 0
		}
	}
	
	render() {
		const courseName = this.props.course.name;
		const enrolledCourses = this.props.enrolledCourses;

		let actionButton;
		if (enrolledCourses.includes(courseName)) {
			actionButton = <button className="homeButton" onClick={() => this.props.dropCourse(courseName)}>DROP</button>
		} else {
			actionButton = <button className="homeButton" onClick={() => this.props.joinCourse(courseName)}>JOIN</button>
		}

		return (
			<div className="homePageCourseItem">
				<div className="homePageText">Course: <span className="HomePageStateText"> {this.props.course.name}</span></div>
				<div className="homePageText">Number of Students: <span className="HomePageStateText"> {this.props.course.people}</span></div>
				{actionButton}
			</div>
		);
	}

}


export default HomePageCourse;


