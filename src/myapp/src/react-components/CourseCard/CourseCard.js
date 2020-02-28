
import '../User/user.css';
import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 






// function closepop() {
// 	document.querySelector(".popup").style.display = "none";
// }
   



class Card extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
        newName:'',
        newPassword:''
    }
     const { student, usercomponents } = this.props;
   }

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
    updateName = () => {
       
        const user = this.props.usercomponents;
        const student = this.props.student;
        const array = user.state.courses;
        for(let i = 0; i<array.length; i ++) {
            console.log(array.length);
            if(array[i].id == student.id ) {
                if(this.state.newName.length <=0 || this.state.newName.length >5) {
                     alert("Please in range 1 to 4");
                }else {
                  array[i].name = this.state.newName;
                }
               
            }
        } 
        user.setState({
            courses: array
        });
    }

    render() {
        
        return (
            <div className="outer">
                <div className="student">
                    <div className="profileStats">
                        <ul className = "list">
                            <li className="number">Id:<span  className="profileStatsNumber">{this.props.student.id}</span></li>
                            <li className="number">Name:<span className="profileStatsNumber">{this.props.student.name}</span></li>
                            <li className="number">Number Studens:<span className="profileStatsNumber">{this.props.student.people}</span></li>
                        </ul>
                    </div>
                </div>

                <div className="coursebutton">
                <form >
                     <label>
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
                
               

            </div>
        );
    }

}


export default Card;


