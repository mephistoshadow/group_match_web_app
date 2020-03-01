import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
//import { uid } from "react-uid";

import HomePageCourse from "../HomePageCourse/index";
import Header from "../Header/index";
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

import './style.css';


class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop: false,
            addedPost: false,
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
            return <Redirect to='/Profile'/>
        }
 
		return (
			<div className="HomePageouter">
				<Header></Header>

                <div id="posts">
                    
                    <input type="text" id= "userSearchBar" onKeyUp = {this.searchClick}placeholder="Enter a name..."></input>
                    
                    <button id="addPostButton" type="submit" onClick = {this.clickAddPost} >ADD POST</button>
                
                    <ul id="studentList">
                    
                        <li>
                            <div className= "postHeader">
                                <i className="far fa-user"></i>
                                <span className="postName">Jane Doe</span>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="postContent">
                                <p className="postDesc">Hi I am looking for a partner for CSC309 and is aiming to get an A+ for this course.  Please match with me if you are interested.</p>
                                <strong className="postInfo">Current Matching Courses: 3</strong>
                            </div>
                        </li>
                        
                        <li>
                            <div className= "postHeader">
                                <i className="fas fa-user"></i>
                                <span className="postName">John Doe</span>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="postContent">
                                <p className="postDesc">Just looking for a group match if interested.</p>
                                <strong className="postInfo">Current Matching Courses: 1</strong>
                            </div>
                        </li>
                        
                        <li>
                            <div className= "postHeader">
                                <i className="fas fa-user"></i>
                                <span className="postName">Mark Z.</span>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="postContent">
                                <p className="postDesc">No one responds on Piazza will try my luck here.  Currently a 4th year just finished PEY match with me if you want to just graduate.</p>
                                <strong className="postInfo">Current Matching Courses: 0</strong>
                            </div>
                        </li>
                        
                        <li>
                            <div className="postHeader">
                                <i className="far fa-user"></i>
                                <span className="postName">Ilona S.</span>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="postContent">
                                <p className="postDesc"></p>
                                <strong className="postInfo">Current Matching Courses: 3</strong>
                            </div>
                        </li>
                        
                        <li>
                            <div className= "postHeader">
                                <i className="fas fa-user"></i>
                                <span className="postName">Kevin Nguyen</span>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="postContent">
                                <p className="postDesc">Contact me at kevin@gmail.com before matching.</p>
                                <strong className="postInfo">Current Matching Courses: 2</strong>
                            </div>
                        </li>
                    
                    
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
                        <input type="checkbox" name="commuter"></input>
                        <label htmlFor="commuter">Commuter</label>
                    </div>
                    
                </div>
            
            
			</div>
	)
	}

}




export default Search;

