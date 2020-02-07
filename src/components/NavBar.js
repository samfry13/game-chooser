import React, {Component} from "react";
import logo from "../assets/joystick.png";

export default class Navbar extends Component {

  render() {
    const {loggedIn, setLoggedIn} = this.props;

    return (
        <div id="header">
          <div className="grid-wrapper">
            <div className="logo">
              <div className="title">Select a Game</div>
              <img src={logo} alt="logo"/>
            </div>

            {!loggedIn ? <div className="links">
                  <p onClick={() => {}}>Sign Up</p>
                  <p onClick={() => setLoggedIn(true)}>Login</p>
                </div>
                : <div className="welcome">
                  <p>Welcome, Sam</p>
                </div>}
          </div>
        </div>
    );
  }
}