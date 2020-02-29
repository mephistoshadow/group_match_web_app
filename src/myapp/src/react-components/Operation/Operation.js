
import '../User/user.css';
import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import Student from "../StudentCard/StudentCard"





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
        const { students, usercomponents } = this.props;
    
    }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
         // console.log(this.props.usercomponents);

    }
    handlePChange= (event) => {
         this.setState({newPassword: event.target.value});
    }
    handleSearch= (event) => {
         this.setState({searchId: event.target.value});
    }

    addUser = () => {
          const user = this.props.usercomponents;
         const array = user.state.students;
         const student = {
            id:array.length+1,
            name:this.state.newName,
            password:this.state.newPassword
         }
         if(this.state.newName.length>0 && this.state.newPassword.length>0) {
            array.push(student);
            user.setState({
            students: array
            });
            console.log()
         }else {
            alert("do not leave blank area!");
         }
         
    }

    search = () => {
         const user = this.props.usercomponents;
         const array = user.state.students;
         for(let i =0; i < array.length; i ++) {
            if(array[i].id == this.state.searchId) {
                this.setState({
                    searchOne:array[i]

                })
                console.log(array[i].id);
            }
         }

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
                    <a onClick={this.addUser} >Add User</a>
                </div>
            </div>
            <div className="searchStudent">
                <form className="searchForm">
                    <label className = "labelText">UserID:</label>
                    <input className="searchText" type="text" onChange={this.handleSearch}></input>
                </form>
                <div className="button4">
                    <a onClick={this.search}>Search User</a>
                </div>
                <div className = "searchbox">
                    <Student student = {this.state.searchOne} usercomponents = {this.props.usercomponents}/> 
                </div>
            </div>

            
            
            
        </div>
        );
    }


}


export default Operation;

