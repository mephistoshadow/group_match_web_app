
import '../User/styles.css';
import React from "react";
import {deleteCourse} from "../../actions/adminOperation"
import {updateCourse} from "../../actions/adminOperation"
import { searchCourse } from "../../actions/adminOperation"

class Card extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
        newName:'',
        newCode:'',
        operation:false
    }
     // const { student, usercomponents } = this.props;
   }

    // here we need a server call to delete the course


    change= (e) => {
        this.setState({operation:!e})
     }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
         // console.log(this.props.usercomponents);

    }

     handleCChange= (event) => {
         this.setState({newCode: event.target.value});
         // console.log(this.props.usercomponents);

    }
     close = () => {
        this.props.course.setState({searchResult:false});
     }

     update = () => {
        updateCourse(this,this.props.usercomponents)
        this.props.course.setState({load : true});
        if(this.props.course.state.searchResult == true) {
             searchCourse(this.props.course,this.props.usercomponents)
        }
        this.setState({newName: ""});
    }



    showOperation= (e) => {
        if (!e) {
            return null;
        }

        return (
           <div className="coursebutton">
                <form >
                     <label className = "bold">
                        CourseTitle:
                        <input type="text" value={this.state.newName} onChange={this.handleNChange} />
                    </label>
                </form> 
                <div className = "text">
                 <a onClick={() => this.update()}>Change Title</a>
                </div>
                </div>
        );
    }

    showBack = () => {
         if (this.props.flag == false) {
            return null;
        }
        else {
            return (<div className = "coursebackbutton">
                <i className="fas fa-backspace"  onClick={() => this.close()}></i>
        </div>);
        }
     }

    render() {
        
        return (
            <div className="Courseouter">
                <div className="student">
                    <div className="profileStats">
                        <ul className = "list">
                            <li className="number">Id:<span  className="profileStatsNumber">{this.props.student._id}</span></li>
                            <li className="number">Title:<span className="profileStatsNumber">{this.props.student.title}</span></li>
                            <li className="number">Code:<span className="profileStatsNumber">{this.props.student.code}</span></li>
                            <li className="number">Number Studens:<span className="profileStatsNumber">{this.props.student.people}</span></li>
                        </ul>
                    </div>
                </div>
                 {this.showOperation(this.state.operation)}
                  <div className = "courseedit">
                    <i className="far fa-edit" onClick={() => this.change(this.state.operation)}></i>
                </div>
                <div className = "courseedittwo">
                    <i className="fas fa-trash-alt" onClick={() => deleteCourse(this,this.props.usercomponents)}></i>
                </div>
                 {this.showBack()}    
            </div>
        );
    }

}


export default Card;


