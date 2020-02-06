import React, {Component} from "react";
import logo from "../assets/joystick.png";

export default class Navbar extends Component {
  render() {
    return (
        <div id="header">
          <div className="logo">
            <div className="title">Select A Game</div>
            <img src={logo} alt="logo"/>
          </div>

          <div className="links">
            <a href="/sign-up">Sign Up</a>
            <a href="/login">Login</a>
          </div>
        </div>
    );
  }
}