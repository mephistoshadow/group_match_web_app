
import './course.css';
import React from "react";
import Card from "../CourseCard/CourseCard"
import CourseOperation from "../CourseOperation/CourseOperation"
import { uid } from "react-uid";
import Header from "../Header/index"


// function showpop() {
// 	document.querySelector(".popup").style.display = "block";
// }


// function closepop() {
// 	document.querySelector(".popup").style.display = "none";
// }




class Course extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
        pop: false,
    }
     // const { state, app} = this.props;

   }

  show= (e) => {
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
            <Header/>
        <div className = "card">
            <div className="header">
               Courses
            </div>
            <div className="exsistingCourse">
                 {this.props.state.courses.map(course => (
                    <Card  key={uid(course)} student = {course} usercomponents = {this.props.app}/>
                ))}
            </div>
            <CourseOperation student = {this.props.state.courses} usercomponents = {this.props.app}/>
            {this.show(this.props.state.pop)}
           
        </div>
        </div>
        );
    }


}


export default Course;


