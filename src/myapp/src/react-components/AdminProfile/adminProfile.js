
import '../Profile/profile.css';
import React from "react";
import Header from "../Header/index"
import { Link, Redirect } from 'react-router-dom'
// const log = console.log
// let state = 0;



// function showpop() {
//  document.querySelector(".popup").style.display = "block";
// }


// function closepop() {
//  document.querySelector(".popup").style.display = "none";
// }




class AdminProfile extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
		  newName:"",
          newEmail:"",
          newYear:"",
          newPassword:"",
           path:"AdminProfile"
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

    update = () => {
         const user = this.props.app;
         const array = user.state.students;
         for(let i =0; i < array.length; i ++) {
            if(array[i].id == this.props.state.students[0].id) {
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
                this.setState({
                    students:array
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

        return (
            <div>
            <Header enrolledCourses={this.props.state.enrolledCourses} path={this.state.path}/>
            <h2 className="h2Header">Admin Profile Page</h2>
            <div className = "profileCard">
                <div className = "profileIcon">
                    <i className="far fa-user"></i>
                </div>
                <div className="inputList">
                    <ul>
                        <li>Id: <span>{this.props.state.students[0].id}</span> </li>
                        <li>Name: <span>{this.props.state.students[0].name}</span> <input type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
                        <li>Email: <span>{this.props.state.students[0].Email}</span> <input type="text" value={this.state.newEmail} onChange={this.handleEChange} /></li>
                        <li>Password: <span>{this.props.state.students[0].password}</span> <input type="text" value={this.state.newPassword} onChange={this.handlePChange} /></li>
                        <li>Number of Students: <span>{this.props.state.students.length-1}</span></li>
                        <li>Number of Courses: <span>{this.props.state.courses.length}</span></li>
                        <button className="homeButton" onClick={this.update}>SAVE CHANGES</button>
                    </ul>
                    <span>More Options: <strong><Link to="/admin-user">Manage Users</Link></strong> <strong><Link to="/admin-course">Manage Courses</Link></strong></span>
                </div>
            </div>
            </div>
        
        );
    }


}


export default AdminProfile;


