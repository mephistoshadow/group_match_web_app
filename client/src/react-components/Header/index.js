import React from 'react'

import './styles.css'

import { getAllCourses, getStudentCourses, openHamburgerMenu, closeHamburgerMenu } from '../../actions/header'
import { logout } from '../../actions/authentication'
import { Link } from 'react-router-dom'

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

    state = {
        hamburgerMenuIsOpen: false,
        studentCourses: [],
        allCourses: []
    }

	hamburgerMenuClick() {
        if (this.state.hamburgerMenuIsOpen) {
            closeHamburgerMenu(this.refs.hamburgerIcon, this.refs.hamburgerMenu, this.refs.hamburgerCollapsedMenu);
        } else {
            openHamburgerMenu(this.refs.hamburgerIcon, this.refs.hamburgerMenu, this.refs.hamburgerCollapsedMenu);
        }

        this.setState({
            hamburgerMenuIsOpen: !this.state.hamburgerMenuIsOpen
        })
    }

    async componentDidMount() {
        const { app, studentCourses } = this.props
        const isAdmin = app.state.isAdmin
        const currentId = app.state.currentId

        if (!isAdmin) {
            await getAllCourses(this)

            if (studentCourses === undefined) { // Header is not provided courses reference in props
                await getStudentCourses(this, currentId) // Set courses in state variable
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { 
        const { app, studentCourses } = this.props
        const isAdmin = app.state.isAdmin
        const currentId = app.state.currentId

        const changedCourses = prevState.studentCourses !== studentCourses

        if (changedCourses) {
            await getStudentCourses(this, currentId)
        }
    }

    getDropdownCourses() {
        const { studentCourses } = this.props

        const makeDropdownCourse = function(courseId) {
            const courseObj = this.state.allCourses.filter((courseObj) => courseObj._id === courseId)[0]
            return <Link className='navbarDropdownCourse' to={{
                pathname: `/search/course/${courseObj._id}`,
                state: {
                    course: courseObj
                }
            }}>{courseObj.code}</Link>
        }

        let dropdownCourses
        if (studentCourses === undefined) { // Header is not provided courses reference in props
            dropdownCourses = this.state.studentCourses.map(makeDropdownCourse.bind(this)) // Get courses from state
        } else {
            dropdownCourses = this.props.studentCourses.map(makeDropdownCourse.bind(this)) // Get courses from props
        }

        return dropdownCourses
    }

    getHamburgerMenuLinks(app) {
        const isAdmin = app.state.isAdmin, currentId = app.state.currentId

        const homeLink = <Link to={isAdmin ? '/admin-profile' : '/dashboard'}>Home</Link>
        const profileLink = <Link to={isAdmin? '/admin-profile' : `/profile/user/${currentId}`}>Profile</Link>
        const logoutLink = <Link to={'/'} onClick={() => logout(app)}>Logout</Link>
        
        return {homeLink: homeLink, profileLink: profileLink, logoutLink: logoutLink}
    }

    getHamburgerMenuButtons(app) {
        const isAdmin = app.state.isAdmin, currentId = app.state.currentId

        const homeButton = <Link to={isAdmin ? '/admin-profile' : '/dashboard'} className='fas fa-home'></Link>
        const profileButton = <Link to={isAdmin? '/admin-profile' : `/profile/user/${currentId}`} className='far fa-user-circle'></Link>
        const logoutButton = <Link to={'/'} onClick={() => logout(app)} className='fas fa-sign-out-alt'></Link>

        return {homeButton: homeButton, profileButton: profileButton, logoutButton: logoutButton}
    }

    getHamburgerMenuToggle() {
        return (
            <a className='hamburgerMenuButton'>
                <i className='fa fa-bars hamburger-toggle' ref='hamburgerIcon' onClick={() => this.hamburgerMenuClick()}></i>
            </a>
        )
    }

	render() {
        const { app } = this.props

        const currentId = app.state.currentId
        const currentUser = app.state.currentUser
        const isAdmin = app.state.isAdmin

        const links = this.getHamburgerMenuLinks(app)
        const buttons = this.getHamburgerMenuButtons(app)
        const hamburgerToggle = this.getHamburgerMenuToggle() 

		return(
			<div id='header'>
				<div id='hamburgerMenu' ref='hamburgerMenu'>
                    <div className='hamburgerContent'>
						{links.homeLink}
                        {links.profileLink}
                        {links.logoutLink}
                    </div>
                </div>

			    <div id='hamburgerCollapsedMenu' ref='hamburgerCollapsedMenu'>
                    {hamburgerToggle}
                    <div className='hamburgerContent'>
						{buttons.homeButton}
						{buttons.profileButton}
                        {buttons.logoutButton}
                    </div>
                </div>

			    <div id='navbar'>
                    <Link to='/' id='navbarLogo'>GROUPIE</Link>
		        	
                    {!isAdmin &&
                    <div id='userOptions'>
                        <Link to='/matches' className='navbarLink'>MATCHES</Link>

                        <div id='navbarDropdownMenu'>
                            <span id='navbarDropdownButton'>COURSES <i className='fas fa-chevron-down'></i></span>
                            <div id='navbarDropdownContent' ref='navbarDropdownContent'>
                                {this.getDropdownCourses()}
                            </div>
                        </div>

                        <Link to={`/profile/user/${currentId}`} className='navbarLink'>{currentUser}</Link>
                    </div>}

                    {isAdmin &&
                    <div id='userOptions'>
                        <Link to='/admin-user' className='navbarLink'><i className='fas fa-user-edit'></i>USERS</Link>
                        <Link to='/admin-course' className='navbarLink'><i className='fas fa-edit'></i>COURSES</Link>
                    </div>}
			    </div>
		    </div>
		)
	}
}

export default Header;
