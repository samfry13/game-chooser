import React, {Component} from 'react';
import controller from "../assets/controller.png";
import chess from "../assets/chess.png";

export default class LandingPage extends Component {
  render() {
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
              <img className="controller" src={chess} alt="controller"/>
              <img className="chess" src={controller} alt="chess"/>
            </div>
          </div>
        </div>
    );
  }
}