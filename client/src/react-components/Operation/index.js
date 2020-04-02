
import '../User/styles.css';
import React from "react";
import Student from "../StudentCard"
import { searchStudents } from "../../actions/adminOperation"

import { addStudent } from "../../actions/adminOperation"
import { addUser} from "../../actions/adminOperation"
import { addNew } from "../../actions/adminOperation"


// function closepop() {
// 	document.querySelector(".popup").style.display = "none";
// }



class Operation extends React.Component {

     constructor(props) {
        super(props);
        this.state = {
            newName:'',
            newPassword:'',
            searchId:'',
            searchOne: {
                _id:"",
                username:"",
                firstName:"",
                lastName:"",
                year:"",
                CGPA:""
            }
        }
    }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
    }
    handlePChange= (event) => {
         this.setState({newPassword: event.target.value});
    }

    update = () => {
         addNew(this, this.props.app);
         this.props.user.setState({load : true});
    }

    render() {
        return (
        	<div className="operation">
            <div className="newStudent">
                <div className="studentinfo">
                    <ul>
                        <li className="numberone">Username:<input className="searchText" type="text" onChange={this.handleNChange} ></input></li>
                        <li className="numberone">Password:<input className="searchText" type="text"  onChange={this.handlePChange}></input></li>
                    </ul>
                </div>
            </div>
            <div className= "button3">
                <a onClick={() => this.update()} >Add User</a>
            </div>

            
            
            
        </div>
        );
    }


}


export default Operation;


