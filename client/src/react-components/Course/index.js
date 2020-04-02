
import './styles.css';
import React from "react";
import Card from "../CourseCard"
import CourseOperation from "../CourseOperation"
import { uid } from "react-uid";
import Header from "../Header"
import {showAllCourses} from "../../actions/adminOperation"
import {searchCourse} from "../../actions/adminOperation"
// import { getObjectByName } from "../../actions/basicoperation";

class Course extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
        load:true,
        courses:[],
        pop: false,
         user:"admin",
           searchId:'',
            searchOne:'',
            searchResult:false
    }
     // const { state, app} = this.props;

   }

    show=(e) =>{
      if(e) {
      showAllCourses(this,this.props.app);
      console.log("1");
      }
   }

   handleSearch= (event) => {
         this.setState({searchId: event.target.value});
    }




  showSearchResult = () => {
    console.log(this.state.searchResult);
    if(this.state.searchResult == false) {
      return (
        <div className="exsistingCourse">
                 {this.state.courses.map(course => (
                    <Card  key={uid(course)} student = {course} usercomponents = {this.props.app} flag = {false} course = {this}/>
                ))}
            </div>
      );
    } else {
         return  (
            <div className="exsistingCourse">
                    <Card student = {this.state.searchOne} usercomponents = {this.props.usercomponents} flag = {true} course = {this}/> 
            </div>
           );
    }
   }


    render() {
        const { app } = this.props
        return (
            <div>
             {this.show(this.state.load)}
            <Header app={app}/>
            <div className = "card">
            <div className="header">
              Courses
            </div>
             <div className = "searchCourse">
                <form className = "courseFrom">
                    <label className = "labelText">Course ID:</label>
                    <input className="searchText" type="text" onChange={this.handleSearch}></input>
                </form>
                <div className = "button5">
                    <a onClick={() => searchCourse(this,this.props.app)}>Search Course</a>
                </div>
            </div>
            {this.showSearchResult()}
            <CourseOperation student = {this.props.state.courses} usercomponents = {this.props.app} course = {this}/>
        </div>
        </div>
        );
    }


}


export default Course;


