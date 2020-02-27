import React, {Component} from 'react';
import controller from "../assets/controller.png";
import chess from "../assets/chess.png";
import PrimaryButton from "./PrimaryButton";
import {Redirect} from "react-router";
import Routes from "../constants/paths";

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectLogin: false,
        }
    }

  render() {
    if (this.state.redirectLogin) {
        return <Redirect to={Routes.login} />
    }
    return (
        <div id="landing">
          <div className="grid-wrapper">
            <div className="text">
              <div className="title">Select a Game</div>
              <PrimaryButton id="get-started" text="Get Started" onClick={() => this.setState({redirectLogin: true})}/>
            </div>
            <div className="images">
              <img className="controller" src={chess} alt="controller" width="100px"/>
              <img className="chess" src={controller} alt="chess" width="140px"/>
            </div>
          </div>
        </div>
    );
  }
};
