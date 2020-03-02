import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { uid } from "react-uid";

import SearchPost from "../SearchPost/index";
import Header from "../Header/index";
import { Link, Redirect } from 'react-router-dom'
import { getObjectById, getObjectByName } from "../../actions/BasicOperation";

import './style.css';


class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop: false,
            addedPost: false,
			enrolledCourses: this.props.state.enrolledCourses,
			current_course: this.props.state.posts.filter((post) => post.name === this.props.state.current_course)[0]
		}
  
        
	}
    

	closepop = () => {
		this.props.app.setState({ pop: false });
		console.log(this.state.pop);
	}
    
    
    searchClick = (event) => {
        const searchBox = document.querySelector("#userSearchBar")
        const searchQuery = searchBox.value
        
        const studentEntries = document.querySelectorAll("#studentList > li")
        for (let i = 0; i < studentEntries.length; i++){
            const name = studentEntries[i].firstElementChild.children[1].innerText
            if (!name.toLowerCase().includes(searchQuery.toLowerCase())){
                studentEntries[i].style.display='none'
            } else{
                studentEntries[i].style.display='block'
            }
        }
    }
    
    clickAddPost = () => {
        this.setState({addedPost: true})
        return <Redirect to='/signup'/>
    }

    
	render() {

        if (this.state.addedPost){
            return <Redirect to='/Post'/>
		}
		// We need to read data from server in order to get current_user name 
		// and user lists, courses lists, posts list from database

        const cur_student_name = 'user'
        const current_student = getObjectByName(this.props.state.students, cur_student_name)
		const current_courses = current_student.current_courses

		console.log(this.state.current_course.posts)
		return (
            
			<div className="HomePageouter">
				<Header enrolledCourses={current_courses} notificationCounter={this.props.state.notificationCounter} path='user-profile'></Header>

                <div id="posts">
                    
                    <input type="text" id= "userSearchBar" onKeyUp = {this.searchClick}placeholder="Enter a name..."></input>
                    
                    <button id="addPostButton" type="submit" onClick = {this.clickAddPost} >ADD POST</button>
                
                    <ul id="studentList">
						{this.state.current_course.posts.map(post =>
							(<SearchPost key={uid(post)} post={post} />))}
					</ul>
                
                
                </div>
            
                <div className="filterBar">
                    <strong className="filterBarTitle">FILTER BY</strong>
                    
                    <div className="filterCriteria">
                    
                        <div className="filterItem">
                            <input type="checkbox" name="year1"></input>
                            <label htmlFor="year1">First year</label>
                        </div>
                        
                        <div className="filterItem">
                            <input type="checkbox" name="year2"></input>
                            <label htmlFor="year2">Second year</label>
                        </div>
                        
                        <div className="filterItem">
                            <input type="checkbox" name="year3"></input>
                            <label htmlFor="year3">Third year</label>
                        </div>

                        <div className="filterItem">
                            <input type="checkbox" name="year4"></input>
                            <label htmlFor="year4">Fourth year</label>
                        </div>
                    
                    </div>
                    
                    <div className="filterCriteria">

                        <div className="filterItem">
                            <input type="checkbox" name="commuter"></input>
                            <label htmlFor="commuter">Commuter</label>
                        </div>
                        
                    </div>
                    
                </div>
            
            
			</div>
	)
	}

}




export default Search;

