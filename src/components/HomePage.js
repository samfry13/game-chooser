import React, {Component} from 'react';
import {games} from '../data/games';


export default class HomePage extends Component {
  render() {
    console.log(games);

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
                  <div className="players">Players {game.players}</div>
                  <div className="length">Length: {game.time}</div>
                  <div className="difficulty">{game.difficulty}</div>
                </div>
              })}
            </div>
          </div>
        </div>
    );
  }
}
