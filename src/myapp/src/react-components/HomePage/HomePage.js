import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { uid } from "react-uid";

import HomePageCourse from "../HomePageCourse/index";
import Header from "../Header/index";

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
		return (
			<div class="HomePageouter"> 
				<Header></Header> 
				<h3 class="HomePagetitle">Choose Your Course</h3>
				<div class="HomePageCourseContainer">
					{this.props.state.courses.map(course =>
						(<HomePageCourse key={uid(course)} course={course} student={this.props.state.students}></HomePageCourse>)
				)} 
				</div>
			</div>
	)
	}

}

export default HomePage;

