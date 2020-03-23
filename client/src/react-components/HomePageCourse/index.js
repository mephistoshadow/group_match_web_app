import './styles.css';
import React from "react";

class HomePageCourse extends React.Component {
	constructor(props) {
		super(props);
	}
	
	state = {
		people: this.props.people
	}

	render() {
		const joinButton = <button className="homeButton" onClick={() => this.props.joinCourse(this)}>JOIN</button>
		const dropButton = <button className="homeButton" onClick={() => this.props.dropCourse(this)}>DROP</button>

		return (
			<div className="homePageCourseItem" title={this.props.code.concat(this.props.title)}>
				<div className="homePageText">Course title: <span className="HomePageStateText">{this.props.title}</span></div>
				<div className="homePageText">Course code: <span className="HomePageStateText">{this.props.code}</span></div>
				<div className="homePageText">No. of students: <span className="HomePageStateText">{this.state.people}</span></div>
				{this.props.studentCourses.includes(this.props.code) ? dropButton : joinButton}
			</div>
		);
	}

}

export default HomePageCourse;


