import React, { Component } from "react";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../config'
import {
    FormGroup,
    ControlLabel,
    SignInForm,
    SwitchWraper,
    SwitchButton,
    Paragraph,
    LoaderButton,
    SignInWrapper
} from '../signInAndSignUp';


export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lEmail: "",
            lPassword: "",
            signInErrMsg:""
        };
        localStorage.setItem("userToken", "");
    }

    LoginvalidateForm = () => {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0
        );
    }

    clearValues = () => {
        this.setState({
            lEmail: "",
            lPassword: "",
        });
    }

    switchAction = () => {
        return this.props.history.push({
            pathname:'/',
        })
    }

    handleChange = event => {
        this.setState({
        [event.target.name]: event.target.value
        });
    }

    filterFunction = (response, values) => {
        return response.filter(result=>result.Name===values)[0];
    }

    userProfile = (response) => {
        const userName = this.filterFunction( response, "name");
        const email = this.filterFunction( response, 'email');
        const firstName = this.filterFunction( response, 'nickname');
        const lastName = this.filterFunction( response, 'lastName');
        const country = this.filterFunction( response, 'address');
        return this.props.history.push({
        pathname:'/userProfile',
        state:{
            userName: JSON.parse(userName),
            email: JSON.parse(email),
            firstName: JSON.parse(firstName),
            lastName: lastName ? JSON.parse(lastName) : {Name: 'lastName', Value: userName.Value},
            country: JSON.parse(country)
        }
        })
    }

    handleLogin = event => {
        event.preventDefault();
        const {lEmail, lPassword} =this.state;
        const authenticationData = {
        Username : lEmail,
        Password : lPassword,
        };

        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const userData = {
            Username : lEmail,
            Pool : userPool
        };

        let cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess:  (result) =>{
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                localStorage.setItem("userToken", JSON.stringify(result.getAccessToken().getJwtToken()));
                cognitoUser.getUserAttributes((err, result)=> {
                if (err) {
                    console.log(err);
                    localStorage.setItem("userToken", "");
                    this.setState({
                        signInErrMsg: err.message
                    })
                    setTimeout(()=>{
                        this.setState({
                            signInErrMsg: ''
                        })
                    },5000)
                    return;
                }
                console.log('result token + ' + result);
                this.clearValues();
                this.userProfile(result)
            });
        },

        onFailure: (err) =>{
            console.log('error ' + err);
            this.setState({
              signInErrMsg: err.message
            })
            setTimeout(()=>{
                this.setState({
                    signInErrMsg: ''
              })
            },5000)
        },
    });
  }


  loginForm = () => {
    return (
        <SignInWrapper>
            <SignInForm onSubmit={this.handleLogin}>
                <h1>LOGIN</h1>
                <FormGroup className="email" >
                <ControlLabel>Email:</ControlLabel>
                <input
                    autoFocus
                    type="email"
                    name="lEmail"
                    pattern="^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                    title="email@example.com"
                    value={this.state.lEmail}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup className="password">
                <ControlLabel>Password:</ControlLabel>
                <input
                    value={this.state.lPassword}
                    onChange={this.handleChange}
                    type="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    name="lPassword"
                    title="Minimum 8 characters Required and it must have the combination of
                            special character uppercase and lowercase letters"
                />
                </FormGroup>
                <LoaderButton
                    // disabled={!this.LoginvalidateForm()}
                    type="submit"
                    text="Login"
                />
                <SwitchWraper>
                    <ControlLabel>Create New User:</ControlLabel>
                    <SwitchButton
                        onClick={this.switchAction}
                    >
                        SignUp
                    </SwitchButton>
                </SwitchWraper>
                {this.state.signInErrMsg &&
                    <Paragraph>{this.state.signInErrMsg}</Paragraph>
                }
            </SignInForm>
        </SignInWrapper>
    )
  }

  render() {
    return (
        <div>
            {this.loginForm()}
        </div>
    );
  }
}
