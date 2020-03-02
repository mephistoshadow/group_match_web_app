
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
         return <Redirect to='/adminUser'/>;
         }
        return (
            <div>
            <Header enrolledCourses={this.props.state.enrolledCourses} path={this.state.path}/>
            <div className = "profilecard">
                <div className = "profileicon">
                    <a className="usericon" href="">
                    <i className="far fa-user"></i>
                    </a>
                </div>
                <div className="Stats">
                    <ul>
                        <li className = "profilenumber">Id: <span  className="profileStatsNumber">{this.props.state.students[0].id}</span> </li>
                        <li className = "profilenumber">Name:<span  className="profileStatsNumber">{this.props.state.students[0].name}</span> <input type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
                        <li className = "profilenumber">Email:<span  className="profileStatsNumber">{this.props.state.students[0].Email}</span> <input type="text" value={this.state.newEmail} onChange={this.handleEChange} /></li>
                        <li className = "profilenumber">Password:<span  className="profileStatsNumber">{this.props.state.students[0].password}</span> <input type="text" value={this.state.newPassword} onChange={this.handlePChange} /></li>
                        <li className = "profilenumber">Number of students:<span  className="profileStatsNumber">{this.props.state.students.length-1}</span></li>
                         <li className = "profilenumber">Number of Courses:<span  className="profileStatsNumber">{this.props.state.courses.length}</span></li>
                    </ul>
                </div>
                <div className = "profilebutton">
                    <a  onClick={this.update} className= "name">Save Changes</a>
                </div>
                <div className = "profilebutton">
                    <Link to = '/adminUser' className= "name">Go change users</Link>
                </div>
                 <div className = "profilebutton">
                    <Link to = '/adminCourse' className= "name">Go change Courses</Link>
                </div>
                <div className = "profilebutton">
                    <Link to = '/dashboard' className= "name">dashboard</Link>
                </div>
            </div>
            </div>
        
        );
    }


}


export default AdminProfile;


