import React, {Component} from 'react';
import PrimaryButton from "./PrimaryButton";
import HttpConnector from "../HttpConnector";
import {Redirect} from "react-router";
import Routes from "../constants/paths";


export default class LoginPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          redirectHome: false,
          redirectRegister: false
      }
  }

  render() {
    if (this.state.redirectHome) {
        return <Redirect to={Routes.home} />
    }
    if (this.state.redirectRegister) {
        return <Redirect to={Routes.register} />
    }
    return (
        <div id="login">
            <div className="title">Log In</div>
            <div className="email-input">
                <p>Email</p>
                <input id="email"/>
            </div>
            <div className="password-input">
                <p>Password</p>
                <input id="password"/>
            </div>
            <PrimaryButton id="login-button" text="Login" onClick={async () => await this.logIn()}/>
            <PrimaryButton id="register-redirect-button" text="Go To Register" onClick={() => this.setState({redirectRegister: true})}/>
        </div>
    );
  }

  async logIn() {
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value ?? "";
      if (!this.validateEmail(email)) {
          alert('Invalid email.');
          return;
      }
      try {
          let id = await HttpConnector.login(email, password);
          sessionStorage.setItem('UserId', id);
          let attributes = await HttpConnector.getUserAttributes(id);
          sessionStorage.setItem('Name', attributes.name);
          sessionStorage.setItem('Email', attributes.email);
          sessionStorage.setItem('Games', JSON.stringify(attributes.games));
          this.setState(() => ({
              redirectHome: true
          }));
          window.location.reload();
      } catch (e) {
          alert(e.message);
      }
  }

  validateEmail(email) {
    if (email === undefined) {
        return false;
    }
    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
