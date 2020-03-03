import React from 'react'

import './styles.css'

import { openHamburgerMenu, closeHamburgerMenu } from './hamburgerMenuActions'
import { Link, Redirect } from 'react-router-dom'

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
			return <Link to="/search" className="navbarDropdownCourse">{course}</Link>
		})

		return navbarDropdownCourses;
	}


    handleNotificationCounter = () => {
        const notifCounter = document.querySelector(".notificationCounter")
        const notifBell = document.querySelector("#notificationBell").children[0]
        if (notifCounter.innerText == 0){
            notifCounter.style.display = "none"
            notifBell.style.color = null
        
        } else{
            notifCounter.style.display = "visible"
            notifBell.style.color = "orange"
        }
        
    
    }

    componentDidMount = () => {
        console.log("PROPS ", this.props.notificationCounter)
        this.handleNotificationCounter();
        console.log(this.props)
    }

	render() {
		let userOptions;
		if (!this.props.isAdmin) {
			userOptions = 
				<div id="userOptions">
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
		            <span className="notificationCounter"> {this.props.notificationCounter} </span>
		        </div>
		        </div>
		}

		return(
			<div id="header">
				<div id="hamburgerMenu" ref="hamburgerMenu">
                    <div className="hamburgerContent">
                        <Link to={"/" + this.props.path}>Profile</Link>
                        <a href="">Logout</a>
                    </div>
                </div>

			    <div id="hamburgerCollapsedMenu" ref="hamburgerCollapsedMenu">
                    <a className="hamburgerMenuButton">
                        <i className="fa fa-bars hamburger-toggle" ref="hamburgerIcon" onClick={this.hamburgerMenuClick.bind(this)}></i>
                    </a>

                    <div className="hamburgerContent">
                         <Link to={"/" + this.props.path} className="far fa-user-circle"></Link>
                         <Link to={"/"} className="fas fa-sign-out-alt"></Link>
                   
                    </div>
                </div>

			    <div id="navbar">
			        <span id="navbarLogo">GROUPIE</span>
<<<<<<< HEAD
			        {userOptions}
=======

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
                        <span className="notificationCounter"> {this.props.notificationCounter} </span>
                        <div id="notificationDropdown">
                            0 Notifications
                        </div>
                    </div>
>>>>>>> 39f007eeff7b37539a120d208d0802d1c44003d1
			    </div>
		    </div>
		);
	}
}

export default Header;
