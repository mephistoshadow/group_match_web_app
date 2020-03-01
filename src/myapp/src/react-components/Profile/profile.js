
import './profile.css';
import React from "react";
import Header from "../Header/index"
// const log = console.log
// let state = 0;



// function showpop() {
//  document.querySelector(".popup").style.display = "block";
// }


// function closepop() {
//  document.querySelector(".popup").style.display = "none";
// }




class Profile extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
		  pop: false
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
            <Header enrolledCourses={this.props.state.enrolledCourses}></Header>
            <div className = "profilecard">
                <div className = "profileicon">
                    <a className="usericon" href="">
                    <i className="fa fa-user-circle"></i>
                    </a>
                </div>
                <div className="Stats">
                    <ul>
                        <li className = "profilenumber">Id: <span  className="profileStatsNumber">1</span> </li>
                        <li className = "profilenumber">Name:<span  className="profileStatsNumber">Pikachu</span> <input type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
                        <li className = "profilenumber">Email:<span  className="profileStatsNumber">Pikachu@gmail.com</span> <input type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
                        <li className = "profilenumber">Year:<span  className="profileStatsNumber">two</span> <input type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
                        <li className = "profilenumber">Current Course:<span className="profileStatsNumber">CSC309</span></li>
                        <li className = "profilenumber">Past Course:<span className="profileStatsNumber">CSC121 CSC100</span></li>
                        <li className = "profilenumber">Password:<span  className="profileStatsNumber">12345678</span> <input type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
                    </ul>
                </div>
                <div className = "profilebutton">
                    <a  onclick="showpop()" className= "name">Save Changes</a>
                </div>
            </div>
            </div>
        
        );
    }


}


export default Profile;


