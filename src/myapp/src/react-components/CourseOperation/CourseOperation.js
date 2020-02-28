
import '../User/user.css';
import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import Card from "../CourseCard/CourseCard"





// function closepop() {
// 	document.querySelector(".popup").style.display = "none";
// }



class CourseOperation extends React.Component {

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
    handleSearch= (event) => {
         this.setState({searchId: event.target.value});
    }

    addUser = () => {
          const user = this.props.usercomponents;
         const array = user.state.courses;
         console.log(this.props.usercomponents.state.countCourse);
         const course = {
            id:this.props.usercomponents.state.countCourse+1,
            name:this.state.newName,
            people: "N/A"
         }
         if(this.state.newName.length>0) {
            array.push(course);
            user.setState({
            courses: array,
            countCourse:this.props.usercomponents.state.countCourse+1
            });
            console.log()
         }else {
            alert("do not leave blank area!");
         }
         
    }

    search = () => {
         const user = this.props.usercomponents;
         const array = user.state.courses;
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
          <div className="courseoperation">
            <div className="newStudent">
                <div className="studentinfo">
                    <ul>
                        <li className="number">CourseName:<input className="searchText" type="text" onChange={this.handleNChange} ></input></li>
                    </ul>
                </div>
                <div className="button3">
                    <a onClick={this.addUser} >Add Course</a>
                </div>
            </div>
            <div className="searchStudent">
                <form className="searchForm">
                    <label className = "labelText">CoursesID:</label>
                    <input className="searchText" type="text" onChange={this.handleSearch}></input>
                </form>
                <div className="button4">
                    <a onClick={this.search}>Search Course</a>
                </div>
                <div className = "searchbox">
                    <Card student = {this.state.searchOne} usercomponents = {this.props.usercomponents}/> 
                </div>
            </div>

            
            
            
        </div>
        );
    }


}


export default CourseOperation;


