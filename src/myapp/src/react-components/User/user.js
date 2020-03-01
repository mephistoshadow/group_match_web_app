
import './user.css';
import React from "react";
import Student from "../StudentCard/StudentCard"
import Operation from "../Operation/Operation"
import Header from "../Header/index"
import { uid } from "react-uid";



class User extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
    
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
        return (
        <div>
        <Header enrolledCourses={this.props.state.enrolledCourses}></Header>
        <div className = "card">
            <div className="header">
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


