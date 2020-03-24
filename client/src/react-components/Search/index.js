import React from "react";
import { uid } from "react-uid";
import { Link, Redirect } from 'react-router-dom'

import SearchPost from "../SearchPost";
import Header from "../Header";
import { getObjectById, getObjectByName } from "../../actions/basicoperation"
import { getCoursePosts, getSentMatches, addMatch, deleteMatch, addPost, deletePost } from "../../actions/search"
import TextField from '@material-ui/core/TextField';

// Imports to create Checkboxes
import { withStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import './styles.css';

const OrangeCheckbox = withStyles({
    root: {
        color: orange[500],
        '&$checked': {
            color: orange[500],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />)

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

    usernameSearch() {
        const searchBox = document.querySelector("#userSearchBar")
        const posts = document.querySelectorAll(".post")
        const searchQuery = searchBox.value
        posts.forEach((post) => {
            if (!post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                post.style.display = 'none';
            } else {
                post.style.display = 'block';
            }
        })
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
			<div>
				<Header app={app}/>

                <div id="posts">
                    <input type="text" id="userSearchBar" onKeyUp={() => this.usernameSearch()}placeholder="Search for a username..."></input>
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
                        <FormControlLabel control={<OrangeCheckbox name="year1"/>} label="Year 1"/>
                        <FormControlLabel control={<OrangeCheckbox name="year3"/>} label="Year 3"/>
                        <FormControlLabel control={<OrangeCheckbox name="year2"/>} label="Year 2"/>
                        <FormControlLabel control={<OrangeCheckbox name="year4"/>} label="Year 4"/>
                    </div>

                    <div className="filterCriteria">
                        <FormControlLabel control={<OrangeCheckbox name="commuter"/>} label="Commuter"/>
                    </div>
                    
                </div>
            
			</div>
        );
	}
}




export default Search;

