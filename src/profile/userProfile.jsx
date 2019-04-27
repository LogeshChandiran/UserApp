import React, { Component } from "react";
import styled from 'styled-components';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../config'

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      userName: '',
    };
    console.log(props.location.state)
  }
  
  logout = () => {
    const {email} =this.props.history.location.state;
    const userData = {
      Username: email.Value, //Username is represending email id in AWS
      Pool : userPool
      };
    var cognitoUser = new CognitoUser(userData);
    if (cognitoUser != null) {
      cognitoUser.signOut();
    }
    localStorage.setItem("userToken", "");
    return this.props.history.push({
      pathname:'/login',
    })
  }

  render() {
    console.log(this.props.history.location.state)
    const {email, firstName, lastName, country, userName} =this.props.history.location.state;
    return (
      <Wraper >
        <LogoutWrapper>
          <Logout
          onClick={this.logout}
          >
            Logout
          </Logout>
        </LogoutWrapper>
        <h1>Hello Logged In {userName.Value},</h1>
        <h3>Here your Profile</h3>
        <FormGroup>
            <ControlLabel>First Name : </ControlLabel>
            <ControlLabel>{firstName.Value} </ControlLabel>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Last Name : </ControlLabel>
            <ControlLabel>{lastName.Value} </ControlLabel>
        </FormGroup>
        <FormGroup>
            <ControlLabel>EmailId : </ControlLabel>
            <ControlLabel>{email.Value}</ControlLabel>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Country : </ControlLabel>
            <ControlLabel>{country.Value}  </ControlLabel>
        </FormGroup>
      </Wraper>
    );
  }
}

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20%;
`;

const ControlLabel = styled.label`
padding-right: 10px;
`;

const Wraper = styled.div`
  border: solid 1px black;
  margin:10px 35%;
  padding:20px;
`;

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Logout = styled.button`
  background-color: #ff0000b0;
  border: #ff0000b0;
  border-radius: 5px;
  padding: 5px;
  display:flex;
`;