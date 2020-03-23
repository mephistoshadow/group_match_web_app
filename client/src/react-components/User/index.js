
import './styles.css';
import React from "react";
import Student from "../StudentCard"
import Operation from "../Operation"
import Header from "../Header"
import { uid } from "react-uid";
import { showAllUsers } from "../../actions/adminOperation"
// import { getObjectByName } from "../../actions/basicoperation";



class User extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
        user:"admin",
        students:[],
        load:true
    }
     const { state, app} = this.props;

   }

   show=(e) =>{
      if(e) {
      showAllUsers(this,this.props.app);
      }
   }
    render() {
        

        return (
        <div>
         <Header user={this.props.app.state.currentUser} isAdmin={this.props.app.state.isAdmin}/>
         {this.show(this.state.load)}
        <div className = "card">
            <div className="Userheader">
               Users
            </div>
            <div className="exsistingStudent">
            	 {this.state.students.map(student => (
                    <Student  key={uid(student)} student = {student} usercomponents = {this.props.app} flag = {false}/>
                ))}
            </div>
            <Operation student = {this.state.students} usercomponents = {this.props.app}/>
        </div>
        </div>
         
        );


    }


}


export default User;


