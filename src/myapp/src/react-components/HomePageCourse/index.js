
import './style.css';
import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 




class HomePageCourse extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			name:'',
			people: 0
		}
	}

	join() {
	}

	drop() {
	}

	render() {
		return (
			<div class="HomePagecourseItem">
				<div class="HomePageText">Course: <span class="HomePageStateText"> {this.props.course.name}</span></div>
				<div class="HomePageText">Number Studens: <span class="HomePageStateText"> {this.props.course.people}</span></div>
				<button class="HomePageButton" onClick={this.join}>Join </button>
				<button class="HomePageButton" onClick={this.join}>Drop </button>
			</div>
			);
	}

}


export default HomePageCourse;


