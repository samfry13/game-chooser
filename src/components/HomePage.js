import React, {Component} from 'react';

import Modal from "./Modal";
import PlayersPage from "./modal_pages/PlayersPage";
import DifficultyPage from "./modal_pages/DifficultyPage";
import LengthPage from "./modal_pages/LengthPage";

import {games} from '../data/games';
import PlayerIcon from '../assets/person-24px.svg';
import TimerIcon from '../assets/timer-24px.svg';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      modalPageNum: 0,
      searchQueries: {
        players: 0,
        difficulty: 0,
        length: 0,
      },
      isSearchActive: false,
    }
  }
  // Converts a #ffffff hex string into an [r,g,b] array
  h2r(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  // Inverse of the above
  r2h(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
  }

  _interpolateColor(color1, color2, factor) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
    }
    return result;
  }

  calculateBGColor(difficulty) {
    let factor = difficulty;
    let color1 = "#77dd77";
    let color2 = "#fdfd96";
    if (difficulty <= 0.5) {
      factor = difficulty * 2;
    }
    if (difficulty > 0.5) {
      factor = difficulty - 0.5;
      factor *= 2;
      color1 = color2;
      color2 = "#ff6961";
    }

    let startColor = this.h2r(color1);
    let endColor = this.h2r(color2);

    let iColor = this._interpolateColor(startColor, endColor, factor);
    return this.r2h(iColor);
  }

  renderPagination(activeIndex) {
    let pages = [];
    for (let i = 0; i < 3; i++) {
      pages.push(i === activeIndex ? <div className="page active"/> : <div className="page"/>)
    }
    return pages;
  }

  render() {
    const {openModal, modalPageNum, searchQueries} = this.state;
    return (
      <>
        <div id="home">
          <div className="grid-wrapper">
            <div className="choose button"
                 onClick={() => this.setState({openModal: true})}
            ><div>Choose a Game</div></div>
            <div className="games">
              {games.map((game, index) => {
                return <div className="game" key={index}>
                  <div className="image">
                    <img src={game.url} alt="game"/>
                  </div>
                  <div className="title">{game.title}</div>
                  <div className="players">
                    <img src={PlayerIcon} alt="players_icon"/>
                    <br/>
                    {game.minPlayers === game.maxPlayers ? game.minPlayers
                        : game.minPlayers + " - " + game.maxPlayers}
                  </div>
                  <div className="length">
                    <img src={TimerIcon} alt="length_icon"/>
                    <br/>
                    {game.time} min
                  </div>
                  <div className="difficulty" style={{
                    backgroundColor: this.calculateBGColor(game.difficulty),
                  }}>
                    <div className="text">{game.difficulty > 0.66 ? "Difficult"
                        : game.difficulty > 0.33 ? "Moderate" : "Easy"}</div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
        <Modal open={openModal}>
          <PlayersPage active={modalPageNum === 0} setValue={value =>
              this.setState({searchQueries: {...searchQueries, players: value}})}/>
          <DifficultyPage active={modalPageNum === 1} setValue={value =>
              this.setState({searchQueries: {...searchQueries, difficulty: value}})}/>
          <LengthPage active={modalPageNum === 2} setValue={value =>
              this.setState({searchQueries: {...searchQueries, length: value}})}/>
          <div className="footer">
            <div className="pages">
              {this.renderPagination(modalPageNum)}
            </div>
            <div className="next button" onClick={() => {
              if (modalPageNum === 2) {
                this.setState({modalPageNum: 0, openModal: false});
              }
              else {
                this.setState({modalPageNum: modalPageNum + 1});
              }
            }}>{modalPageNum === 2 ? "Finish" : "Next"}</div>
          </div>
        </Modal>
      </>
    );
  }
}
