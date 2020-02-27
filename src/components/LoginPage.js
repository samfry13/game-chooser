import React, {Component} from 'react';
import PrimaryButton from "./PrimaryButton";
import {login, getUserAttributes} from "../HttpConnector";
import {Redirect} from "react-router";
import Routes from "../constants/paths";
import InputField from "./InputField";


export default class LoginPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          redirectHome: false,
          redirectRegister: false
      }
  }

  render() {
    const {redirectHome, redirectRegister, email, password} = this.state;

    if (redirectHome) {
        return <Redirect to={Routes.home} />
    }
    if (redirectRegister) {
        return <Redirect to={Routes.register} />
    }

    return (
        <div id="login">
            <div className="title">Log In</div>
            <InputField label="Email"
                        value={email}
                        onChange={value => this.setState({email: value})}/>
            <InputField label="Password"
                        type="password"
                        value={password}
                        onChange={value => this.setState({password: value})}/>
            <div className="buttons">
                <PrimaryButton id="login-button" text="Login" onClick={async () => await this.logIn()}/>
                <PrimaryButton id="register-redirect-button" text="Go To Register" onClick={() => this.setState({redirectRegister: true})}/>
            </div>
        </div>
    );
  }

  async logIn() {
      const {email, password = ""} = this.state;
      if (!this.validateEmail(email)) {
          alert('Invalid email.');
          return;
      }
      try {
          let id = await login(email, password);
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
