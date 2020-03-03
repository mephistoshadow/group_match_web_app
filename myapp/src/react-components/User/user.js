
import './user.css';
import React from "react";
import Student from "../StudentCard/StudentCard"
import Operation from "../Operation/Operation"
import Header from "../Header/index"
import { uid } from "react-uid";
import { getObjectByName } from "../../actions/BasicOperation";



class User extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
        user:"admin"
    }
     // const { state, app} = this.props;
     // console.log(this.props);

   }

  show= (e) => {
        console.log(e);
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
    }

    closepop = () =>{
        this.props.app.setState({pop:false});
        console.log(this.state.pop);
    }


    render() {
        const cur_student_name = 'user'
        const current_student = getObjectByName(this.props.state.students, cur_student_name)
        const current_courses = current_student.current_courses
        return (
        <div>
         <Header enrolledCourses={current_courses} user={this.state.user}/>
        <div className = "card">
            <div className="Userheader">
               Users
            </div>
            <div className="exsistingStudent">
            	 {this.props.state.students.map(student => (
                    <Student  key={uid(student)} student = {student} usercomponents = {this.props.app}/>
                ))}
            </div>
            <Operation student = {this.props.state.students} usercomponents = {this.props.app}/>
        </div>
         {this.show(this.props.state.pop)}
        </div>
         
        );


    }


}


export default User;


