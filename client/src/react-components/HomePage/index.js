import React from "react";

import HomePageCourse from "../HomePageCourse";
import Header from "../Header";

import { getAllCourses, getStudentCourses, joinCourse, dropCourse } from "../../actions/homepage";

import './styles.css';


class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		joinedOrRemovedCourse: false,
		allCourses: [],
		studentCourses: []
	}

	async componentDidMount() {
		const { app } = this.props
		await getAllCourses(this)
		await getStudentCourses(this, app.state.currentId)
	}

    courseSearch() {
        const searchBox = document.querySelector("#courseSearchBar")
        const courses = document.querySelectorAll(".homePageCourseItem")
        const searchQuery = searchBox.value
        courses.forEach((course) => {
        	if (!course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        		course.style.display = 'none';
        	} else {
        		course.style.display = 'block';
        	}
        })
    }

	render() {
		const { app } = this.props

		return (
			<div> 
				<Header app={app} studentCourses={this.state.studentCourses}></Header>
				<h2 className="h2Header">Manage Your Courses Below</h2>

                <input type="text" id="courseSearchBar" onKeyUp ={() => this.courseSearch()} placeholder="Search for a course..."></input>
            
				<div className="homePageCourseContainer">
					{this.state.allCourses.map((course) =>
						(<HomePageCourse
							id={course._id}
							title={course.title}
							code={course.code}
							people={course.people}
							studentCourses={this.state.studentCourses}
							joinCourse={(courseComp) => joinCourse(this, courseComp, course._id, app.state.currentId)}
							dropCourse={(courseComp) => dropCourse(this, courseComp, course._id, app.state.currentId)}>
						</HomePageCourse>)
					)}
				</div>
			</div>
		)
	}

}

export default HomePage;

