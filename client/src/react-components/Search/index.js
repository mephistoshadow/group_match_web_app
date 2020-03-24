import React from "react";
import { uid } from "react-uid";
import { Link, Redirect } from 'react-router-dom'

import SearchPost from "../SearchPost";
import Header from "../Header";
import { getObjectById, getObjectByName } from "../../actions/basicoperation"
import { getCoursePosts, getUserPost, deleteUserPost } from "../../actions/search"

import './styles.css';


class Search extends React.Component {
	constructor(props) {
		super(props); 
	}

    state = {
        posts: [],
        madePost: false
    }

    async componentDidMount() {
        const { app } = this.props
        const currentUser = app.state.currentUser
        const courseCode = this.props.match.params.courseCode

        await getCoursePosts(this, courseCode)
        await getUserPost(this, courseCode, currentUser)
    }

	render() {
        console.log('props', this.props)
        console.log('state', this.state)
        const { app } = this.props
        const currentUser = app.state.currentUser
        const courseCode = this.props.match.params.courseCode

		return (
			<div className="HomePageouter">
				<Header app={app}/>

                <div id="posts">
                    <input type="text" id="userSearchBar" placeholder="Enter a name..."></input>
                    {!this.state.madePost ? <button id="addPostButton" type="submit">ADD POST</button> : null}
                    <ul id="studentList">
						{this.state.posts.map((post) => 
                            <SearchPost
                                id={post._id}
                                author={post.author}
                                authored={app.state.currentUser === post.author}
                                content={post.content}
                                deletePost={() => deleteUserPost(this, courseCode, currentUser)}
                            />)}
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
        );
	}
}




export default Search;

