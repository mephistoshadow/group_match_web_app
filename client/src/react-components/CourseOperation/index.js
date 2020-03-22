
import '../User/styles.css';
import React from "react";
import Card from "../CourseCard"

class CourseOperation extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
            newName:'',
            newPassword:'',
            searchId:'',
            searchOne:''
        }
        // const { students, usercomponents } = this.props;
    
    }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
         // console.log(this.props.usercomponents);

    }
    handleSearch= (event) => {
         this.setState({searchId: event.target.value});
    }
    // here we need a server call to add the course .
    addCourse = () => {
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
            countCourse:this.props.usercomponents.state.countCourse+1,
            pop:true
            });
            console.log()
         }else {
            alert("do not leave blank area!");
         }
         
    }
    // we need a server call to search course.
    searchCourse = () => {
         const user = this.props.usercomponents;
         const array = user.state.courses;
         let find = false;
         for(let i =0; i < array.length; i ++) {
            if(array[i].id == this.state.searchId) {
                this.setState({
                    searchOne:array[i]

                })
                 find = true;
                console.log(array[i].id);
            }
         }
          if(!find) {
          alert("search with no result");
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
                    <a onClick={this.addCourse} >Add Course</a>
                </div>
            </div>
            <div className="searchStudent">
                <form className="searchForm">
                    <label className = "labelText">CoursesID:</label>
                    <input className="searchText" type="text" onChange={this.handleSearch}></input>
                </form>
                <div className="button4">
                    <a onClick={this.searchCourse}>Search Course</a>
                </div>
                <div className = "searchbox">
                    <Card student = {this.state.searchOne} usercomponents = {this.props.usercomponents} flag = {true}/> 
                </div>
            </div>

            
            
            
        </div>
        );
    }


}


export default CourseOperation;


