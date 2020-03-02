
import './profile.css';
import React from "react";
import Header from "../Header/index"
import { Link, Redirect } from 'react-router-dom'
import { getObjectById, getObjectByName } from "../../actions/BasicOperation";
// const log = console.log
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
          path:"profile"
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
        const cur_student_name = 'user'
        const current_student = getObjectByName(this.props.state.students, cur_student_name)
        const current_courses = current_student.current_courses
        const jump = () => {
         return <Redirect to='/adminUser'/>;
         }
        return (
            <div>
           <Header enrolledCourses={current_courses} path= {this.state.path}></Header> 
            <div className = "profilecard">
                <div className = "profileicon">
                    <a className="usericon" href="">
                    <i className="far fa-user"></i>
                    </a>
                </div>
                <div className="Stats">
                    <ul>
                        <li className = "profilenumber">Id: <span  className="profileStatsNumber">{this.props.state.students[1].id}</span> </li>
                        <li className = "profilenumber">Name:<span  className="profileStatsNumber">{this.props.state.students[1].name}</span> <input type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
                        <li className = "profilenumber">Email:<span  className="profileStatsNumber">{this.props.state.students[1].Email}</span> <input type="text" value={this.state.newEmail} onChange={this.handleEChange} /></li>
                        <li className = "profilenumber">Year:<span  className="profileStatsNumber">{this.props.state.students[1].year}</span> <input type="text" value={this.state.newYear} onChange={this.handleYChange} /></li>
                        <li className = "profilenumber">Current Course:<span className="profileStatsNumber">{this.props.state.students[1].current_courses.map(courses => (
                    courses)) + " "}</span></li>
                        <li className = "profilenumber">Past Course:<span className="profileStatsNumber">{this.props.state.students[1].past_courses.map(courses => (
                    courses)) + " "}</span></li>
                        <li className = "profilenumber">Password:<span  className="profileStatsNumber">{this.props.state.students[1].password}</span> <input type="text" value={this.state.newPassword} onChange={this.handlePChange} /></li>
                    </ul>
                </div>
                <div className = "profilebutton">
                    <a  onClick={this.update} className= "name">Save Changes</a>
                </div>
                 <div className = "profilebutton">
                    <Link to = '/dashboard' className= "name">Go Dashboard</Link>
                </div>
            </div>
            </div>
        
        );
    }


}


export default Profile;


