import React, {Component} from 'react';

import Modal from "./Modal";

import PlayerIcon from '../assets/person-24px.svg';
import TimerIcon from '../assets/timer-24px.svg';
import DefaultPage from "./modal_pages/DefaultPage";
import SmallFilter from "./SmallFilter";

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
    };
    this.games = Object.values(JSON.parse(sessionStorage.getItem('Games')));
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

  filterGames() {
    const {searchQueries: {players, difficulty, length}} = this.state;
    return this.games.filter(game => {
      return game.minPlayers >= parseInt(players) - 2 && game.maxPlayers <= parseInt(players) + 2;
    }).filter(game => {
      return game.difficulty >= parseFloat(difficulty) - 0.2 && game.difficulty <= parseFloat(difficulty) + 0.2;
    }).filter(game => {
      return game.time >= parseInt(length) - 30 && game.time <= parseInt(length) + 30;
    });
  }

  render() {
    const {openModal, modalPageNum, searchQueries, isSearchActive} = this.state;
    const filteredGames = isSearchActive ? this.filterGames() : this.games;
    return (
      <>
        <div id="home">
          <div className="grid-wrapper">
            {isSearchActive && <div className="search">
              <div className="header">
                <div className="title">Search Filters</div>
                <div className="close">Clear<span className="button"
                                                  onClick={() => this.setState({isSearchActive: false})}
                >&times;</span></div>
              </div>
              <hr/>
              <div className="filters">
                <SmallFilter title="Players"
                             defaultValue={searchQueries.players}
                             minValue={2}
                             maxValue={7}
                             stepSize={1}
                             interpolateValues
                             setValue={value => this.setState({searchQueries: {...searchQueries, players: value}})}/>
                <SmallFilter title="Difficulty"
                             minDisplayValue="Easy"
                             maxDisplayValue="Difficult"
                             defaultValue={searchQueries.difficulty}
                             minValue={0}
                             maxValue={1}
                             stepSize={0.1}
                             hasGradient
                             setValue={value => this.setState({searchQueries: {...searchQueries, difficulty: value}})}/>
                <SmallFilter title="Length"
                             minDisplayValue="15 min"
                             maxDisplayValue="2 hrs"
                             defaultValue={searchQueries.length}
                             minValue={15}
                             maxValue={120}
                             stepSize={15}
                             setValue={value => this.setState({searchQueries: {...searchQueries, length: value}})}/>
              </div>
            </div>}
            {!isSearchActive && <div className="choose button"
                 onClick={() => this.setState({openModal: true})}
            ><div>Choose a Game</div></div>}
            <div className="games">
              {filteredGames.map((game, index) => {
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
          <DefaultPage active={modalPageNum === 0}
                       title="How many players do you have?"
                       minValue={2}
                       maxValue={7}
                       stepSize={1}
                       interpolateValues
                       setValue={value => this.setState({searchQueries: {...searchQueries, players: value}})}
          />
          <DefaultPage active={modalPageNum === 1}
                       title="How intensive of a game do you want to play?"
                       minDisplayValue="Easy"
                       maxDisplayValue="Difficult"
                       minValue={0}
                       maxValue={1}
                       stepSize={0.1}
                       hasGradient
                       setValue={value => this.setState({searchQueries: {...searchQueries, difficulty: value}})}
          />
          <DefaultPage active={modalPageNum === 2}
                       title="How long of a game do you want to play?"
                       minDisplayValue={"15 min"}
                       maxDisplayValue={"2 hrs"}
                       minValue={15}
                       maxValue={120}
                       stepSize={15}
                       setValue={value => this.setState({searchQueries: {...searchQueries, length: value}})}
          />
          <div className="footer">
            <div className="pages">
              {this.renderPagination(modalPageNum)}
            </div>
            <div className="next button" onClick={() => {
              if (modalPageNum === 2) {
                this.setState({modalPageNum: 0, openModal: false, isSearchActive: true});
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
