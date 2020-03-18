
import '../User/user.css';
import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 






// function closepop() {
// 	document.querySelector(".popup").style.display = "none";
// }
   



class Student extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        newName:'',
        newPassword:''
    }
     // const { student, usercomponents } = this.props;
   }
   // here we need a server call to get the user list updated.
    delete = (student,user) => {
       const deletestudent = user.state.students.filter(s => {
        return s !== student;
        });

        user.setState({
        students: deletestudent,
        pop:true
         });

    }

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
                if(this.state.newName.length <=0 || this.state.newName.length >5) {
                     alert("Please in range 1 to 4");
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
                if(this.state.newPassword.length <=0 || this.state.newPassword.length >5) {
                     alert("Please in range 1 to 4");
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

    render() {
        
        return (
        	<div className="outer">
                <div className="student">
                    <div className="icon">
                        <i className="far fa-user"></i>
                    </div>
                    <div className="profileStats">
                        <ul>
                            <li className="number">UserId:<span  className="profileStatsNumber">{this.props.student.id}</span></li>
                            <li className="number">UserName:<span className="profileStatsNumber">{this.props.student.name}</span></li>
                            <li className="number">Password:<span className="profileStatsNumber">{this.props.student.password}</span></li>
                        </ul>
                    </div>
                </div>

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
                    <a onClick={()=> {this.delete(this.props.student,this.props.usercomponents) }}>Delete User</a>
                </div>
                </div>
                
               

            </div>
        );
    }


}


export default Student;


