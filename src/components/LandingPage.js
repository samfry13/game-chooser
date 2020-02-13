import React, {Component} from 'react';
import controller from "../assets/controller.png";
import chess from "../assets/chess.png";
import PrimaryButton from "./PrimaryButton";

export default class LandingPage extends Component {

  render() {
    const {setCookie} = this.props;

    return (
        <div id="landing">
          <div className="grid-wrapper">
            <div className="text">
              <div className="title">Select a Game<hr/></div>
              <div className="description">
                Do you have lots of games? Have you ever panicked while
                choosing a game with limited time and fun on the line?
                <br/>
                <br/>
                We can help. Create an account, enter your games, answer some
                short questions and you will have a game chosen for game night in
                no time!</div>
            </div>
            <div className="images">
              <img className="controller" src={chess} alt="controller" width="100px"/>
              <img className="chess" src={controller} alt="chess" width="140px"/>
            </div>
            <PrimaryButton id="login" text="Login" onClick={() => {this.logIn(setCookie)}}/>
            <PrimaryButton id="sign-up" text="Sign Up" onClick={this.signUp}/>
          </div>
        </div>
    );
  }

  logIn(setCookie) {
    setCookie('SessionID', 'SomeValidSessionID');
  }

  signUp() {}
}
