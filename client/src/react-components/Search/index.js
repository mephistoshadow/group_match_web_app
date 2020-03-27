import React from "react";

import SearchPost from "../SearchPost";
import Header from "../Header";

import { getCoursePosts, getSentMatches, addMatch, deleteMatch, addPost, deletePost } from "../../actions/search"
import { addStudentObj } from "../../actions/search" //SADFJLSALF

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
        
        this.state = {
            //temp student object
            studentObjList: [],
            
            posts: [],
            sentMatches: [],
            postError: '',
            madePost: false,
            filterYear: [1,2,3,4],
            filterMinCGPA: 0.0,
            filterMaxCGPA: 4.0,
            filterCommuter:[true, false],
        }
        
        this.checkboxChange = this.checkboxChange.bind(this);
        this.GPAchange = this.GPAchange.bind(this);
        this.buttonFilterStatus = this.buttonFilterStatus.bind(this);
        this.checkFilterClear = this.checkFilterClear.bind(this);
        this.handleFilterClear = this.handleFilterClear.bind(this);
        
        
	}

    

    async componentDidMount() {
        const { app, match } = this.props
        const currentUser = app.state.currentUser
        const courseCode = match.params.courseCode

        getCoursePosts(this, courseCode, currentUser)
        getSentMatches(this, courseCode, currentUser)
        
        this.buttonFilterStatus()

        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { app, match } = this.props
        const currentUser = app.state.currentUser
        const courseCode = match.params.courseCode

        const changedCoursePage = prevProps.match.params.courseCode !== match.params.courseCode

        if (changedCoursePage) {
            await getCoursePosts(this, courseCode, currentUser)
            await getSentMatches(this, courseCode, currentUser)
        }
    }

    handleAddPost() {
        const { app, match } = this.props
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

    
    checkPostList() {
        
        this.buttonFilterStatus()
        
        //remove duplicates
        const uniq = new Set(this.state.studentObjList.map(e => JSON.stringify(e)));
        this.setState({studentObjList: Array.from(uniq).map(e => JSON.parse(e))})
        
        //Log errthang
        console.log("AUTHOR LIST", this.state.studentObjList)
        console.log("YEAR: ",this.state.filterYear)
        console.log("COMMUTER: ",this.state.filterCommuter)
        console.log("Min CGPA: ",this.state.filterMinCGPA)
        console.log("Max CGPA: ",this.state.filterMaxCGPA)
        
        //filter authors
        const filteredAuthors = this.state.studentObjList.filter(sObj => this.state.filterYear.includes(sObj.year) && this.state.filterCommuter.includes(sObj.isCommuter) && sObj.CGPA >= this.state.filterMinCGPA && sObj.CGPA <= this.state.filterMaxCGPA);
        console.log("FILTERED", filteredAuthors)
        
        //filter usernames
        const filteredUsernames = []
        for (let i in filteredAuthors){
            filteredUsernames.push(filteredAuthors[i].username)
        }
        
        //filter posts
        const posts = document.querySelectorAll(".post")
        posts.forEach((post) => {
            console.log(post.firstElementChild.children[1].innerText)
            if (!filteredUsernames.includes(post.firstElementChild.children[1].innerText)) {
                post.style.display = 'none';
            } else {
                post.style.display = 'block';
            }
        })
        
    }
    
    async checkboxChange(e) {
//        console.log("FILTER SELECTED", e.target.name, e.target.checked)
        
        if (e.target.checked){
            //YEAR
            if (e.target.name.includes("year")){
                const yrInt = parseInt(e.target.name.substr(e.target.name.length - 1))
                await this.setState({ filterYear: [...this.state.filterYear, yrInt]})
            }
            
            //COMMUTER
            else if (e.target.name.includes("commuter")){
                if (this.state.filterCommuter.length === 2){
                    await this.setState({filterCommuter: [false]})
                }else{
                    await this.setState({filterCommuter: [true]})
                }
            }
            
        }
        
        else{
            //YEAR
            if (e.target.name.includes("year")){
                const yrInt = parseInt(e.target.name.substr(e.target.name.length - 1))
                await this.setState({filterYear: this.state.filterYear.filter(function(year) {
                    return year !== yrInt
                })})
            }
            //COMMUTER
            else if (e.target.name.includes("commuter")){
                await this.setState({filterCommuter: [false]})
            }
            
        }
        

        this.checkPostList()
        
    }
    
    async GPAchange(e) {
        
//        console.log("FILTER SELECTED", e.target.name, e.target.value)
        
        //MIN
        if (e.target.name === "min"){
            await this.setState({filterMinCGPA: parseFloat(e.target.value)})
        }
        //MAX
        else if (e.target.name === "max"){
            await this.setState({filterMaxCGPA: parseFloat(e.target.value)})
        }
        

        this.checkPostList()
    }
    
    
    async handleFilterClear(e){
        await this.setState({
            filterYear: [1,2,3,4],
            filterMaxCGPA: 4.0,
            filterMinCGPA: 0.0,
            filterCommuter: [true, false]
        
        })
        
        // show all filters
        const posts = document.querySelectorAll(".post")
        posts.forEach((post) => {
            post.style.display = 'block';
            
        })
        
        //clear Button
        this.buttonFilterStatus()
        
        //clear GPA values
        const gpaFields = document.querySelectorAll("#GPAfield")
//        console.log(gpaFields)
        gpaFields[0].value = 0.0
        gpaFields[1].value = 4.0
        
    }
    
    buttonFilterStatus() {
        const button = document.querySelector("#clearFilterButton")
        const checkFilterClear = this.checkFilterClear()
        if (checkFilterClear){
            console.log("GOOD")
            button.style.display = 'none'
        } else{
            button.style.display = 'block'
        }
    }
    
    checkFilterClear(){
        const yearCheck = JSON.stringify(this.state.filterYear) == JSON.stringify([1,2,3,4])
        const maxCGPACheck = this.state.filterMaxCGPA == 4.0
        const minCGPACheck = this.state.filterMinCGPA == 0.0
        const commuterCheck = JSON.stringify(this.state.filterCommuter) == JSON.stringify([true, false])
        return yearCheck && maxCGPACheck && minCGPACheck && commuterCheck
        
    }
    
	render() {
        if (this.state.studentObjList.length <= 0){
            for (let i in this.state.posts){
                const post = this.state.posts[i]
                addStudentObj(this, post.author)
            }
        }
        
        
        const { app, match } = this.props
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
                        <FormControlLabel checked={this.state.filterYear.includes(1)} onChange={this.checkboxChange} control={<OrangeCheckbox name="year1"/>} label="Year 1"/>
                        <FormControlLabel checked={this.state.filterYear.includes(3)} onChange={this.checkboxChange} control={<OrangeCheckbox name="year3"/>} label="Year 3"/>
                        <FormControlLabel checked={this.state.filterYear.includes(2)} onChange={this.checkboxChange} control={<OrangeCheckbox name="year2"/>} label="Year 2"/>
                        <FormControlLabel checked={this.state.filterYear.includes(4)} onChange={this.checkboxChange} control={<OrangeCheckbox name="year4"/>} label="Year 4"/>
                    </div>

                    <div className="filterCriteria">
                        <div className="inputBox"><span className="inputLabel">Min CGPA </span><input id = "GPAfield" onChange={this.GPAchange} name="min" type="number" min="0" max="4" step="0.25" defaultValue={this.state.filterMinCGPA}/></div>
                        <div className="inputBox"><span className="inputLabel">Max CGPA </span><input id = "GPAfield" onChange={this.GPAchange} name="max" type="number" min="0" max="4" step="0.25" defaultValue={this.state.filterMaxCGPA}/></div>
                    </div>

                    <div className="filterCriteria">
                        <FormControlLabel checked={this.state.filterCommuter.includes(true)} onChange={this.checkboxChange} control={<OrangeCheckbox name="commuter"/>} label="Commuter"/>
                        
                    </div>
                    <button id="clearFilterButton" onClick={this.handleFilterClear} type="button">CLEAR FILTERS</button>
                    
                </div>
            
			</div>
        );
	}
}




export default Search;

