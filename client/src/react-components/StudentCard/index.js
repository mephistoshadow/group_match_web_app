
import '../User/styles.css';
import React from "react";
import { deleteStudent } from "../../actions/adminOperation"
import { deleteUser } from "../../actions/adminOperation"
import { updateStudentUserName } from "../../actions/adminOperation"
import { updateUserPassword } from "../../actions/adminOperation"
import { updateUserName } from "../../actions/adminOperation"
import { searchStudents } from "../../actions/adminOperation"
import { getEnrolledCourses } from "../../actions/adminOperation"
import { remove } from "../../actions/adminOperation"

class Student extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        newName:"",
        newPassword:"",
        operation:false,
        name:"",
        showDropDownlist: false,
        enrollCourses : []
    }
     const { student, usercomponents } = this.props;
    
   }

   changeDropDownState= (e) => {
        this.setState({ showDropDownlist: !e })
    }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
         // console.log(this.props.usercomponents);

    }
    handlePChange= (event) => {
         this.setState({newPassword: event.target.value});
    }
    update = () => {
        updateUserName(this,this.props.usercomponents);
        updateStudentUserName(this, this.props.usercomponents);
        this.setState({name: this.state.newName});
        this.props.user.setState({load : true});
        if(this.props.user.state.searchResult == true) {
             searchStudents(this.props.user, this.props.usercomponents)
        }
        console.log(this.props.user.searchResult);
        this.setState({newName: ""});
    }

    delete = () => {
        remove(this,this.props.usercomponents);
        deleteStudent(this,this.props.usercomponents)
        deleteUser(this,this.props.usercomponents)
        this.setState({name:""});
        this.props.user.setState({load : true,searchResult:false});
    }

    password = () => {
        updateUserPassword(this, this.props.usercomponents)
        this.props.user.setState({load : true});
        if(this.props.user.searchResult == true) {
             searchStudents(this.props.user, this.props.usercomponents)
        }
        this.setState({newPassword:""});
    }

    finalUpdate = () => {
        if(this.state.newPassword!= "") {
            this.password();
        }
        if(this.state.newName != "") {
            this.update();
        }
    }

    showOperation= (e) => {
        if (this.state.operation == false) {
            return null;
        }
        return (
           <div className="button">
                <form >
                     <label className = "bold">
                        UserName:
                        <input type="text" value={this.state.newName} onChange={this.handleNChange} />
                    </label><br/>
                    <label className = "bold">
                        Password:
                        <input type="text" value={this.state.newPassword} onChange={this.handlePChange} />
                    </label><br/>
                </form> 
                <div className = "text">
                 <a onClick={() => this.finalUpdate()}>SAVE CHANGES</a>
                </div>
                </div>
          
        );
    }
     change= (e) => {
        this.setState({operation:!e})
     }

     close = () => {
        this.props.user.setState({searchResult:false});
     }

     showBack = () => {
         if (this.props.flag == false) {
            return null;
        }
        else {
            return (<div className = "backbutton">
                <i className="fas fa-backspace"  onClick={() => this.close()}></i>
        </div>);
        }
     }


     getDropdownStudents() {
        const makeDropdownStudent = (courses) => {
            return (
                <ul className="Studentlist" id="StudentDropDownContent">
                    <li className="number" id="DropDownContent">id:<span className="profileStatsNumber">{courses._id}</span></li>
                     <li className="number" id="DropDownContent">title:<span className="profileStatsNumber">{courses.title}</span></li>
                    <li className="number" id="DropDownContent">code:<span className="profileStatsNumber">{courses.code}</span></li>
                </ul>
            )
        }
        const courses = this.state.enrollCourses
        console.log(courses)
        let dropdownStudents = this.state.showDropDownlist ? courses.map(makeDropdownStudent.bind(this)) : null
        return dropdownStudents
    }
    async componentDidMount() {
        const coursesId = this.props.student.courses
        await getEnrolledCourses(this, coursesId);
    }


    render() {
        
        return (
        	<div className="outer">
                <div className="student">
                    <div className="icon">
                        <i className="far fa-user"></i>
                    </div>
                    <div className="studentprofileStats">
                        <ul>
                            <li className="number">User ID: <span  className="profileStatsNumber">{this.props.student._id}</span></li>
                            <li className="number">Username: <span className="profileStatsNumber">{this.props.student.username}</span></li>
                            <li className="number">Full Name: <span className="profileStatsNumber">{this.props.student.firstName+" " + this.props.student.lastName}</span></li>
                            <li className="number">Year: <span className="profileStatsNumber">{this.props.student.year}</span></li>
                            <li className="number">CGPA: <span className="profileStatsNumber">{this.props.student.CGPA}</span></li>
                            <li className="number">
                                <span onClick={() => this.changeDropDownState(this.state.showDropDownlist)}>
                                    {this.state.showDropDownlist ? <i className="fas fa-chevron-down" /> : <i className="fas fa-chevron-right" />}
                                    Number of Courses: <span className="profileStatsNumber">{this.props.student.courses.length}</span>
                                </span>
                                {this.getDropdownStudents()}
                            </li>
                        </ul>
                    </div>
                </div>
                {this.showOperation(this.state.operation)}
                <div className = "edit">
                    <i className="far fa-edit" onClick={() => this.change(this.state.operation)}></i>
                    
                </div>
                <div className = "edittwo">
                    <i className="fas fa-trash-alt" onClick={() =>  this.delete()}></i>
                </div>
                {this.showBack()}
            </div>

        );
    }


}


export default Student;


