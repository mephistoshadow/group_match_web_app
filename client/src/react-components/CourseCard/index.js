
import './styles.css';
import React from "react";
import {deleteCourse} from "../../actions/adminOperation"
import { updateCourse, updateCourseCode} from "../../actions/adminOperation"
import { searchCourse, getEnrolledStudent } from "../../actions/adminOperation"

class Card extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
        newName:'',
        newCode:'',
		operation: false,
		showDropDownlist: false,
		enrolledStudents : []
    }
     // const { student, usercomponents } = this.props;
   }

    // here we need a server call to delete the course

	async componentDidMount() {

		const courseId = this.props.student._id
		await getEnrolledStudent(this, courseId);
	}

	change = (e) => {
        this.setState({operation:!e})
    }

	changeDropDownState= (e) => {
		this.setState({ showDropDownlist: !e })
	}

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
         // console.log(this.props.usercomponents);

    }

     handleCChange= (event) => {
         this.setState({newCode: event.target.value});
         // console.log(this.props.usercomponents);

    }
     close = () => {
        this.props.course.setState({searchResult:false});
     }

     updateTitle = () => {
        updateCourse(this,this.props.usercomponents)
        this.props.course.setState({load : true});
        if(this.props.course.state.searchResult == true) {
             searchCourse(this.props.course,this.props.usercomponents)
        }
        this.setState({newName: ""});
    }

	 updatePassword = () => {
		updateCourseCode(this, this.props.usercomponents)
		this.props.course.setState({load : true});
        if(this.props.course.state.searchResult == true) {
             searchCourse(this.props.course,this.props.usercomponents)
        }
		this.setState({ newCode: ""});
	 }

	update = () => {
		if (this.state.newName != "") {
			this.updateTitle();
		}
		if (this.state.newCode != "") {
			this.updatePassword();
		}
	}

    showOperation= (e) => {
        if (!e) {
            return null;
        }

        return (
           <div className="button">
                <form >
                     <label className="bold">
                        CourseTitle:
                        <input type="text" value={this.state.newName} onChange={this.handleNChange} />
					</label><br/>
					<label className="bold">
						CourseCode:
                        <input type="text" value={this.state.newCode} onChange={this.handleCChange} />
					</label><br/>
                </form> 
                <div className = "text">
					<a onClick={() => this.update()}>SAVE CHANGES</a>
                </div>
                </div>
        );
    }

    showBack = () => {
         if (this.props.flag == false) {
            return null;
        }
        else {
            return (<div className = "coursebackbutton">
                <i className="fas fa-backspace"  onClick={() => this.close()}></i>
        </div>);
        }
     }


	getDropdownStudents() {
		const makeDropdownStudent = (student) => {
			return (
				<ul className="courseList" id="CourseDropDownContent">
					<li className="number" id="DropDownContent">id:<span className="profileStatsNumber">{student._id}</span></li>
					<li className="number" id="DropDownContent">Username :<span className="profileStatsNumber">{student.username}</span></li>
				</ul>
			)
		}
		const students = this.state.enrolledStudents
		let dropdownStudents = this.state.showDropDownlist ? students.map(makeDropdownStudent.bind(this)) : null
		return dropdownStudents
	}

	render() {
		console.log("In course")
		console.log(this.state.enrolledStudents)
        return (
            <div className="CourseCardOuter">
                <div className="student">
                    <div className="profileStats">
                        <ul className = "list">
                            <li className="number">Id:<span  className="profileStatsNumber">{this.props.student._id}</span></li>
                            <li className="number">Title:<span className="profileStatsNumber">{this.props.student.title}</span></li>
                            <li className="number">Code:<span className="profileStatsNumber">{this.props.student.code}</span></li>
							<li className="number">
								<span onClick={() => this.changeDropDownState(this.state.showDropDownlist)}>
									{this.state.showDropDownlist ? <i className="fas fa-chevron-down" /> : <i className="fas fa-chevron-right" />}
									Number Students: <span className="profileStatsNumber">{this.props.student.people}</span>
								</span>
								{this.getDropdownStudents()}
							</li>
						</ul>
                    </div>
                </div>
                 {this.showOperation(this.state.operation)}
                  <div className = "courseedit">
                    <i className="far fa-edit" onClick={() => this.change(this.state.operation)}></i>
                </div>
                <div className = "courseedittwo">
                    <i className="fas fa-trash-alt" onClick={() => deleteCourse(this,this.props.usercomponents)}></i>
                </div>
                 {this.showBack()}    
            </div>
        );
    }

}


export default Card;


