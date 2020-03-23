import React from "react";
import { uid } from "react-uid";

import HomePageCourse from "../HomePageCourse";
import Header from "../Header";
import { getObjectByName } from "../../actions/basicoperation";
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
		await getStudentCourses(this, app.state.currentUser)
	}

    courseSearch(event) {
        const searchBox = document.querySelector("#courseSearchBar")
        const searchQuery = searchBox.value
        const courses = document.querySelectorAll(".homePageCourseItem")
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
			<div className="homePageContainer"> 
				<Header enrolledCourses={this.state.studentCourses} user={app.state.currentUser} isAdmin={app.state.isAdmin} notificationCounter={this.props.state.notificationCounter}></Header>
				<h2 className="h2Header">Manage Your Courses Below</h2>

            <div id="searchContainer">
                <input type="text" id="courseSearchBar" onKeyUp ={this.courseSearch} placeholder="Enter a course..."></input>
            </div>
				<div className="homePageCourseContainer">
					{this.state.allCourses.map((course) =>
						(<HomePageCourse
							title={course.title}
							code={course.code}
							people={course.people}
							studentCourses={this.state.studentCourses}
							joinCourse={(courseComp) => joinCourse(this, courseComp, course.code, app.state.currentUser)}
							dropCourse={(courseComp) => dropCourse(this, courseComp, course.code, app.state.currentUser)}>
						</HomePageCourse>)
					)}
				</div>
			</div>
		)
	}

}

export default HomePage;

