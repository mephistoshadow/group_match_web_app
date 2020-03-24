
import '../User/styles.css';
import React from "react";
import Student from "../StudentCard"
import { searchStudents } from "../../actions/adminOperation"

import { addStudent } from "../../actions/adminOperation"
import { addUser} from "../../actions/adminOperation"


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
            searchOne:''
        }
    }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
    }
    handlePChange= (event) => {
         this.setState({newPassword: event.target.value});
    }
    handleSearch= (event) => {
         this.setState({searchId: event.target.value});
    }

    update = () => {
         addStudent(this, this.props.app);
         addUser(this, this.props.app);
    }

    render() {
        return (
        	<div className="operation">
            <div className="newStudent">
                <div className="studentinfo">
                    <ul>
                        <li className="number">UserName:<input className="searchText" type="text" onChange={this.handleNChange} ></input></li>
                        <li className="number">Password:<input className="searchText" type="text"  onChange={this.handlePChange}></input></li>
                    </ul>
                </div>
                <div className="button3">
                    <a onClick={() => this.update()} >Add User</a>
                </div>
            </div>
            <div className="searchStudent">
                <form className="searchForm">
                    <label className = "labelText">UserID:</label>
                    <input className="searchText" type="text" onChange={this.handleSearch}></input>
                </form>
                <div className="button4">
                    <a onClick={() => searchStudents(this, this.props.app)}>Search User</a>
                </div>
                <div className = "searchbox">
                    <Student student = {this.state.searchOne} usercomponents = {this.props.usercomponents} user = {this.props.user } flag = {true}/> 
                </div>
            </div>

            
            
            
        </div>
        );
    }


}


export default Operation;


