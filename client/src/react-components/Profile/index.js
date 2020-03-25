import './styles.css';
import React from "react";
import Header from "../Header"
import { getUserById, getStudentById } from '../../actions/profile'

// Imports to create Checkboxes
import { withStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const OrangeCheckbox = withStyles({
    root: {
        color: orange[500],
        '&$checked': {
            color: orange[500],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />)

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        year: '',
        CGPA: '',
        isCommuter: false
    }

    async componentDidMount() {
        const { app, match } = this.props
        const userToFetch = match.params.id
        console.log(userToFetch)
        await getUserById(this, userToFetch)
        await getStudentById(this, userToFetch)
    }

    render() {
        const { app, match } = this.props
        console.log(this.props)

        const userToFetch = match.params.id
        const currentId = app.state.currentId

        return (
            <div>
                <Header app={app}/>
                <h2 className='h2Header'>User Profile Page</h2>
                <div className='profileContainer'>
                    <div className='profileField'>
                        <span>Username: {this.state.username}</span>
                    </div>

                    {
                        userToFetch === currentId && // Only show password on current user profile
                        <div className='profileField'>
                            <span>Password:</span><input type='password' title='password' placeholder='Enter new password'/>
                        </div>
                    }

                    <div className='profileField'>
                        <span>First name: </span>
                        {
                            userToFetch === currentId ?
                            <input type='text' title='firstName' placeholder={this.state.firstName}/> :
                            <span className='profileFieldValue'>{this.state.firstName}</span>
                        }

                        <span>Last name: </span>
                        {
                            userToFetch === currentId ?
                            <input type='text' title='lastName' placeholder={this.state.lastName}/> :
                            <span className='profileFieldValue'>{this.state.lastName}</span>
                        }
                    </div>

                    <div className='profileField'>
                        <span>Email: </span>
                        {
                            userToFetch === currentId ?
                            <input type='email' title='email' placeholder={this.state.email}/> :
                            <span className='profileFieldValue'>{this.state.email}</span>
                        }
                    </div>

                    <div className='profileField'>
                        <span>Year: </span>
                        {
                            userToFetch === currentId ?
                            <input type='number' min='1' max='4' step='1' title='year' placeholder={this.state.year}/> :
                            <span className='profileFieldValue'>{this.state.year}</span>
                        }

                        <span>CGPA: </span>
                        {
                            userToFetch === currentId ?
                            <input type='number' min='0' max='4' step='0.25' title='CGPA' placeholder={this.state.CGPA}/> :
                            <span className='profileFieldValue'>{this.state.CGPA}</span>
                        }
                    </div>

                    <div className='profileField'>
                        <span>Commuter:</span><OrangeCheckbox title='isCommuter' checked={this.state.isCommuter}/>
                    </div>

                    {
                        userToFetch === currentId ?
                        <button className="profileActionButton">SAVE CHANGES</button> :
                        <button className="profileActionButton">CONTACT THIS USER</button>
                    }
                </div>
            </div>
        )
    }
}

export default Profile