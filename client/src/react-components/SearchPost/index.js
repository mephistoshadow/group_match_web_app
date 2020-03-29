import React from 'react';

import { getStudent } from "../../actions/search"

import './styles.css';

class SearchPost extends React.Component {
	constructor(props) {
		super(props);
	}
 
	state = {
		student: {}
	}
 
    async componentDidMount() {
        const { author } = this.props
        await getStudent(this, author)
    }

    checkFilters() {
    	const { yearFilter, minCGPAFilter, maxCGPAFilter, commuterFilter } = this.props
    	const { year, CGPA, isCommuter } = this.state.student

    	const meetYearCriteria = yearFilter.length > 0 ? yearFilter.includes(year) : true
    	const meetMinCGPACriteria = minCGPAFilter <= CGPA
    	const meetMaxCGPACriteria = CGPA <= maxCGPAFilter
    	const meetCommuterCriteria = commuterFilter === true ? (commuterFilter === isCommuter) : true

    	return (
    		meetYearCriteria &&
    		meetMinCGPACriteria &&
    		meetMaxCGPACriteria &&
    		meetCommuterCriteria
    	)
    }

	render() {
		const { id, author, authored, content, isMatch } = this.props
		const { deletePost, addMatch, deleteMatch } = this.props

		const deleteButton = <i className='fas fa-trash-alt trash' onClick={() => deletePost()}></i>
		const matchButton = (
			isMatch ? 
			<i className='fas fa-star match' onClick={() => deleteMatch()}></i> :
			<i className='far fa-star noMatch' onClick={() => addMatch()}></i>
		)
  
        const commuter =  <span className='postInfo'>Commuter</span>
        const notCommuter =  <span className='postInfo'>Not a Commuter</span>

        const { username, year, CGPA, isCommuter } = this.state.student

		return (
			<li className='post' title={`${this.state.student.username}-post`} style={{display: this.checkFilters() ? 'block' : 'none'}}>
				<div className='postHeader'>
					<i className='far fa-user' />
					<span className='postInfo'>{username}</span>
                    <span className='postInfo'>Year {year}</span>
                    <span className='postInfo'>CGPA {CGPA}</span>
                    {isCommuter ? commuter : notCommuter}
					{authored ? deleteButton : matchButton}
				</div>
				<div>
					<p className='postContent'>{content}</p>
				</div>
			</li>
		)
	}
}


export default SearchPost;

