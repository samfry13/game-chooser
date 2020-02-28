import React, {Component} from 'react';
import controller from "../assets/controller.png";
import chess from "../assets/chess.png";
import PrimaryButton from "./PrimaryButton";
import {Redirect} from "react-router";
import Routes from "../constants/paths";
import logo from "../assets/logo_green_combined.png";

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
              <img className="controller" src={chess} alt="controller" width="100px"/>
              <img className="logo" src={logo} alt="logo"/>
              <img className="chess" src={controller} alt="chess" width="140px"/>
              <div id="get-started"><PrimaryButton text="Get Started" onClick={() => this.setState({redirectLogin: true})}/></div>
          </div>
        </div>
    );
  }
};
