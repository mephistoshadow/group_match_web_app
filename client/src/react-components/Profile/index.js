
import './styles.css';
import React from "react";
import Header from "../Header"
import { Link, Redirect } from 'react-router-dom'
import { getObjectByName } from "../../actions/basicoperation";

// const log = console.logs
// let state = 0;



// function showpop() {
//  document.querySelector(".popup").style.display = "block";
// }


// function closepop() {
//  document.querySelector(".popup").style.display = "none";
// }




class Profile extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
		  newName:"",
          newEmail:"",
          newYear:"",
          newPassword:"",
          user:"user"
      }
   }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
         console.log()
    }

    handleEChange= (event) => {
         this.setState({newEmail: event.target.value});
    }
    handleYChange= (event) => {
         this.setState({newYear: event.target.value});
    }
    handlePChange= (event) => {
         this.setState({newPassword: event.target.value});
    }
    // here we need the server call to get the user and store the updated information to 
    // the server side.
    update = () => {
         const user = this.props.app;
         const array = user.state.students;
         for(let i =0; i < array.length; i ++) {
            if(array[i].id == this.props.state.students[1].id) {
                if(this.state.newName){
                     array[i].name = this.state.newName;
                }
                 if(this.state.newEmail){
                     array[i].Email = this.state.newEmail;
                }
                if(this.state.newPassword){
                     array[i].password = this.state.newPassword;
                }
                if(this.state.newYear){
                     array[i].year = this.state.newYear;
                }
                user.setState({
                    students:array,
                    pop:true
                })
            }
         }

    }

    jump = () => {
         return <Redirect to='/adminUser'/>;
    }

  show= (e) => {
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
        const jump = () => {
         return <Redirect to="/admin-user"/>;
        }
        const cur_student_name = 'user'
        const current_student = getObjectByName(this.props.state.students, cur_student_name)
        const current_courses = current_student.current_courses
        
        return (
            <div>
            <Header enrolledCourses={current_courses} user={this.state.user}/>
            <h2 className="h2Header">User Profile Page</h2>
            <div className = "profileCard">
                <div className = "profileIcon">
                    <i className="far fa-user"></i>
                </div>
                <div className="inputList">
                    <ul>
                        <li>Id: <span>{this.props.state.students[1].id}</span> </li>
                        <li>Name: <span>{this.props.state.students[1].name}</span></li>
                        <li>Email: <span>{this.props.state.students[1].Email}</span> <input type="text" value={this.state.newEmail} onChange={this.handleEChange} /></li>
                        <li>Year: <span>{this.props.state.students[1].year}</span> <input type="text" value={this.state.newYear} onChange={this.handleYChange} /></li>
                        <li>Current Course(s): <span>{this.props.state.students[1].current_courses.join(', ')}</span></li>
                        <li>Past Course(s): <span>{this.props.state.students[1].past_courses.join(', ')}</span></li>
                        <li>Password: <span>{this.props.state.students[1].password}</span> <input type="text" value={this.state.newPassword} onChange={this.handlePChange}/></li>
                    </ul>
                    <button onClick={this.update} className="homeButton">SAVE CHANGES</button> 
	    </div>
            </div>
             {this.show(this.props.state.pop)}
            </div>
        );
    }


}


export default Profile;


