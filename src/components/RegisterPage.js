import React, {Component} from 'react';
import PrimaryButton from "./PrimaryButton";
import {register, getUserAttributes} from "../HttpConnector";
import {Redirect} from "react-router";
import Routes from "../constants/paths";


export default class RegisterPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          redirectHome: false,
          redirectLogin: false
      }
  }

  render() {
    if (this.state.redirectHome) {
        return <Redirect to={Routes.home} />
    }
    if (this.state.redirectLogin) {
        return <Redirect to={Routes.login} />
    }
    return (
        <div id="register">
            <div className="title">Register</div>
            <div className="name-input">
                <p>Name</p>
                <input id="name"/>
            </div>
            <div className="email-input">
                <p>Email</p>
                <input id="email"/>
            </div>
            <div className="password-input">
                <p>Password</p>
                <input id="password"/>
            </div>
            <PrimaryButton id="register-button" text="Register" onClick={async () => await this.register()}/>
            <PrimaryButton id="login-redirect-button" text="Go To Login" onClick={() => this.setState({redirectLogin: true})}/>
        </div>
    );
  }

  async register() {
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value ?? "";
      if (!this.validateEmail(email)) {
          alert('Invalid email.');
          return;
      }
      try {
          let id = await register(name, email, password);
          sessionStorage.setItem('UserId', id);
          let attributes = await getUserAttributes(id);
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
