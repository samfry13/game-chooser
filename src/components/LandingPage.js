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
              <div className="title">Select a Game</div>
              <PrimaryButton id="get-started" text="Get Started" onClick={() => {this.logIn(setCookie)}}/>
            </div>
            <div className="images">
              <img className="controller" src={chess} alt="controller" width="100px"/>
              <img className="chess" src={controller} alt="chess" width="140px"/>
            </div>
          </div>
        </div>
    );
  }

  logIn(setCookie) {
    setCookie('SessionID', 'SomeValidSessionID');
  }
};
