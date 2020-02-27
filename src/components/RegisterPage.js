import React, {Component} from 'react';
import PrimaryButton from "./PrimaryButton";
import HttpConnector from "../HttpConnector";
import {Redirect} from "react-router";
import Routes from "../constants/paths";
import InputField from "./InputField";


export default class RegisterPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          redirectHome: false,
          redirectLogin: false
      }
  }

  render() {
    const {redirectHome, redirectLogin, name, email, password} = this.state;
    if (redirectHome) {
        return <Redirect to={Routes.home} />
    }
    if (redirectLogin) {
        return <Redirect to={Routes.login} />
    }
    return (
        <div id="register">
            <div className="title">Register</div>
            <InputField label="Name" value={name} onChange={value => this.setState({name: value})}/>
            <InputField label="Email" value={email} onChange={value => this.setState({email: value})}/>
            <InputField type="password" label="Password" value={password} onChange={value => this.setState({password: value})}/>
            <div className="buttons">
                <PrimaryButton id="register-button" text="Register" onClick={async () => await this.register()}/>
                <PrimaryButton id="login-redirect-button" text="Go To Login" onClick={() => this.setState({redirectLogin: true})}/>
            </div>
        </div>
    );
  }

  async register() {
      const {name, email, password = ""} = this.state;
      if (!this.validateEmail(email)) {
          alert('Invalid email.');
          return;
      }
      try {
          let id = await HttpConnector.register(name, email, password);
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
