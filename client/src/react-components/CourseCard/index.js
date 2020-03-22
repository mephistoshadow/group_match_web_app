
import '../User/styles.css';
import React from "react";

class Card extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
        newName:'',
        newPassword:'',
        operation:this.props.flag
    }
     // const { student, usercomponents } = this.props;
   }

    // here we need a server call to delete the course
    delete = (student,user) => {
       const deletestudent = user.state.courses.filter(s => {
        return s !== student;
        });

        user.setState({
        courses: deletestudent,
        pop:true
         });

    }

    handleNChange= (event) => {
         this.setState({newName: event.target.value});
         // console.log(this.props.usercomponents);

    }

    //we will need serve call to update the correspoding courses name.
    updateName = () => {
        const user = this.props.usercomponents;
        const student = this.props.student;
        const array = user.state.courses;
        for(let i = 0; i<array.length; i ++) {
            console.log(array.length);
            if(array[i].id === student.id ) {
                if(this.state.newName.length <=0 || this.state.newName.length >6) {
                     alert("type the correct format of courses code, ie CSC309");
                }else {
                  array[i].name = this.state.newName;
                   user.setState({
                        courses: array,
                        pop:true
                    });
                }
               
            }
        } 
    }


    showOperation= (e) => {
        if (!e) {
            return null;
        }

        return (
           <div className="coursebutton">
                <form >
                     <label className = "bold">
                        CourseName:
                        <input type="text" value={this.state.newName} onChange={this.handleNChange} />
                    </label><br/>
                </form> 
                <div className = "text">
                 <a onClick={this.updateName}>Change Name</a>
                </div>
                <div className="text">
                    <a onClick={()=> {this.delete(this.props.student,this.props.usercomponents) }}>Delete Course</a>
                </div>
                </div>
        );
    }

    render() {
        
        return (
            <div className="Courseouter">
                <div className="student">
                    <div className="profileStats">
                        <ul className = "list">
                            <li className="number">Id:<span  className="profileStatsNumber">{this.props.student.id}</span></li>
                            <li className="number">Name:<span className="profileStatsNumber">{this.props.student.name}</span></li>
                            <li className="number">Number Studens:<span className="profileStatsNumber">{this.props.student.people}</span></li>
                        </ul>
                    </div>
                </div>
                 {this.showOperation(this.state.operation)}           
            </div>
        );
    }

}


export default Card;


