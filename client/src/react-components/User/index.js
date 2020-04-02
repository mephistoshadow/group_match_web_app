
import './styles.css';
import React from "react";
import Student from "../StudentCard"
import Operation from "../Operation"
import Header from "../Header"
import { uid } from "react-uid";
import { showAllUsers } from "../../actions/adminOperation"
import { searchStudents } from "../../actions/adminOperation"


class User extends React.Component {

   constructor(props) {
    super(props);
      this.state = {
        user:"admin",
        students:[],
        load:true,
        searchId:'',
        keepId:'',
            searchOne: {
                _id:"",
                username:"",
                firstName:"",
                lastName:"",
                year:"",
                CGPA:""
            },
          searchResult:false
    }
     const { state, app} = this.props;

   }

   handleSearch= (event) => {
         this.setState({searchId: event.target.value});
         if(event.target.value == '') {
          this.setState({searchResult:false,load:true});
          this.showSearchResult();
         }
    }


   show=(e) =>{
      if(e) {
      showAllUsers(this,this.props.app);
      }
   }

   showSearchResult = () => {
    if(this.state.searchResult == false) {
      return (
        <div className="exsistingStudent">
               {this.state.students.map(student => (
                    <Student  key={uid(student)} student = {student} usercomponents = {this.props.app} flag = {false} user = {this}/>
                ))}
        </div>
      );
    } else {
         return  (<div className = "searchbox">
                    <Student student = {this.state.searchOne} usercomponents = {this.props.usercomponents} user = {this} flag = {true}/>
                  </div>
           );
    }
   }

    render() {
        const { app } = this.props

        return (
        <div>
         <Header app={app}/>
          <div className = "card">
          {this.show(this.state.load)}
            <div className="Userheader">
               Users
            </div>
            <div className="search">
                <form className="searchForm">
                    <label className = "labelText">User ID:</label>
                    <input className="searchText" type="text" onChange={this.handleSearch}></input>
                </form>
                <div className="button4">
                    <a onClick={() => searchStudents(this, this.props.app)}>Search User</a>
                </div>
            </div>
            {this.showSearchResult()}
            <Operation student = {this.state.students} usercomponents = {this.props.app} user = {this}/>
        </div>
        </div>
         
        );


    }


}


export default User;


