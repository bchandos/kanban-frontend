import React from 'react';
import { authenticateUser, registerUser } from '../api/api';

class Login extends React.Component {

    state = {
        returningUserName: '',
        returningPassword: '',
        newUserName: '',
        newPassword: '',
        newPasswordVerify: '',
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let user;
        if (e.currentTarget.id === 'login-form') {
            user = await authenticateUser(this.state.returningUserName, this.state.returningPassword);
            localStorage.setItem('jwt', user.jwt);
            this.props.verifyToken();
        } else if (e.currentTarget.id === 'registration-form') {
            user = await registerUser(this.state.newUserName, this.state.newPassword);
            console.log(user);
        }
    }

    handleInput = async (e) => {
        this.setState({
            [e.currentTarget.dataset.fieldName]: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                <div className="w3-container w3-deep-purple">
                    <h1>Login</h1>                
                </div>
                <div className="w3-container">
                    <h2>Returning User</h2>
                    <form id="login-form" className="w3-container" onSubmit={this.handleSubmit}>
                        <p>
                            <label>User Name</label>
                            <input type="text" className="w3-input" data-field-name="returningUserName" value={this.state.returningUserName} onChange={this.handleInput} />
                        </p>

                        <p>
                            <label>Password</label>
                            <input type="password" className="w3-input" data-field-name="returningPassword" value={this.state.returningPassword} onChange={this.handleInput}/>
                        </p>
                        <p>
                            <button className="w3-btn w3-blue">Login</button>
                        </p>
                    </form>
                </div>
                <div className="w3-container w3-margin-top"> 
                    <h2>New User</h2>
                    <form id="registration-form" className="w3-container" onSubmit={this.handleSubmit}>
                        <p>
                            <label>User Name</label>
                            <input type="text" className="w3-input" data-field-name="newUserName" value={this.state.newUserName} onChange={this.handleInput}/>
                        </p>

                        <p>
                            <label>Password</label>
                            <input type="password" className="w3-input" data-field-name="newPassword" value={this.state.newPassword} onChange={this.handleInput}/>
                        </p>
                        <p>
                            <label>Verify Password</label>
                            <input type="password" className="w3-input" data-field-name="newPasswordVerify" value={this.state.newPasswordVerify} onChange={this.handleInput}/>
                        </p>
                        <p>
                            <button className="w3-btn w3-blue">Register</button>
                        </p>
                    </form> 
                </div>
            </div>

        )
    }
}

export default Login;