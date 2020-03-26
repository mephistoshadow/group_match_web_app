
import '../User/styles.css';
import React from "react";
import Card from "../CourseCard"
import {addCourse} from "../../actions/adminOperation"

class CourseOperation extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
            newName:'',
            newCode:''
        }
        // const { students, usercomponents } = this.props;
    
    }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});

    }

     handleCChange= (event) => {
         this.setState({newCode: event.target.value});
         // console.log(this.props.usercomponents);

    }
    addCourseChecker = () => {
        if(this.state.newName == "" || this.state.newCode == "") {
            alert("dont leave these two area blank")
        }else if (this.state.newCode.length != 6 ) {
            alert("course code must be length 6")
        } else {
            addCourse(this, this.props.usercomponents)
        }
    }

    render() {
        return (
          <div className="courseoperation">
            <div className="newStudent">
                <div className="studentinfo">
                    <ul>
                        <li className="coursenumber">Course Title:<input className="searchText" type="text" onChange={this.handleNChange} ></input></li>
                        <li className="coursenumber">Course Code:<input className="searchText" type="text" onChange={this.handleCChange} ></input></li>
                    </ul>
                </div>
            </div>    
             <div className="addCourse">
                    <a onClick={() => this.addCourseChecker()} >Add Course</a>
            </div>    
        </div>
        );
    }


}


export default CourseOperation;


