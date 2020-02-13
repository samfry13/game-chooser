import React, {Component} from 'react';
import PlayerIcon from '../assets/person-24px.svg';
import TimerIcon from '../assets/timer-24px.svg';

const games = [
  {
    title: "Game 1",
    url: "https://images.unsplash.com/photo-1563941402830-3bae42b67b38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: 0.2,
  },
  {
    title: "Game 2",
    url: "https://images.unsplash.com/photo-1530328411047-7063dbd29029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: 0.4,
  },
  {
    title: "Game 3",
    url: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: 0.5,
  },
  {
    title: "Game 4",
    url: "https://images.unsplash.com/photo-1543338227-5cab7f6c9af3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: 0.6,
  },
  {
    title: "Game 5",
    url: "https://images.unsplash.com/photo-1563811771046-ba984ff30900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: 0.8,
  },
  {
    title: "Game 6",
    url: "https://images.unsplash.com/photo-1546512636-028082dff74d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: 1,
  },
];

export default class HomePage extends Component {
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

  render() {
    return (
        <div id="home">
          <div className="grid-wrapper">
            <div className="choose button"><div>Choose a Game</div></div>
            <div className="games">
              {games.map(game => {
                return <div className="game">
                  <div className="image">
                    <img src={game.url} alt="game"/>
                  </div>
                  <div className="title">{game.title}</div>
                  <div className="players">
                    <img src={PlayerIcon} alt="players_icon"/>
                    <br/>
                    {game.players}
                  </div>
                  <div className="length">
                    <img src={TimerIcon} alt="length_icon"/>
                    <br/>
                    {game.time}
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
    );
  }
}
