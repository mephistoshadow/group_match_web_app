
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
			<div class="courseItem">
				<div class="number">Course: <span class="profileStatsNumber"> {this.props.course.name}</span></div>
				<div class="number">Number Studens: <span class="profileStatsNumber"> {this.props.course.people}</span></div>
				<button class="homeButton" onClick={this.join}>Join </button>
				<button class="homeButton" onClick={this.join}>Drop </button>
			</div>
			);
	}

}


export default HomePageCourse;


