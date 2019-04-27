import React, { Component } from "react";
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '../config'
import {
  FormGroup,
  ControlLabel,
  Form,
  SwitchWraper,
  SwitchButton,
  Paragraph,
  LoaderButton,
  ErrorMsgWrapper
} from '../signInAndSignUp';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName:"",
      country: "",
      userName:"",
      signupErrMsg:"",
    };
    localStorage.setItem("userToken", "");
  }

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }


  clearValues = () => {
    this.setState({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName:"",
      country: "",
      userName:"",
    });
  }

  switchAction = () => {
    return this.props.history.push({
      pathname:'/login',
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if(event.target.name === 'confirmPassword' || event.target.name === 'password'){
      this.setState({
        signupErrMsg: ""
      });
    }
  }

  FocusOut = event => {
    const {password, confirmPassword} = this.state;
    if(event.target.name === 'confirmPassword' ){
      this.setState({
        signupErrMsg: confirmPassword !== password ? "confirmPassword must match with password" : ""
      })
    }
    if(event.target.name === 'password' && confirmPassword ){
      this.setState({
        signupErrMsg: confirmPassword !== password ? "confirmPassword must match with password" : ""
      })
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const {email, password,  firstName, lastName, country, userName} =this.state;
    const attributeList = [];
    const dataEmail = {
        Name : 'email',
        Value : email // your email here
    };
    const dataPersonalName = {
        Name : 'name',
        Value : userName 
    };
    /** Custom attribute is not supported */
    const dataFirstName = {
      Name : 'nickname',   // using nick name insted of first name
      Value : firstName 
    };
    // const dataLastName = {
    //   Name : 'lastName',
    //   Value : lastName 
    // };
    const dataCountryName = {
      Name : 'address',
      Value : country 
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributePersonalName = new CognitoUserAttribute(dataPersonalName);
    const attributeFirstName = new CognitoUserAttribute(dataFirstName);
    // const attributeLastNameName = new CognitoUserAttribute(dataLastName);
    const attributeCountryName = new CognitoUserAttribute(dataCountryName);   

    attributeList.push(attributeEmail);
    attributeList.push(attributePersonalName);
    attributeList.push(attributeFirstName);
    // attributeList.push(attributeLastNameName);
    attributeList.push(attributeCountryName);
  
    let cognitoUser;
    userPool.signUp(email, password, attributeList, null, (err, result)=>{
        if (err) {
            console.log("error----",err);
            this.setState({
              signupErrMsg: err.message
            })
            setTimeout(()=>{
              this.setState({
                signupErrMsg: ''
              })
            },50000)
            
            return;
        }
        cognitoUser = result.user;
        this.switchAction();
        this.clearValues()
        console.log('user name is ' + cognitoUser.getUsername());
    });
  }

  signupForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>SIGNUP</h1>
        <FormGroup className="userNAme">
          <label>User Name:</label>
          <input
            value={this.state.userName}
            onChange={this.handleChange}
            name="userName"
            type="text"
          />
        </FormGroup>
        <FormGroup className="email" >
          <ControlLabel>Email:</ControlLabel>
          <input
            autoFocus
            type="email"
            pattern="^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
            title="email@example.com"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup className="firstName">
          <label>First Name:</label>
          <input
            value={this.state.firstName}
            onChange={this.handleChange}
            type="text"
            name="firstName"
          />
        </FormGroup>
        <FormGroup className="lastName">
          <ControlLabel>Last Name:</ControlLabel>
          <input
            value={this.state.lastName}
            onChange={this.handleChange}
            type="text"
            name="lastName"
          />
        </FormGroup>
        <FormGroup className="password">
          <ControlLabel>Password:</ControlLabel>
          <input
            value={this.state.password}
            onChange={this.handleChange}
            onBlur={this.FocusOut}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            type="password"
            title="Minimum 8 characters Required and it must have the combination of
                    special character uppercase and lowercase letters"
            name="password"
          />
        </FormGroup>
        <FormGroup className="confirmPassword">
          <ControlLabel>Confirm Password:</ControlLabel>
          <input
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            onBlur={this.FocusOut}
            type="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Minimum 8 characters Required and it must have the combination of
                    special character uppercase and lowercase letters"
            name="confirmPassword"
          />
        </FormGroup>
        <FormGroup className="country">
          <ControlLabel>country:</ControlLabel>
          <input
            value={this.state.country}
            onChange={this.handleChange}
            type="text"
            name="country"
          />
        </FormGroup>
        <LoaderButton
          disabled={!this.validateForm()}
          type="submit"
          text="Signup"
        />
        <SwitchWraper>
          <ControlLabel>Already Have An Account:</ControlLabel>
          <SwitchButton
            onClick={this.switchAction}
          > 
            Login
          </SwitchButton>
        </SwitchWraper>
        <ErrorMsgWrapper>
          {this.state.signupErrMsg &&
            <Paragraph>{this.state.signupErrMsg}</Paragraph>
          }
        </ErrorMsgWrapper>
      </Form>
    );
  }

  render() {
    return (
      <div >
        {this.signupForm()}
      </div>
    );
  }
}
