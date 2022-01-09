import React from 'react';
import { authenticateUser, registerUser } from '../api/api';

class Login extends React.Component {

    state = {
        returningUserName: '',
        returningPassword: '',
        newUserName: '',
        newPassword: '',
        newPasswordVerify: '',
        returningFormErrors: {returningUserName: '', returningPassword: ''},
        newFormErrors: {newUserName: '', newPassword: '', newPasswordVerify: ''},
        returningUserNameValid: false,
        returningPasswordValid: false,
        returningFormValid: false,
        newUserNameValid: false,
        newPasswordValid: false,
        newPasswordVerifyValid: false,
        newFormValid: false,
        inSubmit: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({inSubmit: true});
        let user;
        if (e.currentTarget.id === 'login-form') {
            user = await authenticateUser(this.state.returningUserName, this.state.returningPassword);
            localStorage.setItem('jwt', user.jwt);
            this.props.verifyToken();
        } else if (e.currentTarget.id === 'registration-form') {
            user = await registerUser(this.state.newUserName, this.state.newPassword);
            localStorage.setItem('jwt', user.jwt);
            this.props.verifyToken();
        }
        this.setState({inSubmit: false});
    }

    handleInput = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        }, this.validateField(e.currentTarget.name, e.currentTarget.value));
    }

    validateField = (fieldName, value) => {
        let returningFieldValidationErrors = this.state.returningFormErrors;
        let returningUserNameValid = this.state.returningUserNameValid;
        let returningPasswordValid = this.state.returningPasswordValid;
        
        let newFieldValidationErrors = this.state.newFormErrors;
        let newUserNameValid = this.state.newUserNameValid;
        let newPasswordValid = this.state.newPasswordValid;
        let newPasswordVerifyValid = this.state.newPasswordVerifyValid;

        switch(fieldName) {
            case 'returningUserName':
                returningUserNameValid = value.length > 3;
                returningFieldValidationErrors.returningUserName = returningUserNameValid ? '' : 'User name is too short';
                break;
            case 'returningPassword':
                returningPasswordValid = value.length >= 6;
                returningFieldValidationErrors.returningPassword = returningPasswordValid ? '': 'Password is too short';
                break;
            case 'newUserName':
                newUserNameValid = value.length > 3;
                newFieldValidationErrors.newUserName = newUserNameValid ? '' : 'Username is too short';
                break;
            case 'newPassword':
                newPasswordValid = value.length >= 6;
                newFieldValidationErrors.newPassword = newPasswordValid ? '' : 'Password is too short'
                break;
            case 'newPasswordVerify':
                newPasswordVerifyValid = value == this.state.newPassword;
                newFieldValidationErrors.newPasswordVerify = newPasswordVerifyValid ? '' : 'Passwords must match'
            default:
                break;
        }
        this.setState({newFormErrors: newFieldValidationErrors,
                        newUserNameValid: newUserNameValid,
                        newPasswordValid: newPasswordValid,
                        newPasswordVerifyValid: newPasswordVerifyValid,
                        returningUserNameValid: returningUserNameValid,
                        returningPasswordValid: returningPasswordValid,
                    }, this.validateForm);
    }

    validateForm() {
        this.setState({
            newFormValid: this.state.newUserNameValid && this.state.newPasswordValid && this.state.newPasswordVerifyValid,
            returningFormValid: this.state.returningUserNameValid && this.state.returningPasswordValid,
        });
    }
    

    render() {
        const returningFormErrors = Object.values(this.state.returningFormErrors).filter(Boolean).join(' / ');
        const newFormErrors = Object.values(this.state.newFormErrors).filter(Boolean).join(' / ');

        return (
            <div>
                <div className="w3-container w3-deep-purple">
                    <h1>Login</h1>
                </div>
                <div id="login-form-container" className="w3-card w3-padding">
                    <div className="w3-container">
                        <h2>Returning User</h2>
                        <form id="login-form" className="w3-container" onSubmit={this.handleSubmit}>
                            <p>
                                <label>User Name</label>
                                <input type="text" className="w3-input" name="returningUserName" value={this.state.returningUserName} onChange={this.handleInput} />
                            </p>
                            <p>
                                <label>Password</label>
                                <input type="password" className="w3-input" name="returningPassword" value={this.state.returningPassword} onChange={this.handleInput}/>
                            </p>
                            <p>
                                <button className="w3-btn w3-blue" disabled={!this.state.returningFormValid}>Login</button>
                                <span className="w3-padding w3-text-red">{returningFormErrors}</span>
                            </p>
                        </form>
                    </div>
                    <div className="w3-container w3-margin-top"> 
                        <h2>New User</h2>
                        <form id="registration-form" className="w3-container" onSubmit={this.handleSubmit}>
                            <p>
                                <label>User Name</label>
                                <input type="text" className="w3-input" name="newUserName" value={this.state.newUserName} onChange={this.handleInput}/>
                            </p>
                            <p>
                                <label>Password</label>
                                <input type="password" className="w3-input" name="newPassword" value={this.state.newPassword} onChange={this.handleInput}/>
                            </p>
                            <p>
                                <label>Verify Password</label>
                                <input type="password" className="w3-input" name="newPasswordVerify" value={this.state.newPasswordVerify} onChange={this.handleInput}/>
                            </p>
                            <p>
                                <button className="w3-btn w3-blue" disabled={!this.state.newFormValid}>Register</button><span className="w3-padding w3-text-red">{newFormErrors}</span>
                            </p>
                        </form> 
                    </div>
                </div>
                { this.state.inSubmit ? <div className="login-mask"></div>: null }
            </div>

        )
    }
}

export default Login;