
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
			<div className="HomePagecourseItem">
				<div className="HomePageText">Course: <span className="HomePageStateText"> {this.props.course.name}</span></div>
				<div className="HomePageText">Number Studens: <span className="HomePageStateText"> {this.props.course.people}</span></div>
				<button className="HomePageButton" onClick={this.join}>Join </button>
				<button className="HomePageButton" onClick={this.join}>Drop </button>
			</div>
			);
	}

}


export default HomePageCourse;


