import React from 'react'

import SearchPost from '../SearchPost'
import Header from '../Header'

import { getCoursePosts, getSentMatches, addMatch, deleteMatch, addPost, deletePost } from '../../actions/search'
import { updateYearCheckbox, updateMinCGPA, updateMaxCGPA, updateCommuterCheckbox } from '../../actions/searchfilter'

// Imports to create Checkboxes
import { withStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import './styles.css'

const OrangeCheckbox = withStyles({
    root: {
        color: orange[500],
        '&$checked': {
            color: orange[500],
        },
    },
    checked: {},
})((props) => <Checkbox color='default' {...props} />)

class Search extends React.Component {
	constructor(props) {
		super(props)
        
        this.state = {
            posts: [],
            sentMatches: [],
            postError: '',
            madePost: false,

            yearFilter: [],
            minCGPAFilter: 0,
            maxCGPAFilter: 4,
            commuterFilter: false,

            minCGPAError: '',
            maxCGPAError: ''
        }
	}

    async componentDidMount() {
        const { app, match, location } = this.props
        const currentId = app.state.currentId
        const courseId = location.state.course._id

        getCoursePosts(this, courseId, currentId)
        getSentMatches(this, courseId, currentId)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { app, match, location } = this.props
        const currentId = app.state.currentId
        const courseId = location.state.course._id

        const prevCourse = prevProps.location.state.course._id
        const currentCourse = location.state.course._id

        const changedCoursePage = prevCourse !== currentCourse

        if (changedCoursePage) {
            await getCoursePosts(this, courseId, currentId)
            await getSentMatches(this, courseId, currentId)

            // Clear filters on change of course page
            this.clearFilters()
        }
    }

    handleAddPost() {
        const { app, match, location } = this.props
        const currentId = app.state.currentId
        const courseId = location.state.course._id

        const postBox = document.getElementById('postBox')
        const content = postBox.value
        postBox.value = ''

        addPost(this, courseId, content, currentId)
    }

    clearFilters() {
        this.setState({
            yearFilter: [],
            minCGPAFilter: 0,
            maxCGPAFilter: 4,
            commuterFilter: false
        })
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
        const { app, match, location } = this.props
        const currentId = app.state.currentId
        const courseId = location.state.course._id

        const addPost = (
            <div id='addPost'>
                <button id='addPostButton' type='submit' onClick={() => this.handleAddPost()}>ADD POST</button>
                <textarea id='postBox' type='text' maxlength='280' placeholder='Introduce yourself...'></textarea>
                <span className='errorMessage'>{this.state.postError}</span>
            </div>
        )

        console.log('search state', this.state)
        
		return (
			<div>
				<Header app={app}/>

                <h2 className='h2Header'>Search {location.state.course.code} Posts</h2>

                <div id='posts'>
                    <input type='text' id='userSearchBar' onKeyUp={() => this.usernameSearch()}placeholder='Search for a username...'></input>
                    {!this.state.madePost && addPost}
                    <ul id='studentList'>
						{this.state.posts.map((post) => 
                            <SearchPost
                                app={app}
                                match={match}
                                location={location}
                                id={post._id}
                                author={post.author}
                                authored={currentId === post.author}
                                content={post.content}
                                isMatch={this.state.sentMatches.some((match) => match.receiver.toString() === post.author.toString())}
                                deletePost={() => deletePost(this, courseId, currentId)}
                                addMatch={() => addMatch(this, courseId, currentId, post.author)}
                                deleteMatch={() => deleteMatch(this, courseId, currentId, post.author)}
                                yearFilter={this.state.yearFilter}
                                minCGPAFilter={this.state.minCGPAFilter}
                                maxCGPAFilter={this.state.maxCGPAFilter}
                                commuterFilter={this.state.commuterFilter}
                            />)}
					</ul>
                </div>
            
                <div className='filterBar'>
                    <strong className='filterBarTitle'>FILTER BY</strong>
                    <div className='filterCriteria'>
                        <FormControlLabel control={<OrangeCheckbox name='1' checked={this.state.yearFilter.includes(1)} onChange={(e) => updateYearCheckbox(this, e.target)}/>} label='Year 1'/>
                        <FormControlLabel control={<OrangeCheckbox name='3' checked={this.state.yearFilter.includes(3)} onChange={(e) => updateYearCheckbox(this, e.target)}/>} label='Year 3'/>
                        <FormControlLabel control={<OrangeCheckbox name='2' checked={this.state.yearFilter.includes(2)} onChange={(e) => updateYearCheckbox(this, e.target)}/>} label='Year 2'/>
                        <FormControlLabel control={<OrangeCheckbox name='4' checked={this.state.yearFilter.includes(4)} onChange={(e) => updateYearCheckbox(this, e.target)}/>} label='Year 4'/>
                    </div>

                    <div className='filterCriteria'>
                        <div className='inputBox'>
                            <span className='inputLabel'>Min CGPA</span>
                            <input id='GPAfield' name='min' type='number' min='0' max='4' step='0.25' onChange={(e) => updateMinCGPA(this, e.target)}/>
                        </div>
                        <div><span className="errorMessage">{this.state.minCGPAError}</span></div>
                        
                        <div className='inputBox'>
                            <span className='inputLabel'>Max CGPA</span>
                            <input id='GPAfield' name='max' type='number' min='0' max='4' step='0.25' onChange={(e) => updateMaxCGPA(this, e.target)}/>
                        </div>
                        <div><span className="errorMessage">{this.state.maxCGPAError}</span></div>
                    </div>

                    <div className='filterCriteria'>
                        <FormControlLabel control={<OrangeCheckbox name='commuter' checked={this.state.commuterFilter} onChange={(e) => updateCommuterCheckbox(this, e.target)}/>} label='Commuter'/>
                    </div>

                    <div id='filterButtonContainer'>
                        <button id='clearFilterButton' type='button' onClick={() => this.clearFilters()}>CLEAR FILTERS</button>
                    </div>
                </div>
			</div>
        )
	}
}




export default Search

