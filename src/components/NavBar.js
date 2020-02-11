import React, {Component} from "react";
import logo from "../assets/logo_combined_h-200.png";
import profile from "../assets/profile_icon.png";
import {Link} from 'react-router-dom';
import Routes from '../constants/paths';


export default class Navbar extends Component {

  render() {
    const {loggedIn} = this.props;

    return (
        <div id="header">
          <div className="grid-wrapper">
            <div className="logo">
              <Link to={Routes.home}><img src={logo} alt="logo"/></Link>
            </div>

            {!loggedIn ? <div className="links">
                  <p onClick={() => {}}>Sign Up</p>
                  <p onClick={() => this.logIn()}>Login</p>
                </div>
                : <div className="welcome">
                  <p>Welcome, Sam</p>
                  <Link to={Routes.profile}><img src={profile} alt="profile_image"/></Link>
                </div>}
          </div>
        </div>
    );
  }

  logIn() {
      this.props.setCookie('SessionID', 'SomeValidSessionID');
  }
}
