
import '../User/styles.css';
import React from "react";
import { deleteStudent } from "../../actions/adminOperation"

// function closepop() {
// 	document.querySelector(".popup").style.display = "none";
// }

class Student extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        newName:'',
        newPassword:'',
         operation:this.props.flag
    }
     // const { student, usercomponents } = this.props;
   }
   // here we need a server call to get the user list updated.
    // delete = (student,user) => {
    //    const deletestudent = user.state.students.filter(s => {
    //     return s !== student;
    //     });

    //     user.setState({
    //     students: deletestudent,
    //     pop:true
    //      });

    // }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
         // console.log(this.props.usercomponents);

    }
    handlePChange= (event) => {
         this.setState({newPassword: event.target.value});
    }

    // we need a server call to get the user and update name to the server.
    updateName = () => {
       
        const user = this.props.usercomponents;
        const student = this.props.student;
        const array = user.state.students;
        for(let i = 0; i<array.length; i ++) {
            console.log(array.length);
            if(array[i].id === student.id ) {
                if(this.state.newName.length <=0) {
                     alert("Please type a user name to change");
                }else {
                  array[i].name = this.state.newName;
                  user.setState({
                    students: array,
                    pop:true
                  });
                }
               
            }
        } 
    }

     // we need a server call to get the user and update name to the password.
    updatePassword = () => {
       
        const user = this.props.usercomponents;
        const student = this.props.student;
        const array = user.state.students;
        for(let i = 0; i<array.length; i ++) {
            console.log(array.length);
            if(array[i].id === student.id ||this.state.newPassword.length <0) {
                if(this.state.newPassword.length <=0) {
                     alert("Please type a password to change");
                }else {
                  array[i].password = this.state.newPassword;
                   user.setState({
                    students: array,
                    pop:true
                  });
                }
            }
        } 
    }

    showOperation= (e) => {
        if (!e) {
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
                 <a onClick={this.updateName}>Change Name</a>
                </div>
                <div className = "text">
                 <a onClick={this.updatePassword}> Change Password</a>
                </div>
                
                <div className="text">
                    <a onClick={()=> {deleteStudent(this,this.props.usercomponents)}}>Delete User</a>
                </div>
                </div>
          
        );
    }
    render() {
        
        return (
        	<div className="outer">
                <div className="student">
                    <div className="icon">
                        <i className="far fa-user"></i>
                    </div>
                    <div className="profileStats">
                        <ul>
                            <li className="number">UserId:<span  className="profileStatsNumber">{this.props.student._id}</span></li>
                            <li className="number">UserName:<span className="profileStatsNumber">{this.props.student.username}</span></li>
                            <li className="number">Full Name:<span className="profileStatsNumber">{this.props.student.firstName+" " + this.props.student.lastName}</span></li>
                            <li className="number">Year:<span className="profileStatsNumber">{this.props.student.year}</span></li>
                            <li className="number">CGPA:<span className="profileStatsNumber">{this.props.student.CGPA}</span></li>
                        </ul>
                    </div>
                </div>
                  {this.showOperation(this.state.operation)}
            </div>
        );
    }


}


export default Student;


