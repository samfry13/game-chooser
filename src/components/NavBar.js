import React, {Component} from "react";
import logo from "../assets/logo_combined_h-200.png"

export default class Navbar extends Component {

  render() {
    const {loggedIn} = this.props;

    return (
        <div id="header">
          <div className="grid-wrapper">
            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>

            {!loggedIn ? <div className="links">
                  <p onClick={() => {}}>Sign Up</p>
                  <p onClick={() => this.logIn()}>Login</p>
                </div>
                : <div className="welcome">
                  <p>Welcome, Sam</p>
                </div>}
          </div>
        </div>
    );
  }

  logIn() {
      this.props.setCookie('SelectAGame-SessionID', 'SomeValidSessionID');
  }
}
