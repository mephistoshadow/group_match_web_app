import React from "react";
import { uid } from "react-uid";
import { Link, Redirect } from 'react-router-dom'

import SearchPost from "../SearchPost";
import Header from "../Header";
import { getObjectById, getObjectByName } from "../../actions/basicoperation"
import { getCoursePosts, getSentMatches, addMatch, deleteMatch, addPost, deletePost } from "../../actions/search"
import TextField from '@material-ui/core/TextField';

import './styles.css';


class Search extends React.Component {
	constructor(props) {
		super(props); 
	}

    state = {
        posts: [],
        sentMatches: [],
        postError: '',
        madePost: false
    }

    async componentDidMount() {
        const { app, history, match } = this.props
        const currentUser = app.state.currentUser
        const courseCode = match.params.courseCode

        await getCoursePosts(this, courseCode, currentUser)
        await getSentMatches(this, courseCode, currentUser)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { app, history, match } = this.props
        const currentUser = app.state.currentUser
        const courseCode = match.params.courseCode

        const changedCoursePage = prevProps.match.params.courseCode !== match.params.courseCode
        
        if (changedCoursePage) {
            await getCoursePosts(this, courseCode, currentUser)
            await getSentMatches(this, courseCode, currentUser)
        }
    }

    handleAddPost() {
        const { app, history, match } = this.props
        const currentUser = app.state.currentUser
        const courseCode = match.params.courseCode

        const postBox = document.getElementById("postBox")
        const content = postBox.value
        postBox.value = ''

        addPost(this, courseCode, content, currentUser)
    }

	render() {
        console.log('props', this.props)
        console.log('state', this.state)

        const { app, history, match } = this.props
        const currentUser = app.state.currentUser
        const courseCode = match.params.courseCode

        const addPost = (
            <div id="addPost" style={{display: this.state.madePost === true ? 'none' : 'block'}}>
                <button id="addPostButton" type="submit" onClick={() => this.handleAddPost()}>ADD POST</button>
                <textarea id="postBox" type="text" maxlength="280" placeholder="Introduce yourself..."></textarea>
                <span className="errorMessage">{this.state.postError}</span>
            </div>
        )

		return (
			<div className="HomePageouter">
				<Header app={app}/>

                <div id="posts">
                    <input type="text" id="userSearchBar" placeholder="Enter a name..."></input>
                    {addPost}
                    <ul id="studentList">
						{this.state.posts.map((post) => 
                            <SearchPost
                                app={app}
                                match={match}
                                id={post._id}
                                author={post.author}
                                authored={app.state.currentUser === post.author}
                                content={post.content}
                                isMatch={this.state.sentMatches.some((match) => match.receiver === post.author)}
                                deletePost={() => deletePost(this, courseCode, currentUser)}
                                addMatch={() => addMatch(this, courseCode, currentUser, post.author)}
                                deleteMatch={() => deleteMatch(this, courseCode, currentUser, post.author)}
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

