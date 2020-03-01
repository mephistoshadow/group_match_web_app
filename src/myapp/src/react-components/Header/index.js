import React from 'react'

import './styles.css'

import { openHamburgerMenu, closeHamburgerMenu } from './hamburgerMenuActions'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hamburgerMenuIsOpen: false
		}
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

	getNavbarDropdownCourses() {
		const navbarDropdownCourses = this.props.enrolledCourses.map(function(course) {
			return <a className="navbarDropdownCourse">{course}</a>
		})

		return navbarDropdownCourses;
	}

	render() {
		return(
			<div id="header">
				<div id="hamburgerMenu" ref="hamburgerMenu">
			        <div className="hamburgerContent">
			            <a href="#">Profile</a>
			            <a href="#">Logout</a>
			        </div>
			    </div>

			    <div id="hamburgerCollapsedMenu" ref="hamburgerCollapsedMenu">
			        <a className="hamburgerMenuButton">
			            <i className="fa fa-bars hamburger-toggle" ref="hamburgerIcon" onClick={this.hamburgerMenuClick.bind(this)}></i>
			        </a>

			        <div className="hamburgerContent">
			            <a href="#"><i className="far fa-user-circle"></i></a>
			            <a href="#"><i className="fas fa-sign-out-alt"></i></a>
			        </div>
			    </div>

			    <div id="navbar">
			        <span id="navbarLogo">GROUPIE</span>

			        <div id="navbarDropdownMenu">
			            <span id="navbarDropdownButton">
			                COURSES <i className="fas fa-chevron-down"></i>
			            </span>
			            <div id="navbarDropdownContent" ref="navbarDropdownContent">
			            	{this.getNavbarDropdownCourses.bind(this)()}
			            </div>
			        </div>

			        <div id="notificationBell">
			            <i className="fas fa-bell"></i>
			        </div>
			    </div>
		    </div>
		);
	}
}

export default Header;